import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import Colors from '../configs/Colors';

const LoadingIndicator = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
