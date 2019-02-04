import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems
} from 'react-navigation';
import * as Expo from 'expo';
/* eslint-disable import/no-extraneous-dependencies */
import { Ionicons } from '@expo/vector-icons';
/* eslint-enable import/no-extraneous-dependencies */
import {
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  View
} from 'react-native';
import Logo from '../assets/images/lk-logo.png';

//  Components
import SocialButton from '../components/SocialButton';
//  Helper functions
import handleShare from '../utils/shareHelper';
// Config
import colours from './colours';
// Constants
import { socialLinks } from '../lib/constants';

//  Screens
import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AboutScreen from '../screens/AboutScreen';

const { ...extra } = Expo.Constants.manifest.extra;

// Main stack
export const MainStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerTransparent: true,
      headerLeft: (
        <Ionicons
          name="md-menu"
          size={26}
          style={{ marginLeft: 10, padding: 10 }}
          color={colours.secondaryGrey}
          onPress={() => navigation.openDrawer()}
        />
      )
    })
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        elevation: 0
      },
      headerTransparent: true,
      headerTintColor: 'rgba(255,255,255,0.7)',
      headerRight: (
        <Ionicons
          name="md-share"
          title="Share"
          size={24}
          style={{ marginRight: 10, padding: 10 }}
          color="rgba(255,255,255,0.7)"
          onPress={() => handleShare(
            `Check out lyrics for ${navigation.state.params.title} by ${
              navigation.state.params.artist.name
            } on ${extra.appName}!`,
            `${extra.social.expoApp}`,
            `${extra.appName}`,
            'Details'
          )
          }
        />
      )
    })
  }
});

// About stack
export const AboutStack = createStackNavigator({
  About: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerTransparent: true,
      headerLeft: (
        <Ionicons
          name="md-menu"
          size={26}
          style={{ marginLeft: 10, padding: 10 }}
          color={colours.secondaryGrey}
          onPress={() => navigation.openDrawer()}
        />
      )
    })
  }
});

// =====================================================

//  Side drawer
export const RootStack = createDrawerNavigator(
  { Search: { screen: MainStack }, About: { screen: AboutStack } },
  {
    contentComponent: props => (
      <ScrollView style={{ backgroundColor: colours.primaryBlack }}>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <Image style={styles.logo} source={Logo} />

          <DrawerItems
            {...props}
            activeTintColor={colours.primaryWhite}
            activeBackgroundColor={colours.highlightBlack}
            inactiveTintColor={colours.secondaryGrey}
            itemStyle={styles.itemStyle}
          />
          <View style={styles.socialLinksContainer}>
            {socialLinks.map((socialLink, index) => (
              <SocialButton
                key={socialLink.label + index}
                icon={socialLink.icon}
                label={socialLink.label}
                url={socialLink.url}
                screen="About"
              />
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
);

//  Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30
  },
  itemStyle: {
    borderLeftWidth: 3,
    borderLeftColor: colours.primaryTeal
  },
  socialLinksContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 45,
    fontSize: 4,
    paddingTop: 30,
    borderTopColor: colours.secondaryGrey,
    borderTopWidth: 1
  }
});
