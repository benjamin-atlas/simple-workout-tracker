import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import {
  Icon,
  Layout,
  List,
  ListItem,
  Spinner,
  Text,
} from "@ui-kitten/components";
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

export const PhaseListScreen = ({ navigation }) => {
  /* Navigation */
  const navigateWeeks = (phase) => {
    navigation.navigate("Weeks", { phase });
  };

  /* State */
  const program = useSelector((state) => state.program.value);
  const programLoading = useSelector((state) => state.program.status);

  /* Component View */
  const theme = useTheme();

  const renderItem = ({ item, index }) => {
    const completedExercises = item.weeks.reduce((acc, week) => {
      return (
        acc +
        week.days.reduce((acc, day) => {
          return (
            acc +
            day.exercises.reduce((acc, exercise) => {
              return acc + (exercise.lsrpe ? 1 : 0);
            }, 0)
          );
        }, 0)
      );
    }, 0);

    const totalExercises = item.weeks.reduce((acc, week) => {
      return (
        acc +
        week.days.reduce((acc, day) => {
          return acc + day.exercises.length;
        }, 0)
      );
    }, 0);

    const phaseComplete = completedExercises === totalExercises;

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
        title={() => <Text category="h6">Phase {index + 1}</Text>}
        description={() =>
          !phaseComplete && (
            <Text category="s2">
              {Math.floor((completedExercises / totalExercises) * 100)}%
              complete
            </Text>
          )
        }
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
