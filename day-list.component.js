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

export const DayListScreen = ({ navigation, route }) => {
  /* Navigation */
  const navigateExercise = (day) => {
    navigation.navigate("Exercises", {
      phase: route.params.phase,
      week: route.params.week,
      day,
    });
  };

  /* State */
  const days = useSelector(
    (state) =>
      state.program.value[route.params.phase].weeks[route.params.week].days
  );

  /* Component View */
  const renderItem = ({ item, index }) => (
    <ListItem
      title={() => <Text category="p1">{item.title}</Text>}
      onPress={() => {
        navigateExercise(index);
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
        <Text category="h3">Days</Text>
        <List data={days} renderItem={renderItem} style={styles.list} />
      </Layout>
    </SafeAreaView>
  );
};