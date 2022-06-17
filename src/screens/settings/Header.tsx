import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Localization from '../../configs/Localization';
import {ThemeState} from '../../redux/slices/themeSlice';
import {RootState} from '../../redux/store';

type P = {};

const Header: React.FC<P> = ({}) => {
  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{Localization.settings}</Text>
    </View>
  );
};

const _styles = (colors: ThemeState) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.neutral,
      alignItems: 'center',
      elevation: 5,
      shadowOffset: {height: 3, width: 0},
      shadowOpacity: 0.1,
    },
    text: {
      paddingVertical: 8,
      color: colors.text,
    },
  });

export default Header;
