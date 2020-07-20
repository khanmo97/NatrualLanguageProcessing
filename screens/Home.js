import React, {useState} from 'react';
import {Input, Card, ThemeProvider, Header, Button, Text } from 'react-native-elements';
import { StyleSheet, View} from 'react-native';
import axios from 'axios';
import {PieChart} from 'react-native-chart-kit'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const response = await axios.post('http://192.168.0.18:8080/login', {searchText});
    console.log(response);
    //will this shit even work????
    alert(response.data.sentiment_score);
    setSentiment(response.data.sentiment_score);
  }

  async function submitRedPressed(){
    const redResponse= await axios.post('http://192.168.0.18:8080/test', {searchRedText});
    console.log(JSON.stringify(redResponse.data));
    alert(JSON.stringify(redResponse));
  }
///ok this is good shit now
// think of it this way you can have cookies after you're done
  return (
    <ThemeProvider>
        <Header />
          <Card
              title='NLP Tweet Analyzer'//'pain in the ass again
            >
              <Input
                placeholder='Enter search phrase'
                value={searchText}
                onChangeText={(val) => setSearchText(val)}
              />
              <Button
                title='SUBMIT'
                onPress={submitPressed}     //Remember the function onclick in gtkmm well yah same shit here      
              />
            </Card>

            <Card
              title='NLP Reddit Analyzer'//'pain in the ass again
            >
              <Input
                placeholder='Enter search phrase'
                value={searchRedText}
                onChangeText={(val) => setRedText(val)}
              />
              <Button
                title='SUBMIT'
                onPress={submitRedPressed}     //Remember the function onclick in gtkmm well yah same shit here      
                color='#FF5700'
              />
            </Card>

            {sentiment &&
              <View style={styles.container}>
                <PieChart
                  data={[
                    {name: 'Positive', score: +sentiment, color: '#fa7369', legendFontColor: '#7F7F7F', legendFontSize: 15},
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
            <TouchableOpacity style={styles.LogoutBtn}
                onPress={() => navigation.navigate('Login')}>
                    <Text>LOGOUT</Text>
            </TouchableOpacity>
      </ThemeProvider>
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