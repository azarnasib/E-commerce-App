import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { _getUser } from '../services/auth_service';

const SplashScreen = ({ navigation }) => {

  const _checkAuth = async() => {
   //navigation.navigate("Home"); 
    const user = await _getUser();
    alert(JSON.stringify(user))
    if(user) {
        navigation.navigate("Home");
    } else {
      alert(JSON.stringify("hello")) 
      navigation.navigate("Login")
    }
  }

  useEffect(() => {
    _checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Image source={require('path/to/your/logo.png')} style={styles.logo} /> */}
      <Text style={styles.title}>Your Ecommerce App Name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color:"white"
  },
});

export default SplashScreen;