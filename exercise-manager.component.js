import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  SafeAreaView,
} from "react-native";
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
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ViewPager
            style={{ flex: 1 }}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          >
            {exercises.map((exercise, index) => {
              const loadInputState = useInputState(exercise.load.toString());
              const lsrpeInputState = useInputState(exercise.lsrpe.toString());

              return (
                <Layout
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={index + 1}
                >
                  <Card>
                    <View style={{ flexDirection: "column", rowGap: "20px" }}>
                      <Text category="h3">{exercise.workoutTitle}</Text>
                      <Text category="p1">{exercise.notes}</Text>
                      <Text category="h5">Sets: {exercise.workingSets}</Text>
                      <Text category="h5">Reps: {exercise.reps}</Text>
                      <Text category="h5">Rest: {exercise.rest}</Text>
                      <Text category="h5">Target RPE: {exercise.rpe}</Text>
                      <Input label="Load" {...loadInputState}></Input>
                      <Input label="LSRPE" {...lsrpeInputState}></Input>
                      <Button
                        style={{ justifyContent: "flex-start" }}
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
                    </View>
                  </Card>
                </Layout>
              );
            })}
          </ViewPager>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );
};
