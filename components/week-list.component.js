import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { useTheme } from "@ui-kitten/components";

export const WeekListScreen = ({ navigation, route }) => {
  /* Navigation */
  const navigateDays = (week) => {
    navigation.navigate("Days", { phase: route.params.phase, week });
  };

  /* State */
  const weeks = useSelector(
    (state) => state.program.value[route.params.phase].weeks
  );
  const currentExerciseIndexes = useSelector(
    (state) => state.program.currentExerciseIndexes
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
    const percentCompletion = Math.floor(
      (completedExercises / totalExercises) * 100
    );
    const isCurrentWeek =
      currentExerciseIndexes.currentPhaseIndex === route.params.phase &&
      currentExerciseIndexes.currentWeekIndex === index;

    return (
      <ListItem
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          rowGap: "10px",
          backgroundColor: isCurrentWeek
            ? theme["color-primary-default"]
            : "transparent",
        }}
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
        description={() =>
          isCurrentWeek && (
            <Text category="s2">{percentCompletion}% complete</Text>
          )
        }
        onPress={() => {
          navigateDays(index);
        }}
      />
    );
  };

  return (
    <Layout
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text category="h3">Phase {route.params.phase + 1}</Text>
        </View>
        <View style={{ flex: 7 }}>
          <List
            data={weeks}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};
