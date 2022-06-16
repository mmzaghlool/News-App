import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../configs/Colors';
import Localization from '../../configs/Localization';

type P = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

let timeout: NodeJS.Timeout | undefined;
const SearchHeader: React.FC<P> = ({setSearch}) => {
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
        <MaterialIcons name="search" size={20} />
        <TextInput
          placeholder={Localization.search}
          style={styles.input}
          selectionColor={Colors.primary}
          value={query}
          onChangeText={t => setQuery(t)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.1,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#efefef',
    padding: 8,
    borderRadius: 8,
    width: '100%',
  },
  icon: {},
  input: {
    marginLeft: 4,
    backgroundColor: 'transparent',
  },
});

export default SearchHeader;
