import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Localization from '../../configs/Localization';
import {ThemeState} from '../../redux/slices/themeSlice';
import {RootState} from '../../redux/store';

type P = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

let timeout: NodeJS.Timeout | undefined;
const SearchHeader: React.FC<P> = ({setSearch}) => {
  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);

  const [query, setQuery] = useState('');

  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setSearch(query.toLowerCase());
    }, 1000);
  }, [query, setSearch]);

  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="search" size={20} color={colors.text} />
        <TextInput
          placeholder={Localization.search}
          style={styles.input}
          selectionColor={colors.primary}
          placeholderTextColor={colors.text}
          value={query}
          onChangeText={t => setQuery(t)}
        />
      </View>
    </View>
  );
};

const _styles = (colors: ThemeState) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.neutral,
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation: 5,
      shadowOffset: {height: 3, width: 0},
      shadowOpacity: 0.1,
    },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: colors.lightBackground,
      padding: 8,
      borderRadius: 8,
      width: '100%',
    },
    input: {
      marginLeft: 4,
      backgroundColor: 'transparent',
      color: colors.text,
    },
  });

export default SearchHeader;
