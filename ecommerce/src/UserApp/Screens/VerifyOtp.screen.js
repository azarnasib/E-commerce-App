import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OTPScreen = (props) => {
  const [otp, setOTP] = useState('');
  const  {params}=useRoute("");
  const otpCode=params?.otp
  const email = params?.email;


  const handleVerifyOTP = () => {
 if (otp==otpCode) {
   alert('Correct Otp')
   props.navigation.navigate('ResetPassword',
   {email:email,
    otp:otpCode


}
   )
 
 } else {
    alert('Invalid Otp')
 }
    // Implement OTP verification logic here
    // For demo purposes, we'll just log the entered OTP
    console.log('Entered OTP:', otp);

    // Show success message or navigate to next screen
    Alert.alert('Success', 'OTP verified successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={text => setOTP(text)}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
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
  verifyButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#2F6690', // Primary color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OTPScreen;
