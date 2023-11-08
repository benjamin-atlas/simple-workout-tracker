import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Button, Layout, Spinner, Text } from "@ui-kitten/components";
import { populateProgramAsync } from "./state/program/programSlice";
import { useDispatch, useSelector } from "react-redux";
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

export const HomeScreen = ({ navigation }) => {
  /* Navigation */
  const navigatePhases = () => {
    navigation.navigate("Phases");
  };

  const navigateCurrentExercise = () => {
    let currentExerciseIndex = 0;
    let currentDayIndex = 0;
    let currentWeekIndex = 0;
    let currentPhaseIndex = 0;

    program.find((phase, phaseIndex) => {
      currentPhaseIndex = phaseIndex;
      return phase.weeks.find((week, weekIndex) => {
        currentWeekIndex = weekIndex;
        return week.days.find((day, dayIndex) => {
          currentDayIndex = dayIndex;
          return day.exercises.find((exercise, exerciseIndex) => {
            currentExerciseIndex = exerciseIndex;
            return !exercise.lsrpe;
          });
        });
      });
    });

    navigation.navigate("ExerciseManager", {
      phase: currentPhaseIndex,
      week: currentWeekIndex,
      day: currentDayIndex,
      exercise: currentExerciseIndex,
    });
  };

  /* State */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(populateProgramAsync());
  }, []);

  const program = useSelector((state) => state.program.value);
  const programLoading = useSelector((state) => state.program.status);

  /* Component View */
  const theme = useTheme();

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
            <Button onPress={navigateCurrentExercise}>Resume</Button>
            <Button onPress={navigatePhases}>View Program</Button>
          </>
        ) : (
          <Spinner size="giant" />
        )}
      </Layout>
    </SafeAreaView>
  );
};
