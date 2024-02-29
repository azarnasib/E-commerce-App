import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Import axios library
import { API_URLS,baseUrl } from '../Utils/Api/routes';

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state to false
  
  const handleResetPassword = async () => { // Fix function name
    try {
      if (!email) { // Correctly check if email is not provided
        alert('Please enter email');
        return; 
      }
      
      setIsLoading(true); // Set isLoading to true when initiating reset password request
      const response = await axios.post(`${baseUrl}${API_URLS.users.forgetpassword}`, {
        email: email // Pass email in the request body
      });
      
      setIsLoading(false); // Set isLoading to false after the request is completed
      if (response.data) {
      alert(JSON.stringify(response.data));
          props.navigation.navigate("VerifyOtp",{
            otp:response.data.data,
            email:email
           
      });
      }
      // Handle response based on your application logic
      console.log('Reset password response:', response.data);
      // You can show a success message or navigate to another screen here
      
    } catch (error) {
    console.log(error);
      setIsLoading(false); // Set isLoading to false in case of error
      alert(JSON.stringify(error?.response?.data.message || 'Something went wrong'));
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleResetPassword}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="white" // Add color prop if needed
          />
        ) : (
          <Text style={styles.submitButtonText}>Reset Password</Text>
        )}
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
  submitButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#2F6690', // Primary color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ForgotPasswordScreen;
