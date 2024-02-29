import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { API_URLS, baseUrl } from './Utils/Api/routes';
import { COLORS } from '../Shared/theme/Colors';
import axios from 'axios';
import { _saveUser } from './services/auth_service';
const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading]=useState(false);

  

  const handleLogin = async() => {
    try {
        if (!email) {
           alert('Please enter email');
           return; 
       } else if (!password) {
           alert('Please enter password');
           return;
       }
        setIsLoading(true);
        const response = await axios.post(`${baseUrl}${API_URLS.users.login}`, {
          
           
           email: email,
           password: password
       });
       alert(JSON.stringify(response.data));
       setIsLoading(false);
      if (response.data.success){await _saveUser(response.data.data,response.data.token);
      props.navigation.navigate('Home');}
   }

    catch (e) {
      console.log("login error:",e);
console.log("login error - 1",e?.response);
      setIsLoading(false);
       alert(JSON.stringify(e.response.data));

    }
 };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
      onPress={()=>props.navigation.navigate('ForgetPassword')}
      >
        <Text style={{color:COLORS.primary, fontSize:20}}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>props.navigation.navigate('Login')}
      
      >

        <Text>Press to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
        {
            isLoading?
            <ActivityIndicator
            color='white'
            />
          
            :
            <Text style={styles.signupButtonText}>Login</Text>
        }
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2F6690', // Primary color
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  signupButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#2F6690', // Primary color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LoginScreen;
