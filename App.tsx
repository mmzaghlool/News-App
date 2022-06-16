import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import News from './src/screens/news/News';
import NewsDetails from './src/screens/newsDetails/NewsDetails';
import Item from './src/types/Item';
import Settings from './src/screens/settings/Settings';
import Colors from './src/configs/Colors';

export type RootStackParamList = {
  News: undefined;
  NewsDetails: {item: Item};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="News" component={News} />
    <Stack.Screen options={{headerShown: false}} name="NewsDetails" component={NewsDetails} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen options={{headerShown: false}} name="Home" component={HomeStack} />
        <Tab.Screen options={{headerShown: false}} name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
