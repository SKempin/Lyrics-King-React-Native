import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { AppLoading, Asset, Amplitude } from "expo";
import { EvilIcons } from "@expo/vector-icons";
import { Analytics, ScreenHit } from "expo-analytics";
import { throttle, debounce } from "throttle-debounce";

// Config
import colours from "../config/colours";
//  Components
import Suggestions from "../components/Suggestions";
import Credits from "../components/Credits";

// Cache images
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

// GA tracking
const ID = Expo.Constants.manifest.extra.googleAnalytics;
const analytics = new Analytics(ID);

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], text: null, showLogo: true };
    this.throttleSearch = throttle(500, this.getInfo);
    this.debounceSearch = debounce(1000, this.getInfo);
    this._autocompleteCache = {};
  }

  componentDidMount() {
    Amplitude.initialize("6460727d017e832e2083e13916c7c9e5");
    Amplitude.logEvent("SCREEN: Search");
    analytics.hit(new ScreenHit("SCREEN: Search"));
  }

  componentDidUpdate(prevProps, prevState) {
    const { text } = this.state;
    if (text !== prevState.text) {
      if (text.length >= 1) {
        if (text.length < 5 || text.endsWith(" "))
          this.throttleSearch(this.state.text);
        else this.debounceSearch(this.state.text);
      } else {
        this.submitAndClear();
      }
    }
  }

  // Load logos
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("../assets/images/lk-logo.png"),
      require("../assets/images/SK.png")
    ]);
    await Promise.all([...imageAssets]);
  }

  getInfo = () => {
    let url = `https://api.deezer.com/search?q=track:"${
      this.state.text
    }"&limit=20&order=RANKING?strict=on`;

    const cached = this._autocompleteCache[url];
    if (cached) {
      this.setState({ results: cached, showLogo: false });
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this._autocompleteCache[url] = data.data;
        this.setState({ results: data.data, showLogo: false });
      });
  };

  submitAndClear = () => {
    this.setState({ text: "", showLogo: true });
    Keyboard.dismiss;
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
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
            {this.state.showLogo && (
              <Image
                style={styles.logo}
                source={require("../assets/images/lk-logo.png")}
              />
            )}

            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={styles.searchContainer}>
                <EvilIcons name="search" size={30} color="#07CCBA" />

                <TextInput
                  style={styles.TextInput}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  placeholder={"Search song"}
                  placeholderTextColor={"#fff"}
                  clearButtonMode={"always"}
                />
              </View>

              {this.state.results.length > 0 && this.state.text.length > 0 && (
                <Suggestions
                  style={styles.Suggestions}
                  results={this.state.results}
                  navigation={this.props.navigation}
                />
              )}
            </View>
            {this.state.showLogo && <Credits screen="Search" />}
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
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
    flexWrap: "nowrap",
    width: 280,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 20,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: colours.highlightBlack,
    alignItems: "center",
    justifyContent: "center"
  },
  TextInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    color: colours.primaryWhite
  },
  Suggestions: {
    flex: 1,
    alignItems: "center",

    color: colours.primaryWhite
  },
  creditsContainer: {
    flexDirection: "row",
    width: 170
  },
  creditsText: {
    fontSize: 12,
    color: colours.secondaryGrey,
    textAlign: "left",
    paddingLeft: 20
  },
  creditsImage: {
    width: 30,
    height: 30,
    opacity: 0.2,
    alignSelf: "flex-start"
  }
});
