import React, {useState} from 'react';
import {Input, Card, ThemeProvider, Header, Button, Text} from 'react-native-elements';
import {StyleSheet, View, TextInput,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Signup({navigation})
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfimrPassword] = useState();
    state={
        email:"",
        password:""
    }
    return(
        <ThemeProvider style={styles.container}>
            <Card>
                <Input
                    placeholder = 'Email'
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    secureTextEntry={true}
                    style={StyleSheet.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    secureTextEntry={true}
                    style={StyleSheet.inputText}
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setConfimrPassword(text)}
                />
            </Card>
            <TouchableOpacity style={styles.SignupBtn}
                onPress={() => navigation.navigate('Home')}>
                <Text>SIGNUP</Text>
            </TouchableOpacity>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal',
        alignItems: 'center',
        justifyContent: 'center'
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
    SignupBtn:{
        width:"80%",
        backgroundColor:"#fb5b9a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    }
});