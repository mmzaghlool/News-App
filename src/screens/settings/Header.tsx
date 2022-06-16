import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Localization from '../../configs/Localization';

type P = {};

const Header: React.FC<P> = ({}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{Localization.settings}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.1,
  },
  text: {
    paddingVertical: 8,
  },
});

export default Header;
