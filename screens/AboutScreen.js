import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import * as Expo from 'expo';
// Config
import { Analytics, ScreenHit } from 'expo-analytics';
import colours from '../config/colours';
//  Components
import SocialButton from '../components/SocialButton';
import { getCurrentYear, socialLinks, manifest } from '../lib/constants';

import SK_LOGO from '../assets/images/lk-logo.png';
// Constants
const { ...meta } = Expo.Constants.manifest;

// GA tracking
const ID = Expo.Constants.manifest.extra.googleAnalytics;
const analytics = new Analytics(ID);

export default class AboutScreen extends React.Component {
  componentDidMount() {
    Expo.Amplitude.logEvent('SCREEN: About');
    analytics.hit(new ScreenHit('SCREEN: About'));
  }

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Social</Text>

            {socialLinks.map((socialLink, index) => (
              <SocialButton
                key={socialLink.label + index}
                icon={socialLink.icon}
                label={socialLink.label}
                url={socialLink.url}
                screen="About Screen"
              />
            ))}

            <Text style={styles.headingText}>Share</Text>
            <SocialButton icon="share" label="Share" screen="About" />

            <Text style={styles.headingText}>Donate</Text>
            <SocialButton
              icon="heart"
              label="Buy me a coffee to say thanks!"
              url="https://www.buymeacoffee.com/oru9CZh"
              screen="About Screen"
            />

            <Text style={styles.headingText}>App Info</Text>
            <Image style={styles.logo} source={SK_LOGO} />
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsContainerText}>
                {`${meta.extra.appName}: ${manifest.version}`}
              </Text>
              <Text style={styles.detailsContainerText}>
                ©
                {' '}
                {getCurrentYear}
                {' '}
                {meta.extra.developerName}
. Design &
                development by
                {' '}
                {meta.extra.developerName}
.
              </Text>
              <Text style={styles.detailsContainerText}>
                Expo SDK:
                {' '}
                {meta.sdkVersion}
              </Text>
              <Text style={styles.detailsContainerText}>
                Released under MIT licence.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

//  Styles
const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colours.primaryBlack
  },
  container: {
    flex: 1,
    backgroundColor: colours.primaryBlacks,
    flexDirection: 'column',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40
  },

  headingText: {
    color: colours.primaryTeal,
    fontSize: 20,
    marginBottom: 20,
    marginTop: 30,
    fontWeight: '300'
  },
  detailsContainer: {
    paddingBottom: 20
  },
  detailsContainerText: {
    color: colours.primaryGrey,
    fontSize: 12,
    paddingBottom: 6
  },
  heading: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: colours.primaryBlack
  },
  logo: {
    width: 76,
    height: 76,
    marginBottom: 20
  }
});
