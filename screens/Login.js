import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Login({navigation}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const EMAIL = 'nlp@gmail.com';
    const PASSWORD = 'ILoveMichaela';

    function login() {
    	if (email.toLowerCase() !== EMAIL) {
			alert('Invalid email');
			clearScreen();
			return;
		}
    	if (password !== PASSWORD) {
    		alert('Invalid password');
			clearScreen();
			return;
		}
		navigation.navigate('Home');
	}

	function clearScreen()
	{
		setEmail(null);
		setPassword(null);
	}


    return ( 
      <View style={styles.container}>
        <Image source = {require('../assets/Logo.png')}/>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="#003f5c"
			value={email}
            onChangeText={text => setEmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#003f5c"
			value={password}
            onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginBtn}
           onPress={login}>
                <Text>LOGIN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            onPress={() => navigation.navigate('Signup')} 
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#246196',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});