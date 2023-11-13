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

export const PhaseListScreen = ({ navigation }) => {
  /* Navigation */
  const navigateWeeks = (phase) => {
    navigation.navigate("Weeks", { phase });
  };

  /* State */
  const program = useSelector((state) => state.program.value);
  const currentExerciseIndexes = useSelector(
    (state) => state.program.currentExerciseIndexes
  );

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
    const isCurrentPhase = currentExerciseIndexes.currentPhaseIndex === index;

    return (
      <ListItem
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          rowGap: "10px",
          backgroundColor: isCurrentPhase
            ? theme["color-primary-default"]
            : "transparent",
        }}
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
          isCurrentPhase && (
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
          <Text category="h3">Phases</Text>
        </View>
        <View style={{ flex: 7 }}>
          <List
            data={program}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};
