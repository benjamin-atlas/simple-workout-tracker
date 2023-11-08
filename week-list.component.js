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
    const completedExercises = item.days.reduce((acc, day) => {
      return (
        acc +
        day.exercises.reduce((acc, exercise) => {
          return acc + (exercise.lsrpe ? 1 : 0);
        }, 0)
      );
    }, 0);

    const totalExercises = item.days.reduce((acc, day) => {
      return acc + day.exercises.length;
    }, 0);

    const weekComplete = completedExercises === totalExercises;
    const percentCompletion = Math.floor(completedExercises/totalExercises * 100);

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
        title={() => <Text category="h6">Week {index + 1}</Text>}
        description={() => !weekComplete && (percentCompletion > 0) && <Text category="s2">{percentCompletion}% complete</Text>}
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
