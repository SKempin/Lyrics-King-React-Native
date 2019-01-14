import React from "react";
import { RootStack } from "./config/router";
import Sentry from "sentry-expo";
import { createAppContainer } from "react-navigation";

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = false;

Sentry.config(
  "https://705f92b0edb44599b814955f3219c1cd@sentry.io/1367138"
).install();

// App Containers
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppContainer />;
  }
}
