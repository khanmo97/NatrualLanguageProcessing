import React, {useState} from 'react';
import {Input, Card, ThemeProvider, Header, Button, Text } from 'react-native-elements';
import { StyleSheet, View, Component} from 'react-native';
import axios from 'axios';
import {PieChart} from 'react-native-chart-kit'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';

Project ID: sentiment-analysis-41e91
Project number: 211417807345
Default GCP resource location: nam5 (us-central)
Web API Key: AIzaSyDNvwd9fiK4-QZdvSfKX2LfMIlC9VgUGDg

const firebaseConfig = {
  apiKey: 'AIzaSyDNvwd9fiK4-QZdvSfKX2LfMIlC9VgUGDg',
  authDomain:
  databaseURT:
  projectId: 
  storageBucket: "",
};

var HistoryArray = ["none"];

export default function Home({navigation}) {

  const [searchText, setSearchText] = useState();
  const [searchRedText, setRedText]= useState();
  const [sentiment, setSentiment] = useState();
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
  }

  async function submitPressed() {
    try {
          const response = await axios.post('http://192.168.0.18:8080/', {searchText});
          setSentiment(response.data.sentiment_score);
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }

  async function submitRedPressed(){
    const redResponse= await axios.post('http://192.168.0.18:8080/reddit', {searchRedText});
    console.log(JSON.stringify(redResponse.data));
    alert(JSON.stringify(redResponse));
  }
  
  return (
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
          <Card title='NLP Tweet Analyzer'>
              <Input
                placeholder='Enter search phrase'
                value={searchText}
                onChangeText={(val) => setSearchText(val)}
              />
              <Button
                title='SUBMIT'
                onPress={submitPressed}
              />
          </Card>

          {sentiment &&
              <View style={styles.container}>
                <PieChart
                  data={[
                    {name: 'Positive', score: sentiment, color: '#fa7369', legendFontColor: '#7F7F7F', legendFontSize: 15},
                    {name: 'Other', score: (100 - +sentiment), color: 'lightgray', legendFontColor: '#7F7F7F', legendFontSize: 15}
                  ]}
                  width={350}
                  height={200}
                  accessor={'score'}
                  backgroundColor='transparent'
                  chartConfig={chartConfig}
                  paddingLeft={"30"}
                />
              </View>
          }
        
        <ActionButton buttonColor="rgba(231,76,60,1)" outRangeScale = '1' >
          <ActionButton.Item buttonColor='slategray' title="History" size={75} onPress={() => navigation.navigate('History')}>
              <Icon name="history" style={styles.actionButtonIcon} size={25} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#FF5700' title="Reddit" size={75} onPress={() => navigation.navigate('Reddit')}>
              <Icon name="reddit" style={styles.actionButtonIcon} size={25}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#ccdbd6' title="Logout" size={75} onPress={() => navigation.navigate('Login')}>
              <Icon name="sign-out-alt" style={styles.actionButtonIcon} size={25} />
          </ActionButton.Item>
        </ActionButton>


      </View>

  );
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