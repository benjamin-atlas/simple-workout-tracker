import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Icon, Layout, List, ListItem, Text } from "@ui-kitten/components";
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
    const dayComplete = item.exercises.every((exercise) => exercise.lsrpe);
    return (
      <ListItem
        accessoryRight={(props) =>
          dayComplete && (
            <Icon
              {...props}
              name="checkmark-outline"
              fill={theme["color-success-500"]}
            ></Icon>
          )
        }
        title={() => <Text category="p1">{item.title}</Text>}
        onPress={() => {
          navigateExercise(index);
        }}
      />
    );
  }

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
        <Text category="h3">Week {route.params.week + 1}</Text>
        <List data={days} renderItem={renderItem} style={styles.list} />
      </Layout>
    </SafeAreaView>
  );
};
