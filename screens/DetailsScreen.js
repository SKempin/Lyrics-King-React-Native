import React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, ImageBackground } from 'react-native';
import { Amplitude, LinearGradient } from 'expo';
import format from 'format-duration';
import Placeholder from 'rn-placeholder';
import { Analytics, ScreenHit } from 'expo-analytics';
// Config
import colours from '../config/colours';
//  Components
import Credits from '../components/Credits';

// GA tracking
const ID = Expo.Constants.manifest.extra.googleAnalytics;
const analytics = new Analytics(ID);

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lyrics: null, err: null, isReady: null };
  }

  async componentDidMount() {
    Amplitude.logEvent(
      `SCREEN - Details: ${this.props.navigation.state.params.title} by ${
        this.props.navigation.state.params.artist.name
      }`
    );
    analytics.hit(
      new ScreenHit(
        `SCREEN - Details: ${this.props.navigation.state.params.title} by ${
          this.props.navigation.state.params.artist.name
        }`
      )
    );
    const { title, artist } = await this.props.navigation.state.params;
    const lyricsQuery = artist.name + '/' + title;
    this.getLyrics(lyricsQuery);
  }

  getLyrics = async lyricsQuery => {
    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${lyricsQuery}`);
      const response = await res.json();
      this.setState({ lyrics: response.lyrics, isReady: true });
    } catch (e) {
      this.setState({ err: e.message });
    }
  };

  displayLyrics() {
    if (this.state.lyrics === undefined || '' || null) {
      return (
        <Text style={{ color: colours.primaryWhite }}>
          Sorry, no lyrics can be found for this song.
        </Text>
      );
    } else {
      return (
        <Placeholder.Paragraph
          lineNumber={4}
          textSize={12}
          lineSpacing={7}
          color="#242424"
          width="60%"
          lastLineWidth="80%"
          firstLineWidth="30%"
          onReady={this.state.isReady}>
          <Text style={styles.lyrics}>{this.state.lyrics}</Text>
        </Placeholder.Paragraph>
      );
    }
  }

  render() {
    const { title, artist, album, duration } = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <ImageBackground source={{ uri: artist.picture_xl }} style={styles.backgroundImage}>
            <LinearGradient
              colors={['transparent', colours.primaryBlack]}
              locations={[0.4, 1.2]}
              style={styles.gradient}
            />
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-end',
                paddingBottom: 40,
                paddingLeft: 19
              }}>
              <Text style={styles.artistHeading}>{artist.name}</Text>
              <Text style={styles.songHeading}>{title}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ flex: 1, paddingLeft: 19, paddingRight: 19 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 30
            }}>
            <Image style={styles.albumImage} source={{ uri: album.cover_medium }} />
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignSelf: 'center',
                paddingRight: 10
              }}>
              <Text style={styles.detailsHeading}>Album</Text>
              <Text style={styles.details}>{album.title}</Text>
              <Text style={styles.detailsHeading}>Duration</Text>
              <Text style={styles.details}>{format(duration * 1000)}</Text>
            </View>
          </View>
          {this.displayLyrics()}
        </View>
        <View style={styles.creditsContainer}>
          <Credits screen="Details" />
        </View>
      </ScrollView>
    );
  }
}

//  Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primaryBlack,
    flex: 1
  },
  backgroundImage: { flex: 1, minHeight: 360, flexDirection: 'row' },
  gradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  artistHeading: {
    color: colours.primaryWhite,
    fontSize: 35,
    fontWeight: '300',
    paddingBottom: 2,
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  songHeading: {
    color: colours.primaryWhite,
    fontSize: 45,
    fontWeight: 'bold',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  albumImage: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 3,
    borderColor: colours.primaryWhite,
    marginRight: 25
  },
  detailsHeading: { color: colours.primaryGrey, marginBottom: 3 },
  details: {
    color: colours.primaryWhite,
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 16
  },
  lyrics: {
    color: colours.primaryWhite,
    lineHeight: 22,
    paddingBottom: 20
  },
  creditsContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: 40,
    paddingBottom: 30
  }
});
