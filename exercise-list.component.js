import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Layout, List, ListItem, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";

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

export const ExerciseListScreen = ({ navigation, route }) => {
  /* Navigation */
  // const navigateDays = (week) => {
  //   navigation.navigate("Days", { week });
  // };

  /* State */
  const exercises = useSelector(
    (state) =>
      state.program.value[route.params.phase].weeks[route.params.week].days[
        route.params.day
      ].exercises
  );

  /* Component View */
  const renderItem = ({ item }) => (
    <ListItem
      title={() => <Text category="p1">{item.workoutTitle}</Text>}
      onPress={() => {
        // navigateDays(index);
      }}
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
        <Text category="h3">Exercises</Text>
        <List data={exercises} renderItem={renderItem} style={styles.list} />
      </Layout>
    </SafeAreaView>
  );
};
