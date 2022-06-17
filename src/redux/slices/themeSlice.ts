import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ThemeState {
  isDarkMode: boolean;
  backgroundColor: string;
  primary: string;
  text: string;
  lightText: string;
  neutral: string;
  lightBackground: string;
}

const lightColors = {
  neutral: '#fff',
  backgroundColor: '#fafafa',
  lightBackground: '#efefef',
  primary: '#be7339',
  text: '#373737',
  lightText: '#575757',
};

const darkColors = {
  neutral: '#111',
  backgroundColor: '#000',
  lightBackground: '#333',
  primary: '#be7339',
  text: '#fff',
  lightText: '#bfbfbf',
};
const initialState: ThemeState = {
  isDarkMode: false,
  ...lightColors,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<boolean>) => {
      const isDarkMode = action.payload;

      state.isDarkMode = isDarkMode;
      if (isDarkMode) {
        state.backgroundColor = darkColors.backgroundColor;
        state.text = darkColors.text;
        state.lightText = darkColors.lightText;
        state.neutral = darkColors.neutral;
        state.lightBackground = darkColors.lightBackground;
      } else {
        state.backgroundColor = lightColors.backgroundColor;
        state.text = lightColors.text;
        state.lightText = lightColors.lightText;
        state.neutral = lightColors.neutral;
        state.lightBackground = lightColors.lightBackground;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeMode} = themeSlice.actions;

export default themeSlice.reducer;
