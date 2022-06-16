import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import News from './src/screens/news/News';
import NewsDetails from './src/screens/newsDetails/NewsDetails';
import Item from './src/types/Item';

export type RootStackParamList = {
  News: undefined;
  NewsDetails: {item: Item};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News" component={News} options={{headerShown: false}} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
