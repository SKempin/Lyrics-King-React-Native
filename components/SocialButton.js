import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import * as Expo from 'expo';
import PropTypes from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies */
import { Entypo, EvilIcons } from '@expo/vector-icons';
/* eslint-enable import/no-extraneous-dependencies */
import { Analytics, Event } from 'expo-analytics';
import SK from '../assets/images/SK.png';
// Config
import colours from '../config/colours';
//  Helper functions
import handleShare from '../utils/shareHelper';
// Constants
const { ...extra } = Expo.Constants.manifest.extra;
const ID = Expo.Constants.manifest.extra.googleAnalytics;

// GA tracking
const analytics = new Analytics(ID);

const SocialButton = ({
  label, url, screen, icon,
}) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => (label !== 'Share'
      ? Linking.openURL(url).then(() => {
        Expo.Amplitude.logEvent(`BUTTON: ${label}`);
        analytics.event(new Event('Button', 'Tap', `${label}`));
      })
      : handleShare(
        `Check out ${extra.appName} on Expo today!`,
        `${extra.social.expoApp}`,
        `${extra.appName}`,
        `${screen}`,
      ))
    }
  >
    {icon ? (
      <Entypo name={icon} size={20} style={styles.icon_left} />
    ) : (
      <Image source={SK} style={styles.icon_sk} />
    )}
    <Text style={styles.label}>{label}</Text>
    <EvilIcons name="chevron-right" size={34} style={styles.icon_right} />
  </TouchableOpacity>
);

SocialButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  screen: PropTypes.string.isRequired,
};

SocialButton.defaultProps = {
  icon: '',
  url: '',
};

export default SocialButton;

//  Styles
const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: colours.tertiaryBlack,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  icon_left: {
    marginRight: 15,
    color: colours.primaryGrey,
  },
  icon_sk: {
    marginRight: 15,
    opacity: 0.5,
    width: 22,
    height: 22,
  },
  label: {
    flex: 1,
    color: colours.primaryGrey,
  },
  icon_right: {
    color: colours.primaryGrey,
    justifyContent: 'flex-end',
    opacity: 0.4,
  },
});
