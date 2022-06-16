import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, useColorScheme, Text, FlatList, Alert} from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator';
import Colors from '../../configs/Colors';
import {API_URL} from '../../configs/Constants';
import useFetch from '../../hooks/useFetch';
import EmptyNews from './EmptyNews';
import NewsCard from './NewsCard';

const News = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, execute, data] = useFetch();
  const results = data?.results || [];

  console.log(results);

  useEffect(() => {
    execute({url: API_URL}).catch(err => {
      console.log(err);
      Alert.alert('Something went wrong', 'Please try again later', [{text: 'ok'}]);
    });
  }, [execute]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Content list */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={results}
          renderItem={({item}) => <NewsCard item={item} />}
          style={styles.content}
          ListHeaderComponent={() => <Text style={styles.header}>Latest News</Text>}
          ListEmptyComponent={() => <EmptyNews />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
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