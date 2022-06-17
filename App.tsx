import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import News from './src/screens/news/News';
import NewsDetails from './src/screens/newsDetails/NewsDetails';
import Item from './src/types/Item';
import Settings from './src/screens/settings/Settings';
import Localization from './src/configs/Localization';
import {initializeFRMoment} from './src/configs/Moment';
import Language from './src/configs/asyncStorage/Language';
import LoadingIndicator from './src/components/LoadingIndicator';
import DarkMode from './src/configs/asyncStorage/DarkMode';
import {useDispatch, useSelector} from 'react-redux';
import {changeMode} from './src/redux/slices/themeSlice';
import {RootState} from './src/redux/store';
import {Linking, StatusBar} from 'react-native';

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
  const dispatch = useDispatch();

  const colors = useSelector((state: RootState) => state.colors);

  useEffect(() => {
    async function updateLanguage() {
      const lang = await Language.getLanguage();
      Localization.setLanguage(lang ?? 'en');
      setLoading(false);
    }
    async function updateDarkMode() {
      const isDark = await DarkMode.getDarkMode();
      dispatch(changeMode(JSON.parse(isDark || 'false')));
    }
    updateDarkMode();
    initializeFRMoment();
    updateLanguage();
  }, [dispatch]);

  useEffect(() => {
    const openUrl = ({url}: {url: string}) => {
      console.log('url', url);
    };
    const event = Linking.addEventListener('url', openUrl);

    async function getInit() {
      const initLink = await Linking.getInitialURL();
      console.log('initLink', initLink);
    }

    getInit();
    return () => {
      Linking.removeSubscription(event);
    };
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: colors.backgroundColor,
          border: colors.backgroundColor,
          card: colors.neutral,
          text: colors.text,
          notification: colors.text,
          primary: colors.primary,
        },
        dark: colors.isDarkMode,
      }}>
      <StatusBar backgroundColor={colors.neutral} barStyle={colors.isDarkMode ? 'light-content' : 'dark-content'} />

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
        })}>
        <Tab.Screen options={{headerShown: false}} name="News" component={HomeStack} />
        <Tab.Screen options={{headerShown: false}} name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
