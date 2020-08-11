import React, {useState} from 'react';
import {Input, Card, ThemeProvider, Header, Button, Text } from 'react-native-elements';
import { StyleSheet, View, Component, Animated} from 'react-native';
import axios from 'axios';
import {PieChart} from 'react-native-chart-kit'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';


export default function Home({navigation}) {

  const [searchText, setSearchText] = useState();
  const [sentiment, setSentiment] = useState();
  const [loading, setLoading] = useState(false);
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
  };

  async function submitPressed() {
    try {
    	setLoading(true);
		setSentiment();
		const response = await axios.post('http://192.168.1.68:8080/', {searchText});
		console.log(JSON.stringify(response.data.sentiment_score));
		setSentiment(response.data.sentiment_score);
	} catch (error) {
		alert(JSON.stringify(error));
	} finally {
    	setLoading(false);
	}
  }
  
	return (
		<View style={{flex:1, backgroundColor: '#f3f3f3'}}>
			<Spinner
				visible={loading}
				textContent={'Analyzing Tweets...'}
				textStyle={styles.spinnerTextStyle}
			/>
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
							{name: 'Positive', score: sentiment.positive, color: '#97f75c', legendFontColor: '#7F7F7F', legendFontSize: 15},
							{name: 'Negative', score: sentiment.negative, color: '#fa7369', legendFontColor: '#7F7F7F', legendFontSize: 15},
							{name: 'Neutral', score: sentiment.neutral, color: '#f7d35c', legendFontColor: '#7F7F7F', legendFontSize: 15}
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
	spinnerTextStyle: {
		color: '#FFF'
	},
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