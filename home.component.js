import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Icon, Layout, List, ListItem, Spinner, Text } from "@ui-kitten/components";
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
  const navigateWeeks = (phase) => {
    navigation.navigate("Weeks", { phase });
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

  const renderItem = ({ item, index }) => {
    const phaseComplete = item.weeks.every((week) =>
      week.days.every((day) =>
        day.exercises.every((exercise) => exercise.lsrpe)
      )
    );

    return (
      <ListItem
        accessoryRight={(props) =>
          phaseComplete && (
            <Icon
              {...props}
              name="checkmark-outline"
              fill={theme["color-success-500"]}
            ></Icon>
          )
        }
        title={() => <Text category="p1">Phase {index + 1}</Text>}
        onPress={() => {
          navigateWeeks(index);
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
        {programLoading !== "pending" ? (
          <>
            <Text category="h1" style={{ textAlign: "center" }}>
              Simple Workout Tracker
            </Text>
            <Text category="h3">Phases</Text>
            <List data={program} renderItem={renderItem} style={styles.list} />
          </>
        ) : (
          <Spinner size="giant" />
        )}
      </Layout>
    </SafeAreaView>
  );
};
