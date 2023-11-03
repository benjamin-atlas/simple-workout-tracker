import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Layout, Text, ViewPager } from "@ui-kitten/components";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    maxHeight: "60%",
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  tab: {
    height: 192,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ExerciseManagerScreen = ({ route }) => {
  /* State */
  const exercises = useSelector(
    (state) =>
      state.program.value[route.params.phase].weeks[route.params.week].days[
        route.params.day
      ].exercises
  );

  const [selectedIndex, setSelectedIndex] = useState(route.params.exercise);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewPager selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        {exercises.map((exercise, index) => (
          <Layout
            style={{
              height: "100%",
              ...styles.container
            }}
            key={index + 1}
          >
            <Text category="h3">{exercise.workoutTitle}</Text>
            <Text category="p1">{exercise.notes}</Text>
            <Text category="h5">Sets: {exercise.workingSets}</Text>
            <Text category="h5">Reps: {exercise.reps}</Text>
            <Text category="h5">Rest: {exercise.rest}</Text>
            <Text category="h5">Target RPE: {exercise.rpe}</Text>
            <Text category="h5">Load: {exercise.load}</Text>
            <Text category="h5">LSRPE: {exercise.lsrpe}</Text>
          </Layout>
        ))}
      </ViewPager>
    </SafeAreaView>
  );
};
