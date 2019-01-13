import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import { Amplitude } from 'expo';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import { Analytics, Event } from 'expo-analytics';
// Config
import colours from '../config/colours';
//  Helper functions
import handleShare from '../utils/shareHelper.js';
// Constants
const { ...extra } = Expo.Constants.manifest.extra;
const ID = Expo.Constants.manifest.extra.googleAnalytics;

// GA tracking
const analytics = new Analytics(ID);

export const SocialButton = props => {
  const iconSupplied = props.icon;
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.label != 'Share'
          ? Linking.openURL(props.url).then(() => {
              Amplitude.logEvent(`BUTTON: ${props.label}`);
              analytics.event(new Event('Button', 'Tap', `${props.label}`));
            })
          : handleShare(
              `Check out ${extra.appName} on Expo today!`,
              `${extra.social.expoApp}`,
              `${extra.appName}`,
              `${props.screen}`
            );
      }}>
      {iconSupplied.length > 0 ? (
        <Entypo name={props.icon} size={20} style={styles.icon_left} />
      ) : (
        <Image source={require('../assets/images/SK.png')} style={styles.icon_sk} />
      )}
      <Text style={styles.label}>{props.label}</Text>
      <EvilIcons name="chevron-right" size={34} style={styles.icon_right} />
    </TouchableOpacity>
  );
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
    marginBottom: 10
  },
  icon_left: {
    marginRight: 15,
    color: colours.primaryGrey
  },
  icon_sk: {
    marginRight: 15,
    opacity: 0.5,
    width: 22,
    height: 22
  },
  label: {
    flex: 1,
    color: colours.primaryGrey
  },
  icon_right: {
    color: colours.primaryGrey,
    justifyContent: 'flex-end',
    opacity: 0.4
  }
});
