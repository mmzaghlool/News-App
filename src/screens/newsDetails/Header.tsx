import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slices/themeSlice';

type P = {
  link: string;
};

const Header: React.FC<P> = ({link}) => {
  const [canOpenLink, setCanOpenLink] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colors = useSelector((state: RootState) => state.colors);
  const styles = _styles(colors);

  useEffect(() => {
    async function checkLink() {
      const isValidLink = await Linking.canOpenURL(link);
      setCanOpenLink(isValidLink);
    }
    checkLink();
  }, [link]);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.buttons} onPress={() => navigation.goBack()}>
        <MaterialIcons color={colors.text} name="arrow-back-ios" size={20} />
      </TouchableOpacity>

      <TouchableOpacity disabled={!canOpenLink} style={styles.buttons} onPress={() => Linking.openURL(link)}>
        <MaterialIcons name="open-in-new" size={20} color={canOpenLink ? colors.text : 'grey'} />
      </TouchableOpacity>
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
    buttons: {
      padding: 8,
    },
  });

export default Header;
