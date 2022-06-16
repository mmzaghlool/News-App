import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import News from './src/screens/news/News';
import NewsDetails from './src/screens/newsDetails/NewsDetails';
import Item from './src/types/Item';
import Settings from './src/screens/settings/Settings';
import Colors from './src/configs/Colors';
import Localization from './src/configs/Localization';
import {initializeFRMoment} from './src/configs/Moment';
import Language from './src/configs/asyncStorage/Language';
import LoadingIndicator from './src/components/LoadingIndicator';

export type RootStackParamList = {
  Feed: undefined;
  NewsDetails: {item: Item};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="Feed" component={News} />
    <Stack.Screen options={{headerShown: false}} name="NewsDetails" component={NewsDetails} />
  </Stack.Navigator>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function updateLanguage() {
      const lang = await Language.getLanguage();
      Localization.setLanguage(lang ?? 'en');
      setLoading(false);
    }
    initializeFRMoment();
    updateLanguage();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          title: route.name === 'News' ? Localization.news : Localization.settings,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'News') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen options={{headerShown: false}} name="News" component={HomeStack} />
        <Tab.Screen options={{headerShown: false}} name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
