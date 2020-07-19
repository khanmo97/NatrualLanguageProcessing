import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login'
import Home from './screens/Home'
import Signup from './screens/Signup'

const Stack = createStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'Login'}}
            backgroundColor = '#003f5c'
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home'}}
          />
          <Stack.Screen
           name="Signup"
           component={Signup}
           options={{title: 'Signup'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
  
}