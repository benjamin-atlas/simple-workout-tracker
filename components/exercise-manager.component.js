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
  Divider,
  Input,
  Layout,
  Spinner,
  Text,
  ViewPager,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { updateExerciseAsync } from "../state/program/programSlice";
import { useTheme } from "@ui-kitten/components";

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

  /* Component View */
  const theme = useTheme();

  const MetadataItem = ({ label, value }) => (
    <>
      <Layout
        level="1"
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text appearance="hint" category="s1">
          {label}
        </Text>
        <Text category="s1">{value}</Text>
      </Layout>
      <Divider />
    </>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Layout style={{ flex: 1 }} level="2">
        <SafeAreaView style={{ flex: 1 }}>
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
                  level="2"
                >
                  <Card
                    style={{
                      width: "100%",
                      backgroundColor: theme["background-basic-color-3"],
                    }}
                    appearance="filled"
                  >
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        category="h3"
                        style={{ marginBottom: 10, width: "100%" }}
                      >
                        {exercise.workoutTitle}
                      </Text>
                      <Text
                        category="p1"
                        style={{ marginBottom: 10 }}
                        appearance="hint"
                      >
                        {exercise.notes}
                      </Text>
                      <MetadataItem
                        label="Sets"
                        value={exercise.workingSets}
                      ></MetadataItem>
                      <MetadataItem
                        label="Reps"
                        value={exercise.reps}
                      ></MetadataItem>
                      <MetadataItem
                        label="Rest"
                        value={exercise.rest}
                      ></MetadataItem>
                      <MetadataItem
                        label="Target RPE"
                        value={exercise.rpe}
                      ></MetadataItem>
                      <Input
                        label="Load"
                        {...loadInputState}
                        style={{ marginTop: 25 }}
                      ></Input>
                      <Input
                        label="LSRPE"
                        {...lsrpeInputState}
                        style={{ marginTop: 10 }}
                      ></Input>
                      <Button
                        style={{ justifyContent: "flex-start", marginTop: 25 }}
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
        </SafeAreaView>
      </Layout>
    </KeyboardAvoidingView>
  );
};
