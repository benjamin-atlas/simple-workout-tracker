import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Icon, Layout, List, ListItem, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { useTheme } from "@ui-kitten/components";

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
  const theme = useTheme();

  const renderItem = ({ item, index }) => {
    const weekComplete = item.days.every((day) =>
      day.exercises.every((exercise) => exercise.lsrpe)
    );
    return (
      <ListItem
        accessoryRight={(props) =>
          weekComplete && (
            <Icon
              {...props}
              name="checkmark-outline"
              fill={theme["color-success-500"]}
            ></Icon>
          )
        }
        title={() => <Text category="p1">Week {index + 1}</Text>}
        onPress={() => {
          navigateDays(index);
        }}
      />
    );
  };

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
        <Text category="h3">Phase {route.params.phase + 1}</Text>
        <List data={weeks} renderItem={renderItem} style={styles.list} />
      </Layout>
    </SafeAreaView>
  );
};
