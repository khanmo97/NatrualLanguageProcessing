import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login'
import Home from './screens/Home'

const Stack = createStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            backgroundColor = '#003f5c'
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
  
}