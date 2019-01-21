# Lyrics King <img src="_github/lk-logo.gif" width="80">

![](https://img.shields.io/github/license/SKempin/Lyrics-King-React-Native.svg?style=flat-square)
![](https://img.shields.io/github/stars/SKempin/Lyrics-King-React-Native.svg?style=flat-square)
![](https://img.shields.io/github/forks/SKempin/Lyrics-King-React-Native.svg?style=flat-square)

A [React Native](https://facebook.github.io/react-native/) native app utilising [Expo](https://expo.io/), [React Navigation](https://reactnavigation.org) and fetching data from mutliple API's ([Deezer](https://developers.deezer.com/) and [Lyrics.OVH](https://www.lyrics.ovh)). UI built with [Adobe XD](https://www.adobe.com/uk/products/xd.html).
<br><br>
Built as a personal training project for [React Native](https://facebook.github.io/react-native/). Designed in [Adobe XD](https://www.adobe.com/uk/products/xd.html). Design and development by [Stephen Kempin](https://www.stephenkempin.co.uk). This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

### [Expo Demo Link](https://expo.io/@skempin/lyrics-king)

<img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/header-overview.jpg" width="900"  alt="Lyrics King - React Native Expo app">

## Contents

- [App Preview](#app-preview)
- [Expo Project Page](#expo-project-page)
- [Adobe XD](#adobe-xd-files)
- [App Feature](#app-features)
- [Getting Started](#getting-started)
- [What's Included](#whats-included)
- [API's](#apis-used)
- [Contributing](#contributing)
- [Author](#author)
- [Google Play Store](#google-play-store)
- [Donate](#donate)
- [License](#license)


## App Preview

### Video Preview

<a href="https://expo.io/@skempin/lyrics-king">
	<img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/video.gif" width="350" >
</a>

### Search Screen

<img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/search.jpg" width="270" alt="Lyrics King - Search screen" hspace="5"><img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/suggestions.jpg" width="270" alt="Lyrics King - Suggestions on search screen">

### Details Screen

<img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/details-ariana.jpg" width="270" hspace="5" alt="Lyrics King - Details screen, Ariana Grande"><img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/details-above.jpg" width="270" hspace="5" alt="Lyrics King - Details screen, Above and Beyond"><img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/details-dua.jpg" width="270"  alt="Lyrics King - Details screen, Dua Lipa">

### About Screen

<img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/about.jpg" width="270" alt="Lyrics King - About screen">

### Navigation (Drawer)

<img src="https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/screenshots/navigation.jpg" width="270" alt="Lyrics King - Navigation drawer">

## [Expo Project Page](https://expo.io/@skempin/lyrics-king)

This project has been built using [Expo](https://expo.io/). Please install `npm install expo-cli --global` to run this project locally.

Scan the below QR code to open the project on Android:

![](https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/qr.png)

<br>

## Adobe XD files

Design files for the UI can be found in `_design_assets/adobeXD` in the project root. UI design implemented with [flexbox](https://docs.expo.io/versions/latest/react-native/flexbox).

## App Features

### Screens

`src/screens/`

- `SearchScreen.js` - Search the [Deezer API](https://developers.deezer.com/) by song title (_class component_)
- `DetailsScreen.js` - Selected song details (including [Lyrics.ovh](https://www.lyrics.ovh/) API call) (_class component_)
- `AboutScreen.js` - About details (_functional component_)

### Components

`src/components/`

- `Credits.js` - Development credentials template (_functional component_)
- `SocialButton.js` - Button template for sharing links/ the app (_functional component_)
- `Suggestions.js` - Song suggestions (_functional component_)

### Config

`src/config/`

- `router.js` - App navigation routing (including drawer nav render method)
- `colours.js` - Colour constants

### Lib

`src/lib/`

- `constants.js` - Expo manifest [constants](https://docs.expo.io/versions/latest/sdk/constants#__next) and functions

### Utils

`src/utils/`

- `shareHelper.js` - Native device [share method](https://docs.expo.io/versions/latest/react-native/share)

## Getting Started

1. Install the latest Node
2. Install [Expo](https://expo.io/) - `npm install expo-cli --global`
3. `cd` into this project directory
4. `npm install` or `yarn install`
5. Run `expo start`

## What's Included

|                                Name                                | Description                                                                                                                                      |
| :----------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------ |
|           [Expo (incl. React Native)](https://expo.io/)            | Expo is a free and open source toolchain built around React Native to help you build native iOS and Android projects using JavaScript and React. |
|          [React Navigation](https://reactnavigation.org/)          | Routing and navigation for your React Native apps.                                                                                               |
| [Format Duration](https://github.com/hypermodules/format-duration) | Convert a number in milliseconds to a standard duration string.                                                                                  |
|    [RN-Placeholder](https://github.com/mfrachet/rn-placeholder)    | Display some placeholder stuff before rendering your text or media content in React Native.                                                      |

## API's Used

- [Deezer](https://developers.deezer.com/)
- [Lyrics.OVH](https://api.lyrics.ovh)

## Contributing

Due to time constraints there are several features that I haven’t been able to develop yet. If you would like to develop your React Native skills and contribute any of the features below this would be hugely beneficial! :tada:

- [ ] [Debouncing or throttling](https://www.peterbe.com/plog/how-to-throttle-and-debounce-an-autocomplete-input-in-react) on search functionality.
- [ ] Adding clear search button functionality on Android. This functionality [already exists on iOS](https://facebook.github.io/react-native/docs/textinput#clearbuttonmode).
- [ ] [Animations](https://docs.expo.io/versions/latest/react-native/animations) would be a nice touch! Fading in the details screen background image would be priority.
- [ ] Any general performance improvements.

Other contributions and suggestions are always very welcome! [Contact me](https://www.stephenkempin.co.uk) if you wish to discuss anything.

## Author

[Stephen Kempin](https://www.stephenkempin.co.uk)

[Lyrics King Project Github](https://github.com/SKempin/Lyrics-King-React-Native)

## Google Play Store

View my commercial apps on the [SK-UK Google Play Store](https://play.google.com/store/apps/developer?id=SK+-+UK)

<a href='https://play.google.com/store/apps/developer?id=SK+-+UK&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='SK-UK Google Play Store' src='https://github.com/SKempin/Lyrics-King-React-Native/blob/master/_github/google-play.jpg' width='180px'></a>

## Donate

If you like this project and wish to say to say thanks - I'm always open to a coffee!  :coffee:

<a href="https://www.buymeacoffee.com/oru9CZh" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/black_img.png" alt="Buy Me A Coffee" width='180px' ></a>

## License

[MIT](https://github.com/SKempin/Lyrics-King-React-Native/blob/master/LICENSE)

You are welcome to use this however you wish within the MIT license, but please retain [my credentials](https://www.stephenkempin.co.uk/) and links back to [this repo](https://github.com/SKempin/Lyrics-King-React-Native).
