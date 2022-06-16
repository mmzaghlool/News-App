import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../configs/Colors';

const EmptyNews = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="newspaper-variant-multiple" size={80} color={Colors.primary} />
      <Text style={styles.text}>No news available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },
  text: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '300',
  },
});

export default EmptyNews;
