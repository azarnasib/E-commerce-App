import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {View,Text,Image, Pressable, FlatList, TouchableOpacity, useWindowDimensions, ActivityIndicator} from 'react-native';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { COLORS } from "../../Shared/theme/Colors";
import { API_URLS, baseUrl } from "../Utils/Api/routes";

const CategorizedProductsScreen = props => {
    const {width,height} = useWindowDimensions();
    const {params} = useRoute();
    const {categories} = params;
    const [selectedCategory,setSelectedCategory] = useState(params.selectedCategory);
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    const _getAllProducts = async () => {
        try {
            setLoading(true);
            console.log(`${baseUrl}${API_URLS.products.categorizedProducts}/${selectedCategory}`)
            const response = await axios.get(`${baseUrl}${API_URLS.products.categorizedProducts}/${selectedCategory}`);
            setProducts(response.data.products);
            setLoading(false);
        }
        catch (e) {
            setLoading(false);
            alert(JSON.stringify(e));
        }
    }

    useEffect(() => {
        _getAllProducts();
    },[selectedCategory])

    return (
        <View style={{flex:1,backgroundColor:'white'}}>

            <View style={{
                width:'100%',
                height:50,
                backgroundColor:COLORS.primary,
                flexDirection:'row',
                alignItems:'center',
                paddingLeft:10
            }}>

                <Pressable
                onPress={() => props.navigation.goBack()}
                >
                <MaterialCommunityIcons
                name='keyboard-backspace'
                color='white'
                size={25}
                />
                </Pressable>

                <Text style={{color:'white',paddingLeft:10,fontSize:15,fontWeight:"bold"}}>Categorized Products</Text>

            </View>

            <FlatList
                    horizontal={true}
                    data={categories}
                    contentContainerStyle={{paddingBottom:30,marginTop:10}}                    
                    renderItem={({ item }) => (
                        <Pressable
                        onPress={() => setSelectedCategory(item)}
                        style={{
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            height: 35,
                            borderWidth: 0.5,
                            margin: 5,
                            backgroundColor:selectedCategory == item ? COLORS.primary : 'transparent',
                            borderColor:selectedCategory == item ? COLORS.primary: 'black',
                            flexDirection:'row',
                        }}>
                            <Text style={{
                                color:selectedCategory == item ? 'white' : 'black',
                                fontWeight:selectedCategory == item ? 'bold' : 'normal'
                            }}>{item}</Text>
                          {
                            loading ? 
                            <ActivityIndicator
                            size='small'
                            color='white'
                            style={{paddingLeft:10}}
                            />
                            :
                            null
                          }
                        </Pressable>
                    )}
                />

<FlatList
                    data={products}
                    numColumns={2}
                    contentContainerStyle={{ alignSelf: 'center', marginTop:20 }}
                    renderItem={({ item }) => (
                        <Pressable style={{
                            width: (width - 30) / 2,
                            paddingHorizontal: 15,
                            borderRadius: 5,
                            borderWidth: 0.5,
                            margin: 5,
                            borderColor: 'white',
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            height:350
                        }}>
                            <Image
                                source={{ uri:item.image }}
                                style={{
                                    width: '100%',
                                    height: 150,
                                    resizeMode: 'contain'
                                }}
                            />
                            <Text style={{
                                fontSize:22,
                                fontWeight:'bold',color:'black',
                                paddingTop:5
                            }}>{item.price}$</Text>
                            <Text style={{fontWeight:'bold',marginVertical:5}}  numberOfLines={2}>{item.title}</Text>
                            <Text numberOfLines={3} style={{fontWeight:'300'}}>{item.description}</Text>
                            <TouchableOpacity style={{
                                width:'100%',
                                height:35,
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:COLORS.primary,
                                borderRadius:5,
                                alignSelf:'center',
                                position:'absolute',
                                bottom:8
                            }}>
                                <Text style={{color:'white',fontSize:13,fontWeight:'bold'}}>ADD TO CART</Text>
                            </TouchableOpacity>
                        </Pressable>
                    )}
                />

        </View>
    )
}

export default CategorizedProductsScreen;