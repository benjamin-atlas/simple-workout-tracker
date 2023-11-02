import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { default as theme } from "./assets/theme/custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { List, ListItem } from "@ui-kitten/components";
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  initializeAuth,
} from "firebase/auth";
import { getReactNativePersistence, ReactNativeAsyncStorage } from "firebase/auth";
import { getDatabase, ref, onValue, set, push, child } from "firebase/database";

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
  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

    signInWithEmailAndPassword(
      auth,
      process.env.EXPO_PUBLIC_EMAIL,
      process.env.EXPO_PUBLIC_PASSWORD
    )
      .then(() => {
        onValue(
          ref(database, `program`),
          (snapshot) => {
            setData(snapshot.val());
          },
          (err) => {
            console.log(`An error occured fetching the program: ${err}`);
          }
        );
      })
      .catch((err) => {
        console.log(`An error occured signing in: ${err}`);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={() => (
        <Text category="p1">
          Phase {index + 1}
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
