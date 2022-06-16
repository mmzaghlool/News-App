import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, useColorScheme, Text, View, Image, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import {RootStackParamList} from '../../../App';
import Header from './Header';
import Colors from '../../configs/Colors';
import Localization from '../../configs/Localization';

type P = NativeStackScreenProps<RootStackParamList, 'NewsDetails'>;

const NewsDetails: React.FC<P> = ({route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {item} = route.params;

  const {image_url, title, source_id, link, pubDate, description, full_description, keywords} = item;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Header link={link} />

      <ScrollView>
        {image_url !== null ? <Image style={styles.image} source={{uri: image_url}} /> : <View />}

        <View style={styles.content}>
          {/* title */}
          <View style={styles.titleBorder}>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Date & time */}
          <Text style={styles.lightText}>{moment(pubDate).locale(Localization.getLanguage()).format('llll')}</Text>

          {/* Source */}
          <Text style={styles.text}>
            {Localization.source}: <Text style={styles.bold}>{source_id}</Text>
          </Text>

          {/* Description */}
          <Text style={styles.text}>{description}</Text>
          <Text style={styles.text}>{full_description}</Text>

          {/* Keywords */}
          <Text style={styles.lightText}>{keywords ? keywords.join(', ') : ''}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 16,
  },
  titleBorder: {
    borderColor: Colors.primary,
    borderLeftWidth: 4,
    borderRadius: 3,
    marginVertical: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 8,
  },
  lightText: {
    fontWeight: '300',
    color: Colors.lightText,
    marginBottom: 16,
  },
  text: {
    color: Colors.text,
    marginBottom: 16,
    fontSize: 16,
  },
  bold: {fontWeight: '700'},
});

export default NewsDetails;
