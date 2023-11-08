import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, SafeAreaView } from "react-native";
import {
  Button,
  Card,
  Input,
  Layout,
  Spinner,
  Text,
  ViewPager,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { updateExerciseAsync } from "./state/program/programSlice";

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
  saveButton: { justifyContent: "flex-start" },
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
  const dispatch = useDispatch();

  const exerciseSaving = useSelector((state) => state.program.status);

  const useInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    return { value, onChangeText: setValue };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewPager selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
        {exercises.map((exercise, index) => {
          const loadInputState = useInputState(exercise.load.toString());
          const lsrpeInputState = useInputState(exercise.lsrpe.toString());

          return (
            <Layout
              style={{
                height: "100%",
                ...styles.container,
              }}
              key={index + 1}
            >
              <Card>
                <Text category="h3">{exercise.workoutTitle}</Text>
                <Text category="p1">{exercise.notes}</Text>
                <Text category="h5">Sets: {exercise.workingSets}</Text>
                <Text category="h5">Reps: {exercise.reps}</Text>
                <Text category="h5">Rest: {exercise.rest}</Text>
                <Text category="h5">Target RPE: {exercise.rpe}</Text>
                <Input label="Load" {...loadInputState}></Input>
                <Input label="LSRPE" {...lsrpeInputState}></Input>
                <Button
                  style={styles.saveButton}
                  size="large"
                  accessoryRight={(props) =>
                    exerciseSaving === "pending" ? (
                      <View style={[props.style]}>
                        <Spinner status="info" />
                      </View>
                    ) : (
                      <View style={[props.style]}></View>
                    )
                  }
                  onPress={() => {
                    dispatch(
                      updateExerciseAsync({
                        phaseIndex: route.params.phase,
                        weekIndex: route.params.week,
                        dayIndex: route.params.day,
                        exerciseIndex: index,
                        newExerciseValues: {
                          ...exercise,
                          load: loadInputState.value,
                          lsrpe: lsrpeInputState.value,
                        },
                      })
                    );
                  }}
                >
                  Save Changes
                </Button>
              </Card>
            </Layout>
          );
        })}
      </ViewPager>
    </SafeAreaView>
  );
};
