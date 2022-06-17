import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart';
import Language from '../../configs/asyncStorage/Language';
import Localization from '../../configs/Localization';
import Header from './Header';
import {changeMode, ThemeState} from '../../redux/slices/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import DarkMode from '../../configs/asyncStorage/DarkMode';
import {RootState} from '../../redux/store';

type P = {};

const Settings: React.FC<P> = ({}) => {
  const [lang, setLang] = useState(false);

  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);
  const dispatch = useDispatch();

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

  function changeDarkMode(v: boolean) {
    dispatch(changeMode(v));
    DarkMode.setDarkMode(JSON.stringify(v));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={colors.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Header />

      {/* Title */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{Localization.appearance}</Text>

        {/* Card */}
        <View style={styles.card}>
          {/* Dark Mode */}
          <View style={styles.item}>
            <Text style={styles.itemText}>{Localization.darkMode}</Text>
            <Switch
              trackColor={{false: '#767577', true: colors.primary}}
              thumbColor={colors.backgroundColor}
              onValueChange={v => changeDarkMode(v)}
              value={colors.isDarkMode}
              style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
            />
          </View>

          {/* Lang */}
          <TouchableOpacity style={styles.item} onPress={() => setLang(p => !p)}>
            <Text style={styles.itemText}>{Localization.language}</Text>
            <MaterialIcons name={'arrow-forward-ios'} size={16} color={colors.text} />
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

const LanguageButton = ({onPress, children}: {onPress: () => void; children: string}) => {
  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.langText}>{children}</Text>
    </TouchableOpacity>
  );
};

const _styles = (colors: ThemeState) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    content: {
      margin: 16,
    },
    title: {
      fontSize: 18,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.neutral,
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
      alignItems: 'center',
      margin: 8,
    },
    itemText: {
      color: colors.text,
    },
    langContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 8,
    },
    langText: {
      color: colors.text,
    },
  });

export default Settings;
