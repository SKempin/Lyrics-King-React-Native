import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import * as Expo from 'expo';
import PropTypes from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies */
import { EvilIcons } from '@expo/vector-icons';
/* eslint-enable import/no-extraneous-dependencies */
import { Analytics, ScreenHit } from 'expo-analytics';

// search throlle and debounce
import { throttle, debounce } from 'throttle-debounce';

import LK_LOGO from '../assets/images/lk-logo.png';
import SK from '../assets/images/SK.png';

// Config
import colours from '../config/colours';
//  Components
import Suggestions from '../components/Suggestions';
import Credits from '../components/Credits';

// Cache images
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Expo.Asset.fromModule(image).downloadAsync();
  });
}

// GA tracking
const ID = Expo.Constants.manifest.extra.googleAnalytics;
const analytics = new Analytics(ID);

export default class SearchScreen extends React.Component {
  static get propTypes() {
    return {
      navigation: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = { results: [], text: null, showLogo: true };
    this.throttleSearch = throttle(500, this.getInfo);
    this.debounceSearch = debounce(1000, this.getInfo);
    this.cache = {};
  }

  componentDidMount() {
    Expo.Amplitude.initialize('6460727d017e832e2083e13916c7c9e5');
    Expo.Amplitude.logEvent('SCREEN: Search');
    analytics.hit(new ScreenHit('SCREEN: Search'));
  }

  componentDidUpdate(prevProps, prevState) {
    const { text } = this.state;
    if (text !== prevState.text) {
      if (text.length >= 1) {
        if (text.length < 5 || text.endsWith(' ')) this.throttleSearch(text);
        else this.debounceSearch(text);
      } else {
        this.submitAndClear();
      }
    }
  }

  // Load logos
  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([LK_LOGO, SK]);
    await Promise.all([...imageAssets]);
  };

  // Throttling and debouncing needed
  getInfo = () => {
    const { text } = this.state;
    const url = `https://api.deezer.com/search?q=track:"${text}"&limit=20&order=RANKING?strict=on`;

    const cached = this.cache[url];
    if (cached) {
      this.setState({ results: cached, showLogo: false });
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.cache[url] = data.data;
        this.setState({ results: data.data, showLogo: false });
      });
  };

  submitAndClear = () => {
    this.setState({ text: '', showLogo: true });
    Keyboard.dismiss();
  };

  render() {
    const { isReady, showLogo, text, results } = this.state;
    const { navigation } = this.props;
    if (!isReady) {
      return (
        <Expo.AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar barStyle="light-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            {showLogo && <Image style={styles.logo} source={LK_LOGO} />}

            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={styles.searchContainer}>
                <EvilIcons name="search" size={30} color="#07CCBA" />

                <TextInput
                  style={styles.TextInput}
                  onChangeText={changedText =>
                    this.setState({ text: changedText })
                  }
                  value={text}
                  placeholder="Search song"
                  placeholderTextColor="#fff"
                  clearButtonMode="always"
                />
              </View>

              {results.length > 0 && text.length > 0 && (
                <Suggestions
                  style={styles.Suggestions}
                  results={results}
                  navigation={navigation}
                />
              )}
            </View>
            {showLogo && <Credits screen="Search" />}
          </View>
        </TouchableWithoutFeedback>
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
    backgroundColor: colours.primaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 30
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 60,
    marginTop: 40
  },
  searchContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: 280,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 20,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: colours.highlightBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    color: colours.primaryWhite
  },
  Suggestions: {
    flex: 1,
    alignItems: 'center',

    color: colours.primaryWhite
  },
  creditsContainer: {
    flexDirection: 'row',
    width: 170
  },
  creditsText: {
    fontSize: 12,
    color: colours.secondaryGrey,
    textAlign: 'left',
    paddingLeft: 20
  },
  creditsImage: {
    width: 30,
    height: 30,
    opacity: 0.2,
    alignSelf: 'flex-start'
  }
});
