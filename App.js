import "react-native-gesture-handler";
import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./assets/theme/custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./navigator.component";
import { Provider } from "react-redux";
import { store } from "./state/store";

export default () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <AppNavigator />
        </ApplicationProvider>
      </Provider>
    </>
  );
};
