import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Localization from '../../configs/Localization';
import {ThemeState} from '../../redux/slices/themeSlice';
import {RootState} from '../../redux/store';

const EmptyNews = () => {
  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);

  return (
    <View style={styles.container}>
      <MaterialIcons name="newspaper-variant-multiple" size={80} color={colors.primary} />
      <Text style={styles.text}>{Localization.noNewsAvailable}</Text>
    </View>
  );
};

const _styles = (colors: ThemeState) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 64,
    },
    text: {
      fontSize: 24,
      marginBottom: 8,
      fontWeight: '300',
      color: colors.text,
    },
  });

export default EmptyNews;
