import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { decreaseQuantity, increaseQuantity } from '../../Shared/utils/Redux/actions/Cart.actions';
import { COLORS } from '../../Shared/theme/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_URLS, baseUrl } from '../Utils/Api/routes';
import axios from 'axios';
import { _getToken } from '../services/auth_service';
export default function OrderSummary(props) {
    const LabelValue = ({ label, value }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 5 }}>
                <Text style={{ fontSize: 15 }}>{label}</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{value}</Text>
            </View>
        )
    }

    const cartProducts = useSelector(state => state.cart.cartProducts);
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const deliveryCharges = 10;
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false)

    const _calculateCost = () => {
        let productCosts = 0;
        for (var a = 0; a < cartProducts.length; a++) {
            const totalQuantityCost = cartProducts[a]?.price * cartProducts[a]?.quantity;
            productCosts = productCosts + totalQuantityCost;
        }
        setSubTotal(productCosts);
    }

    useEffect(() => {
        _calculateCost();
    }, []);

    const handleAddressChange = (value) => {
        setAddress(value);
    };

    const _placeOrder = async () => {
        try {
            setLoading(true)
            const userToken = await _getToken();
            console.log(cartProducts)
            const response = await axios.post(`${baseUrl}${API_URLS.orders.placeOrder}`, {
                products: cartProducts,
                address: address
            },

                {
                    headers: {
                        'Authorization': 'Bearer ' + userToken
                    }

                });
            setLoading(false);
            alert(JSON.stringify(response.data));
            if (response.data.success) {
                alert('Order placed successfully')
                }
                props.navigation.navigate('OrderListing')
        }

        catch (e) {
            console.log(e);
            console.log(e?.response?.data)
            setLoading(false)

        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: '60%' }}>
                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <Pressable
                        onPress={() => {
                            props.navigation.goBack()
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name='keyboard-backspace'
                            color={COLORS.primary}
                            size={25}
                        />
                        <Text style={{ color: COLORS.primary, fontSize: 30, fontWeight: '900', paddingLeft: 10 }}>Order Summary</Text>
                    </Pressable>
                    <Text style={{ color: 'black', fontWeight: '300', fontSize: 12, width: '80%', paddingLeft: 3, paddingTop: 5 }}>Check out the details and information before confirming order</Text>
                </View>

                <View style={{ marginTop: 30, marginBottom: 30 }}>
                    <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Products</Text>
                        <Text style={{ color: 'black', fontWeight: '300', fontSize: 12 }}>These are the products you are ordering</Text>
                    </View>
                 
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginBottom: 20 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Total Cost</Text>
                    <Text style={{ color: 'black', fontWeight: '300', fontSize: 12 }}>Purchasing above items cost you this amount as mentioned below</Text>
                </View>
                <View style={{ width: '95%', padding: 10, backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, paddingVertical: 20, marginBottom: 20 }}>
                    <LabelValue label={'Total Items'} value={cartProducts.length} />
                    <LabelValue label={'Sub Total'} value={`${subTotal}$`} />
                    <LabelValue label={'Delivery Charges'} value={`${deliveryCharges}$`} />
                    <View style={{ width: '92%', borderWidth: 0.4, alignSelf: 'center', marginVertical: 15, borderColor: 'grey' }} />
                    <LabelValue label={'Total Amount'} value={`${subTotal + deliveryCharges}$`} />
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Store Location</Text>
                    <Text style={{ color: 'black', fontWeight: '300', fontSize: 12 }}>Testing dummy location, Street 03, Lodz Poland</Text>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginBottom: 20 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Delivery Address</Text>
                {/* Text Input for address */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter your address"
                    value={address}
                    onChangeText={handleAddressChange}
                />
            </View>
                {
                cartProducts.map(item => (
                    <Pressable style={{
                        width: '90%',
                        height: 100,
                        backgroundColor: 'white',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                        alignSelf: 'center',
                        marginVertical: 5,
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15
                    }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: item?.image }}
                                style={{
                                    width: 80,
                                    height: 80,
                                    margin: 10,
                                    borderRadius: 10
                                }}
                            />
                            <View style={{ width: '50%', marginTop: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>{item?.title}</Text>
                                <Text style={{ fontWeight: '300', fontSize: 11, color: 'grey' }} numberOfLines={2}>{item?.description}</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 5 }}>{item?.price}$</Text>

                            </View>
                        </View>
                        {/* <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                            onPress={() => {
                                dispatch(increaseQuantity(item._id))
                            }}
                            >
                            <AntDesign name="pluscircle" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                            <Text style={{ marginVertical: 5 }}>{item?.quantity}</Text>
                            <TouchableOpacity onPress={() => {
                                dispatch(decreaseQuantity(item._id))
                            }}>
                            <AntDesign name="minuscircle" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View> */}
                    </Pressable>
                ))
            }
                <MapView
                    region={{ latitude: 51.9194, longitude: 19.1451, latitudeDelta: 0.6, longitudeDelta: 0.6 }}
                    showsCompass={true}
                    zoomEnabled={true}
                    style={styles.map}>
                    <Marker
                        draggable={true}
                        onDragEnd={(e) => {
                            console.log(e.nativeEvent.coordinate)
                        }}
                        coordinate={{ latitude: 51.9194, longitude: 19.1451 }}
                    />
                </MapView>

                {/* Section for taking user's address */}
        
            </ScrollView>
            <TouchableOpacity
                style={{
                    width: '90%',
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 10,
                    backgroundColor: COLORS.primary
                }}
                onPress={_placeOrder}
            >
           {loading ? (
    <ActivityIndicator />
) : (
    <Text style={{ color: 'white', fontWeight: 'bold' }}>Place Order</Text>
)}

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    map: {
        width: '95%',
        height: '20%',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 14
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

