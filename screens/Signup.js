import React, {useState} from 'react';
import {Input, Card, ThemeProvider, Header, Button, Text} from 'react-native-elements';
import {StyleSheet, View, TextInput, ImageBackground, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

export default function Signup({navigation})
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfimrPassword] = useState();
    const image = { uri: 'https://i.stack.imgur.com/uD9js.png'};

    state={
        email:"",
        password:""
    }
    return(
            <View style={{flex: 5, justifyContent:'center', backgroundColor:'#fb5b5a'}}>
                <Card>
                    <Image source = {require('../assets/Logo.png')} style={{alignSelf: 'center'}}/>
                        <Input
                            placeholder = 'Email'
                            placeholderTextColor = "#003f5c"
                            style = {StyleSheet.inputText}
                            onChangeText = {text => setEmail(text)}
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
                            backgroundColor='transparent'
                        />
                        <TouchableOpacity style={styles.SignupBtn}
                            onPress={() => navigation.navigate('Home')}>
                            <Text>SIGNUP</Text>
                        </TouchableOpacity>
                </Card>
            </View>
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
        alignContent:"center",
        alignSelf: "center",
        marginTop:40,
        marginBottom:10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
});