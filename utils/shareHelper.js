import { Share } from 'react-native';
import { Amplitude } from 'expo';
import { Analytics, Event } from 'expo-analytics';

// GA tracking
const ID = Expo.Constants.manifest.extra.googleAnalytics;
const analytics = new Analytics(ID);

const handleShare = (message, url, title, screen) => {
  Share.share(
    {
      message: message,
      url: url,
      title: title
    },
    {
      // Android only:
      dialogTitle: `Share ` + title, // iOS only:
      excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter']
    }
  ).then(() => {
    Amplitude.logEvent(`BUTTON: Share - ${screen} Screen`);
    analytics.event(new Event('Button', 'Tap', `Share - ${screen} Screen`));
  });
};

export default handleShare;
