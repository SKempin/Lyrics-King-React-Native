import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import Proptypes from 'prop-types';
import * as Expo from 'expo';
import { Analytics, Event } from 'expo-analytics';
import SK from '../assets/images/SK.png';

// Config
import colours from '../config/colours';
// Constants
const { portfolio } = Expo.Constants.manifest.extra.social;
const ID = Expo.Constants.manifest.extra.googleAnalytics;
// GA tracking
const analytics = new Analytics(ID);

const Credits = props => (
  <TouchableOpacity
    style={styles.creditsContainer}
    onPress={() => Linking.openURL(portfolio).then(() => {
      Expo.Amplitude.logEvent(`BUTTON: Credits - ${props.screen} Screen`);
      analytics.event(
        new Event('Button', 'Tap', `Credits - ${props.screen} Screen`),
      );
    })
    }
  >
    <Image source={SK} style={styles.creditsImage} />
    <Text style={styles.creditsText}>
      Design and development
      {'\n'}
      {' '}
by Stephen Kempin
    </Text>
  </TouchableOpacity>
);

Credits.propTypes = {
  screen: Proptypes.string.isRequired,
};

export default Credits;

//  Styles
const styles = StyleSheet.create({
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditsText: {
    fontSize: 12,
    color: colours.secondaryGrey,
    textAlign: 'left',
    paddingLeft: 20,
  },
  creditsImage: {
    width: 30,
    height: 30,
    opacity: 0.2,
    alignSelf: 'flex-start',
  },
});
