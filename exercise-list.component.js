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

export const ExerciseListScreen = ({ navigation, route }) => {
  /* Navigation */
  const navigateManager = (exercise) => {
    navigation.navigate("ExerciseManager", {
      phase: route.params.phase,
      week: route.params.week,
      day: route.params.day,
      exercise,
    });
  };

  /* State */
  const selectedDay = useSelector(
    (state) =>
      state.program.value[route.params.phase].weeks[route.params.week].days[
        route.params.day
      ]
  );
  const exercises = selectedDay.exercises;

  /* Component View */
  const theme = useTheme();

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          rowGap: "10px",
          backgroundColor: !item.lsrpe && theme["color-primary-default"],
        }}
        accessoryRight={(props) =>
          item.lsrpe && (
            <Icon
              {...props}
              name="checkmark-outline"
              fill={theme["color-success-500"]}
            ></Icon>
          )
        }
        title={() => <Text category="h6">{item.workoutTitle}</Text>}
        description={() => (
          <Text category="s2">
            {item.workingSets} sets, {item.reps} reps
          </Text>
        )}
        onPress={() => {
          navigateManager(index);
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
          <Text category="h3">{selectedDay.title}</Text>
        </View>
        <View style={{ flex: 7 }}>
          <List
            data={exercises}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};
