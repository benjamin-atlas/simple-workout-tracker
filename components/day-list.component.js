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

export const DayListScreen = ({ navigation, route }) => {
  /* Navigation */
  const navigateExercise = (day) => {
    navigation.navigate("Exercises", {
      phase: route.params.phase,
      week: route.params.week,
      day,
    });
  };

  /* State */
  const days = useSelector(
    (state) =>
      state.program.value[route.params.phase].weeks[route.params.week].days
  );

  /* Component View */
  const theme = useTheme();

  const renderItem = ({ item, index }) => {
    const completedExercises = item.exercises.reduce((acc, exercise) => {
      return acc + (exercise.lsrpe ? 1 : 0);
    }, 0);

    const totalExercises = item.exercises.length;

    const dayComplete = completedExercises === totalExercises;
    const percentCompletion = Math.floor(
      (completedExercises / totalExercises) * 100
    );

    return (
      <ListItem
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          rowGap: "10px",
          backgroundColor:
            !dayComplete &&
            percentCompletion > 0 &&
            theme["color-primary-default"],
        }}
        accessoryRight={(props) =>
          dayComplete && (
            <Icon
              {...props}
              name="checkmark-outline"
              fill={theme["color-success-500"]}
            ></Icon>
          )
        }
        title={() => <Text category="h6">{item.title}</Text>}
        description={() =>
          !dayComplete &&
          percentCompletion > 0 && (
            <Text category="s2">{percentCompletion}% complete</Text>
          )
        }
        onPress={() => {
          navigateExercise(index);
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
          <Text category="h3">Week {route.params.week + 1}</Text>
        </View>
        <View style={{ flex: 7 }}>
          <List
            data={days}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};
