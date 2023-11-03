import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./home.component";
import { WeekListScreen } from "./week-list.component";
import { DayListScreen } from "./day-list.component";
import { ExerciseListScreen } from "./exercise-list.component";
import { ExerciseManagerScreen } from "./exercise-manager.component";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Weeks" component={WeekListScreen} />
    <Screen name="Days" component={DayListScreen} />
    <Screen name="Exercises" component={ExerciseListScreen} />
    <Screen name="ExerciseManager" component={ExerciseManagerScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer screenOptions={{ headerShown: false }}>
    <HomeNavigator />
  </NavigationContainer>
);
