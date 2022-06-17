import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ThemeState} from '../redux/slices/themeSlice';
import {RootState} from '../redux/store';

const LoadingIndicator = () => {
  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={colors.text} />
    </View>
  );
};

const _styles = (colors: ThemeState) =>
  StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LoadingIndicator;
