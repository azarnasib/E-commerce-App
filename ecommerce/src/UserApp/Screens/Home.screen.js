import react, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput, FlatList, Pressable, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Modalize } from 'react-native-modalize';
import { API_URLS, baseUrl } from '../Utils/Api/routes';
import { COLORS } from '../../Shared/theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../Shared/utils/Redux/actions/Cart.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
    const { height, width } = useWindowDimensions();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState(null);
    const modalizeRef = useRef();
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cart.cartProducts);
    const cartProductIds = useSelector(state => state.cart.cartProductsIds);
  
    const handleRemoveItemFromCart = product => {
        dispatch(removeProductFromCart(product));
    }

    const handleAddItemToCart = (product) => {
        dispatch(addProductToCart(product));
    }

    const _getAllCategories = async () => {
        try {
            const response = await axios.get(`${baseUrl}${API_URLS.products.allCategories}`);
            setCategories(response.data);
        }
        catch (e) {
            alert(JSON.stringify(e));
        }
    }

    const _getAllProducts = async () => {
        try {
            console.log(`${baseUrl}${API_URLS.products.allProducts}`);
            const response = await axios.get(`${baseUrl}${API_URLS.products.allProducts}`);
            alert(JSON.stringify(response.data));
            setProducts(response.data.data);
        }
        catch (e) {
            alert(JSON.stringify(e));
        }
    }

    useEffect(() => {
        //_getAllCategories();
        _getAllProducts();
    }, [])
    return (
        <View style={{ flex: 1,backgroundColor:'white' }}>
           <Modalize
           ref={modalizeRef}
           modalHeight={height - 100}
           modalStyle={{
            backgroundColor:'white',
            width:'100%',
            flex:1
           }}
           >
            <View style={{flex:1,width:'100%'}}>
            <Image
            source={{uri:selectedProduct?.image[0]}}
            style={{
                width:'100%',
                height:200,
                resizeMode:'stretch'
            }}
            />
          <View style={{padding:10,flex:1}}>
          <Text style={{color:'black',fontWeight:'bold',fontSize:45}}>{selectedProduct?.price}$</Text>
          <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{selectedProduct?.title}</Text>
            <Text style={{
                textAlign:'left',
                marginTop:20,
            }}>{selectedProduct?.description}</Text>
                <TouchableOpacity 
                            onPress={() => {
                                if(cartProductIds?.includes(selectedProduct?._id)) {
                                    handleRemoveItemFromCart(selectedProduct);
                                } else {
                                    handleAddItemToCart(selectedProduct);
                                }
                            }}
                            style={{
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
                                <Text style={{color:'white',fontSize:13,fontWeight:'bold'}}>{cartProductIds?.includes(selectedProduct?.id) ? "Remove From Cart" : 'ADD TO CART'}</Text>
                            </TouchableOpacity>
          </View>
            </View>
           </Modalize>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style={{
                width: '100%',
                height: 280,
                backgroundColor: COLORS.primary,
                // borderBottomRightRadius: 200,
                justifyContent: 'center',
                paddingLeft: 20
                // alignItems:'center'
            }}>
                <View>

                    <View>
                    <TouchableOpacity
                    onPress={() => props.navigation.navigate("CartScreen")}
                    style={{
                        width:40,
                        height:40,
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:40/2,
                        backgroundColor:'white',
                        alignSelf:'flex-end',
                        marginRight:20
                    
                    }}>
                    <AntDesign name="shoppingcart" size={24} color="black" />
                    </TouchableOpacity>
                    
                   {
                    cartProductIds?.length > 0 ?
                    <View style={{
                        width:20,
                        height:20,
                        backgroundColor:'red',
                        borderRadius:20/2,
                        justifyContent:'center',
                        alignItems:'center',
                        alignSelf:'flex-end',
                        position:'absolute',
                        bottom:0,
                        right:10
                    }}>
                        <Text style={{color:'white',fontWeight:'bold'}}>{cartProductIds?.length}</Text>
                    </View>
                    :
                    null
                   }
                    </View>

                    <Text style={{
                        color: 'white',
                        fontSize: 30, fontWeight: 'bold',
                        marginBottom: 5
                    }}>ESHOP</Text>
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>Your shopping partner</Text>

                    <View style={{
                        width: '85%',
                        height: 40,
                        backgroundColor: "white",
                        marginTop: 15,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10
                    }}>
                        <AntDesign name="search1" size={20} color="black" />
                        <TextInput
                            style={{ flex: 1, paddingLeft: 5, color: 'black' }}
                            placeholder='Tap to search'
                            placeholderTextColor='black'
                        />
                    </View>

                </View>
            </View>

            <View>
                <FlatList
                    horizontal={true}
                    data={categories}
                    contentContainerStyle={{ margin: 15 }}
                    renderItem={({ item }) => (
                        <Pressable 
                        onPress={() => {
                            props.navigation.navigate("CategorizedProducts",{
                                selectedCategory:item,
                                categories:categories
                            })
                        }}
                        style={{
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            height: 35,
                            borderWidth: 0.5,
                            margin: 5
                        }}>
                            <Text>{item}</Text>
                        </Pressable>
                    )}
                />
               <TouchableOpacity
                onPress={async() => {
                    await AsyncStorage.removeItem("user");
                    await AsyncStorage.removeItem("token");
                    props.navigation.navigate("Login")
                }}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>

                <FlatList
                    data={products}
                    numColumns={2}
                    contentContainerStyle={{ alignSelf: 'center' }}
                    renderItem={({ item }) => (
                        <Pressable 
                        onPress={() => {
                            setSelectedProduct(item);
                            modalizeRef.current.open()
                        }}
                        style={{
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
                                source={{ uri: item.image }}
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
                            <Text style={{fontWeight:'bold',marginVertical:5}}  numberOfLines={2}>{item.name}</Text>
                            <Text numberOfLines={3} style={{fontWeight:'300'}}>{item.description}</Text>
                            <TouchableOpacity 
                            onPress={() => {
                                if(cartProductIds?.includes(item?._id)) {
                                    handleRemoveItemFromCart(item);
                                } else {
                                    handleAddItemToCart(item);
                                }
                            }}
                            style={{
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
                                <Text style={{color:'white',fontSize:13,fontWeight:'bold'}}>{cartProductIds?.includes(item?._id) ? "Remove From Cart" : 'ADD TO CART'}</Text>
                            </TouchableOpacity>
                        </Pressable>
                    )}
                />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default HomeScreen;


