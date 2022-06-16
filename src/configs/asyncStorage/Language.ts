import AsyncStorage from '@react-native-async-storage/async-storage';

class Language {
  static KEY = 'LANG';

  static async getLanguage() {
    return await AsyncStorage.getItem(Language.KEY);
  }
  static async setLanguage(value: string) {
    await AsyncStorage.setItem(Language.KEY, value);
  }
}

export default Language;
