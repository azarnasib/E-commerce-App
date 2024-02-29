import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { _getToken } from '../services/auth_service';
import { API_URLS,baseUrl } from '../Utils/Api/routes';
import axios from "axios";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 

  const fetchOrders = async () => {
    try {
      alert(JSON.stringify('hello'));
      const userToken=await _getToken();
      console.log(userToken)
      console.log('api url',`${baseUrl}${API_URLS.orders.orders}`)
      const response = await axios.get(`${baseUrl}${API_URLS.orders.getmyOrders}`
,{
        headers:{
            Authorization:"Bearer " + userToken
        }
    });
     alert(JSON.stringify("my name is Azar"))
    alert(JSON.stringify(response.data));
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      alert(JSON.stringify('it is sunny today'))
      console.log(error);
      setLoading(false);
      //console.error('Error fetching orders:', error.response.data);
     
    }
  };
  useEffect(() => {
    // Fetch orders from the API
    fetchOrders();
  }, []);
  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {orders.length === 0 ? (
        <Text>No orders found</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderText}>Order ID: {item._id}</Text>
              <Text style={styles.orderText}>Date: {item.ordered_On}</Text>
              <Text style={styles.orderText}>Total: ${item.totalAmount.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default OrdersScreen;
