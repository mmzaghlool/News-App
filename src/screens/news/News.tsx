import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, FlatList, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import {API_URL} from '../../configs/Constants';
import Localization from '../../configs/Localization';
import useFetch from '../../hooks/useFetch';
import {ThemeState} from '../../redux/slices/themeSlice';
import {RootState} from '../../redux/store';
import EmptyNews from './EmptyNews';
import NewsCard from './NewsCard';
import SearchHeader from './SearchHeader';

const News = () => {
  const [search, setSearch] = useState('');
  const [loading, execute, data] = useFetch();
  const results = data?.results || [];

  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);

  const loadData = useCallback(() => {
    let url = API_URL.concat(`&language=${Localization.getLanguage()}`);
    if (search) {
      url = url.concat(`&q=${search}`);
    }

    execute({url}).catch(() => {
      Alert.alert('Something went wrong', 'Please try again later', [{text: 'ok'}]);
    });
  }, [execute, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={colors.isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchHeader setSearch={setSearch} />

      {/* Content list */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={results}
          renderItem={({item}) => <NewsCard item={item} />}
          style={styles.content}
          onRefresh={() => loadData()}
          refreshing={loading}
          ListHeaderComponent={() => <Text style={styles.header}>{Localization.latestNews}</Text>}
          ListEmptyComponent={() => <EmptyNews />}
        />
      )}
    </SafeAreaView>
  );
};

const _styles = (colors: ThemeState) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    content: {
      marginHorizontal: 16,
    },
    header: {
      fontSize: 24,
      marginVertical: 8,
      fontWeight: '500',
      color: colors.text,
    },
  });

export default News;
