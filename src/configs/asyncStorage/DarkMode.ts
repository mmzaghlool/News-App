import AsyncStorage from '@react-native-async-storage/async-storage';

class DarkMode {
  static KEY = 'DarkMode';

  static async getDarkMode() {
    return await AsyncStorage.getItem(DarkMode.KEY);
  }
  static async setDarkMode(value: string) {
    await AsyncStorage.setItem(DarkMode.KEY, value);
  }
}

export default DarkMode;
