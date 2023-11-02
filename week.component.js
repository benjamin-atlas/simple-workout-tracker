import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import { List, ListItem } from "@ui-kitten/components";
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, initializeAuth } from "firebase/auth";
import {
  getReactNativePersistence,
  ReactNativeAsyncStorage,
} from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

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

export const WeekScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          ...styles.container,
        }}
      >
        <Text>Show weeks</Text>
      </Layout>
    </SafeAreaView>
  );
};
