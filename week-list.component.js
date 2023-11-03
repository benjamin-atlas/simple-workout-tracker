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

export const WeekListScreen = ({ navigation, route }) => {
  /* Navigation */
  const navigateDays = (week) => {
    navigation.navigate("Days", { phase: route.params.phase, week });
  };

  /* State */
  const weeks = useSelector(
    (state) => state.program.value[route.params.phase].weeks
  );

  /* Component View */
  const renderItem = ({ item, index }) => (
    <ListItem
      title={() => (
        <Text
          category="p1"
          onPress={() => {
            navigateDays(index);
          }}
        >
          {item.week}
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
        <Text category="h3">Weeks</Text>
        <List data={weeks} renderItem={renderItem} style={styles.list} />
      </Layout>
    </SafeAreaView>
  );
};
