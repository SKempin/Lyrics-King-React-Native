import React from 'react';
import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies */
import { EvilIcons } from '@expo/vector-icons';
/* eslint-enable import/no-extraneous-dependencies */
// Config
import colours from '../config/colours';

const Suggestions = ({ results, navigation }) => (
  <FlatList
    onScrollBeginDrag={Keyboard.dismiss}
    data={results}
    styles={{ alignSelf: 'stretch' }}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => navigation.navigate('Details', { ...item })}
      >
        <Image
          style={styles.image}
          source={{ uri: item.artist.picture_medium }}
        />
        <View numberOfLines={1} style={styles.detailsContainer}>
          <Text numberOfLines={1} style={styles.songTitle}>
            {item.title_short}
          </Text>
          <Text numberOfLines={1} style={styles.artistDetails}>
            {item.artist.name}
          </Text>
          <Text numberOfLines={1} style={styles.artistDetails}>
            {item.album.title}
          </Text>
        </View>
        <EvilIcons name="chevron-right" size={54} color="#333" />
      </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
);

Suggestions.propTypes = {
  results: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Suggestions;

//  Styles
const styles = StyleSheet.create({
  suggestionItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: colours.tertiaryBlack,
    elevation: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 12,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 10,
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    alignSelf: 'center',
    borderColor: colours.primaryWhite,
    borderWidth: 2,
    marginRight: 17,
    flex: 0,
  },
  detailsContainer: {
    width: 145,
    marginRight: 20,
  },
  songTitle: {
    color: 'white',
    paddingBottom: 2,
  },
  artistDetails: {
    color: colours.primaryGrey,
    paddingBottom: 2,
  },
});
