import React, {useState} from 'react';
import {Input, Card, ThemeProvider, Header, Button, Text} from 'react-native-elements';
import {StyleSheet, View, TextInput, ImageBackground, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

export default function History({navigation})
{
    const [history, setHistory] = useState();

    state={
        searchPhrase:""
    }

    return(
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            <Card>

            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    LogoutBtn: {
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:150,
    }
  });