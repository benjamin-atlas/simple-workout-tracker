import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text
} from "@ui-kitten/components";
import { default as theme } from "./assets/theme/custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { List, ListItem } from "@ui-kitten/components";

const data = new Array(8).fill({
  title: "Phase",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    maxHeight: "60%",
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default () => {
  const renderItem = ({ item, index }) => (
    <ListItem
      title={() => (
        <Text category="p1">
          {item.title} {index + 1}
        </Text>
      )}
    />
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Layout style={styles.container}>
          <Text category="h1" style={{ textAlign: "center" }}>
            Simple Workout Tracker
          </Text>
          <Text category="h3">Phases</Text>
          <List data={data} renderItem={renderItem} style={styles.list} />
        </Layout>
      </ApplicationProvider>
    </>
  );
};
