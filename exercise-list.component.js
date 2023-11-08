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

export const ExerciseListScreen = ({ navigation, route }) => {
  /* Navigation */
  const navigateManager = (exercise) => {
    navigation.navigate("ExerciseManager", {
      phase: route.params.phase,
      week: route.params.week,
      day: route.params.day,
      exercise,
    });
  };

  /* State */
  const exercises = useSelector(
    (state) =>
      state.program.value[route.params.phase].weeks[route.params.week].days[
        route.params.day
      ].exercises
  );

  /* Component View */
  const theme = useTheme();

  const renderItem = ({ item, index }) => (
    <ListItem
      accessoryRight={(props) =>
        item.lsrpe && (
          <Icon
            {...props}
            name="checkmark-outline"
            fill={theme["color-success-500"]}
          ></Icon>
        )
      }
      title={() => <Text category="h6">{item.workoutTitle}</Text>}
      description={() => (
        <Text category="s2">
          {item.workingSets} sets, {item.reps} reps
        </Text>
      )}
      onPress={() => {
        navigateManager(index);
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
