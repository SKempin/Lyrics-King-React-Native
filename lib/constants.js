import { Constants } from 'expo';
const { ...social } = Expo.Constants.manifest.extra.social;

// Expo constants
export const expoVersion = Constants.expoVersion;
// export const iOSBuild = Constants.platform.ios.buildNumber;
export const manifest = Constants.manifest;
// functions
export const getCurrentYear = new Date().getFullYear();
// Social Links
export const socialLinks = [
  {
    icon: 'google-play',
    label: 'SK-UK Play Store',
    url: social.googlePlayStore
  },
  { icon: 'app-store', label: 'SK-UK iTunes Store', url: social.iTunesStore },
  { icon: 'github', label: 'Github Project', url: social.github },
  { icon: '', label: 'SK Portfolio', url: social.portfolio }
];
