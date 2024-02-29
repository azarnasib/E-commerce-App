import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Import axios library
import { API_URLS, baseUrl } from './Utils/Api/routes'; // Import API_URLS

const ResetPasswordScreen = (props) => {
  const { params } = props.route;
  const email = params.email;
  const otp = params.otp;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (password === confirmPassword) {
      try {
        setLoading(true);
        const response = await axios.post(`${baseUrl}${API_URLS.users.resetPassword}`, {
          email,
          newPassword: confirmPassword,
          otp
        });
        setLoading(false);
        if (response.data.success) {
          props.navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Password reset failed');
        }
      } catch (e) {
        setLoading(false);
        alert(JSON.stringify(e?.response?.data?.message));
      }
    } else {
      Alert.alert('Error', 'Passwords do not match');
    }
  };

  // Check if password meets minimum requirements
  // if (password.length < 6) {
  //   Alert.alert('Error', 'Password must be at least 6 characters long');
  //   return null;
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleResetPassword}>
        {
            loading?
            <ActivityIndicator
            size='small'
            color="white"
            />
            :
            <Text style={styles.submitButtonText}>Reset Password</Text>

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

export default ResetPasswordScreen;
