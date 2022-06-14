import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  FlatList,
} from 'react-native';
import data from './data.json';
import NewsCard from './NewsCard';

const News = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={data}
        renderItem={({item}) => <NewsCard item={item as any} />}
        style={styles.content}
        ListHeaderComponent={() => (
          <Text style={styles.header}>Latest News</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  content: {
    marginHorizontal: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '500',
  },
});

export default News;
