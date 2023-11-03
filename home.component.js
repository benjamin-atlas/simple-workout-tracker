import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Layout, List, ListItem, Spinner, Text } from "@ui-kitten/components";
import { populateProgramAsync } from "./state/program/programSlice";
import { useDispatch, useSelector } from "react-redux";

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

export const HomeScreen = ({ navigation }) => {
  const navigateWeeks = () => {
    navigation.navigate("Weeks");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(populateProgramAsync());
  }, []);

  const program = useSelector((state) => state.program.value);
  const programLoading = useSelector((state) => state.program.status);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={() => (
        <Text category="p1" onPress={navigateWeeks}>
          Phase {index + 1}
        </Text>
      )}
    />
  );

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
        {programLoading !== "pending" ? (
          <>
            <Text category="h1" style={{ textAlign: "center" }}>
              Simple Workout Tracker
            </Text>
            <Text category="h3">Phases</Text>
            <List data={program} renderItem={renderItem} style={styles.list} />
          </>
        ) : (
          <Spinner size="giant" />
        )}
      </Layout>
    </SafeAreaView>
  );
};
