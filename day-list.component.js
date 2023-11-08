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
  const theme = useTheme();

  const renderItem = ({ item, index }) => {
    const completedExercises = item.exercises.reduce((acc, exercise) => {
      return acc + (exercise.lsrpe ? 1 : 0);
    }
    , 0);

    const totalExercises = item.exercises.length;

    const dayComplete = completedExercises === totalExercises;
    const percentCompletion = Math.floor(completedExercises/totalExercises * 100);

    return (
      <ListItem
        accessoryRight={(props) =>
          dayComplete && (
            <Icon
              {...props}
              name="checkmark-outline"
              fill={theme["color-success-500"]}
            ></Icon>
          )
        }
        title={() => <Text category="h6">{item.title}</Text>}
        description={() => !dayComplete && (percentCompletion > 0) && <Text category="s2">{percentCompletion}% complete</Text>}
        onPress={() => {
          navigateExercise(index);
        }}
      />
    );
  }

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
        <Text category="h3">Week {route.params.week + 1}</Text>
        <List data={days} renderItem={renderItem} style={styles.list} />
      </Layout>
    </SafeAreaView>
  );
};
