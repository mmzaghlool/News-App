import React from 'react';
import moment from 'moment';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Item from '../../types/Item';
import {RootStackParamList} from '../../../App';

type P = {
  item: Item;
};
const NewsCard: React.FC<P> = ({item}) => {
  const {title, image_url, pubDate} = item;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('NewsDetails', {item})}>
      {image_url !== null ? <Image style={styles.image} source={{uri: image_url}} /> : <View />}

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.time}>{moment(pubDate).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    height: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 16,
    borderRadius: 16,
    marginLeft: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginLeft: -16,
    marginTop: -16,
  },
  content: {
    flex: 1,
    height: '100%',
    padding: 16,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    flex: 1,
  },
  time: {
    fontWeight: '300',
    color: '#575757',
  },
});

export default NewsCard;
