import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart';
import Language from '../../configs/asyncStorage/Language';
import Colors from '../../configs/Colors';
import Localization from '../../configs/Localization';
import Header from './Header';

type P = {};

const Settings: React.FC<P> = ({}) => {
  const [lang, setLang] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  function changeLang(newLang: 'en' | 'fr') {
    Alert.alert(Localization.changeLanguage, Localization.changeLanguageMessage, [
      {
        text: Localization.OK,
        onPress: async () => {
          await Language.setLanguage(newLang);
          RNRestart.Restart();
        },
      },
      {text: Localization.cancel},
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Header />

      {/* Title */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{Localization.appearance}</Text>

        {/* Card */}
        <View style={styles.card}>
          {/* Item */}
          <TouchableOpacity style={styles.item} onPress={() => setLang(p => !p)}>
            <Text>{Localization.language}</Text>
            <MaterialIcons name={'arrow-forward-ios'} size={16} color={Colors.text} />
          </TouchableOpacity>

          {/* Select lang */}
          {lang ? (
            <View style={styles.langContainer}>
              <LanguageButton onPress={() => changeLang('en')}>English</LanguageButton>
              <LanguageButton onPress={() => changeLang('fr')}>Français</LanguageButton>
            </View>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LanguageButton = ({onPress, children}: {onPress: () => void; children: string}) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  content: {
    margin: 16,
  },
  title: {
    fontSize: 18,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 3,
    shadowOffset: {height: 1, width: 1},
    shadowColor: 'gray',
    shadowOpacity: 0.2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  langContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});

export default Settings;
