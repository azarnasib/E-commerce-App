import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { API_URLS, baseUrl } from './Utils/Api/routes';
import axios from 'axios';
import { _saveUser } from './services/auth_service';


const SignupScreen = (props) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading]=useState(false);

  const handleSignup = async(props) => {
    try {
       if (!fullname) {
           alert('Please enter full name');
           return;
       } else if (!email) {
           alert('Please enter email');
           return; 
       } else if (!password) {
           alert('Please enter password');
           return;
       }
        setIsLoading(true);
        const response = await axios.post(`${baseUrl}${API_URLS.users.signup}`, {
          
           fullname: fullname,
           email: email,
           password: password
       });
       alert(JSON.stringify(response))

       setIsLoading(false);
       await handleLogin();
       //   if (response.data.success) {
     //     await  handleLogin()

     //  } else {
     //      alert('Something went wrong :/')
     //  }
   }

    catch (e) {
      console.log(e);
      console.log(e?.response?.data)

      setIsLoading(false);
       alert(JSON.stringify(e?.response?.data?.message
         ));

    }
 };

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
      alert(JSON.stringify(email));
      const response = await axios.post(`${baseUrl}${API_URLS.users.login}`, {   
         email: email,
      
         password: password
     });
     
     setIsLoading(false);
    //  alert(JSON.stringify(response.data))
   //  await _saveUser(response.data.data,response.data.token);
     alert('all good')
     props.navigation.navigate('Home');
 }

  catch (e) {
    console.log(e)
     setIsLoading(false);
     //if(e && e?.response) {
    // alert(JSON.stringify(e.response.data));
    //  }
    //  console.log(e.response.data)

  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        value={fullname}
        onChangeText={text => setFullname(text)}
      />
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
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        {
            isLoading?
            <ActivityIndicator
            color='white'
            />
          
            :
            <Text style={styles.signupButtonText}>Sign Up</Text>
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

export default SignupScreen;
