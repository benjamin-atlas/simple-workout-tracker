import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Layout, Spinner, Text } from "@ui-kitten/components";
import { populateProgramAsync } from "../state/program/programSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
  /* Navigation */
  const navigatePhases = () => {
    navigation.navigate("Phases");
  };

  const navigateCurrentExercise = () => {
    navigation.navigate("ExerciseManager", {
      phase: currentExerciseIndexes.currentPhaseIndex,
      week: currentExerciseIndexes.currentWeekIndex,
      day: currentExerciseIndexes.currentDayIndex,
      exercise: currentExerciseIndexes.currentExerciseIndex,
    });
  };

  /* State */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(populateProgramAsync());
  }, []);

  const currentExerciseIndexes = useSelector(
    (state) => state.program.currentExerciseIndexes
  );
  const programLoading = useSelector((state) => state.program.status);

  /* Component View */
  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <SafeAreaView style={{ flex: 1, rowGap: "15px" }}>
        {programLoading !== "pending" ? (
          <>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text category="h1">Simple Workout Tracker</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <Button onPress={navigatePhases} size="giant" style={{ flex: 1 }}>
                View Program
              </Button>
              <Button
                onPress={navigateCurrentExercise}
                size="giant"
                style={{ flex: 1 }}
              >
                Resume
              </Button>
            </View>
          </>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner size="giant" />
          </View>
        )}
      </SafeAreaView>
    </Layout>
  );
};
