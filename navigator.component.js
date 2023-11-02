import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./home.component";
import { WeekScreen } from "./week.component";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Weeks" component={WeekScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer screenOptions={{ headerShown: false }}>
    <HomeNavigator />
  </NavigationContainer>
);
