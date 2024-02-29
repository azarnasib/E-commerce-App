import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Pressable, Image, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from "../../Shared/Themes/Colors";
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, increaseQuantity, decreaseQuantity } from '../../Shared/utils/Redux/actions/Cart.actions';
const LabelValue = ({ label, value }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 5 }}>
      <Text style={{ fontSize: 15 }}>{label}</Text>
      <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{value}</Text>
    </View>
  )
}

const PaymentMethodSelector = ({ isSelected, heading, subheading, onSelect }) => {
  return (
    <Pressable
      onPress={onSelect}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: isSelected ? COLORS.Primary : 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        paddingVertical: 15,
        paddingLeft: 15,
        borderRadius: 10,
      }}

    >
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: isSelected ? COLORS.Primary : 'grey',
          borderRadius: 20 / 2,
          justifyContent: 'center',
          alignItems: 'center',

        }}>
        {
          isSelected && <View
            style={{ width: 15, height: 15, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 15 / 2, backgroundColor: COLORS.Primary }}
          />
        }
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.primary }}>{heading}</Text>
        <Text style={{ fontSize: 13, fontWeight: '400', color: 'black', marginTop: 2 }}>{subheading}</Text>
      </View>
    </Pressable>
  );
};

const Cart = (props) => {
  const paymentMethodModalizeRef = useRef();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const isCODSelected = selectedPaymentMethod == 'COD';
  const isOnlinePaymentSelected = selectedPaymentMethod == 'online'
  const deliveryCharges = 10
  const [subTotal, setSubTotal] = useState(0);
  const cartProducts = useSelector(state => state.cart.cartProducts)
  const dispatch = useDispatch();
  const _calculateCost = () => {
    let productCosts = 0
    for (var a = 0; a < cartProducts.length; a++) {
      const totalQuantityCost=cartProducts[a]?.quantity+cartProducts[a]?.price;
      productCosts = productCosts + cartProducts[a].price;
      setSubTotal(productCosts);
    }
  }

  const _resetCart = () => {
    dispatch(clearCart());
  }

  useEffect(() => {
    _calculateCost()
  }, [cartProducts])

  if (cartProducts?.length == 0) {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <MaterialCommunityIcons name='cart-variant' size={100} color={COLORS.Primary} />
        <Text style={{ color: COLORS.primary, fontSize: 30, fontWeight: 'bold' }}>Nothing in cart :/</Text>
        <Text style={{ color: 'black', fontSize: 14, textAlign: 'center', marginVertical: 10 }}>No item found in cart, add items to proceed with shopping</Text>
        <TouchableOpacity 
         onPress={()=>props.navigation.navigate('Home')}
         style={{
          width: 120,
          height:45,
          backgroundColor:COLORS.Primary,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:10
        }}>
          <Text style={{
            color:'white'
          }}>EXPLORE</Text>
          </TouchableOpacity>


      </View>

    )


  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Modalize
        adjustToContentHeight={true}
        ref={paymentMethodModalizeRef}>
        <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Payment Method</Text>
            <Text style={{ fontSize: 13, fontWeight: '300', color: 'grey', marginTop: 5 }}>Select a payment method to proceed with order</Text>
          </View>
          <PaymentMethodSelector
            onSelect={() => setSelectedPaymentMethod('COD')}
            isSelected={isCODSelected}
            heading={'Cash On Delivery (COD)'}
            subheading={'Pay by cash to the rider'}

          />

          <PaymentMethodSelector
            onSelect={() => setSelectedPaymentMethod('online')}
            isSelected={isOnlinePaymentSelected}
            heading={'Online Payment'}
            subheading={'Pay by card'}

          />
          {
            isCODSelected || isOnlinePaymentSelected ?
              <TouchableOpacity
                onPress={()=>props.navigation.navigate("OrderSummary")}
                style={{
                width: '100%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                alignSelf: 'center',
                backgroundColor: COLORS.Primary,
                marginTop: 15
              }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>CHECK OUT</Text>
              </TouchableOpacity>
              :
              null

          }
        </View>

      </Modalize>
      <ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:30}}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
      }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.Primary, paddingLeft: 10 }}>My Cart</Text>
        <TouchableOpacity
          onPress={_resetCart}
          style={{
            width: 45,
            height: 45,
            borderRadius: 45 / 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {cartProducts.map(item => (
        <Pressable
          style={{
            width: '90%',
            height: 100,
            backgroundColor: 'white',

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            alignSelf: 'center',
            marginVertical: 5,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15
          }}
        >



          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: item?.image[0] }}
              style={{
                width: 80,
                height: 80,
                marginTop: 10,
                borderRadius: 10
              }}
            />
            <View style={{ width: '50%', marginTop: 10 }}>
              <Text style={{ fontWeight: "bold" }}>{item?.title}</Text>
              <Text style={{ fontWeight: '300', fontSize: 11, color: 'grey' }} numberOfLines={2}>{item?.description}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 5 }}>{item?.price}$</Text>

            </View>
          </View>
          <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
            onPress={()=>{
              dispatch(increaseQuantity(item._id))
            }}
            >
            
            <AntDesign name="pluscircle" size={24} color={COLORS.Primary} />

            </TouchableOpacity>
            <Text style={{ marginVertical: 5 }}>{item.quantity}</Text>
            <TouchableOpacity
             onPress={()=>{
              dispatch(decreaseQuantity(item._id))
            }}
            >
            <AntDesign name="minuscircle" size={24} color={COLORS.Primary} />
            </TouchableOpacity>
           
          </View>

        </Pressable>

      ))




      }

      <View style={{
        borderRadius: 10, width: '90%', backgroundColor: 'white', padding: 10, marginTop: 20, borderRadius: 10, marginHorizontal: 10, alignSelf: 'center', marginBottom: 200, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        paddingVertical: 20
      }}>
        <LabelValue
          label={"Total Items"}
          value={cartProducts.length} />

        <LabelValue
          label={"Sub Total"}
          value={`${subTotal}$`} />

        <LabelValue
          label={"Delivery Charges"}
          value={`${deliveryCharges}$`} />


        <View

          style={{
            width: '92%',
            alignSelf: 'center',
            marginVertical: 15,
            borderWidth: 0.4,
            borderColor: 'grey'


          }}

        />



        <LabelValue
          label={"Total Amount"}
          value={`${subTotal + deliveryCharges}$`} />




      </View>
      </ScrollView>
       
      <TouchableOpacity
        onPress={() => paymentMethodModalizeRef.current.open()}
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.Primary,
          position: 'absolute',
          bottom: 0



        }}>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>PROCEED</Text>
      </TouchableOpacity>

    </View>
  );
}



export default Cart;