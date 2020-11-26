import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { colors } from "../themes/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Games from "../components/Search/Games";
import Users from "../components/Search/Users";
import { StatusBar } from "expo-status-bar";
import { AdMobBanner } from "expo-ads-admob";

const Tab = createMaterialTopTabNavigator();

export default function Search() {
  return (
    <View style={styles.container}>
      <StatusBar style={"dark"}></StatusBar>
      <Tab.Navigator
        style={styles.navigator}
        tabBarOptions={{
          activeTintColor: colors.darkgrey,
          labelStyle: { fontSize: 15 },
          style: { backgroundColor: colors.white },
          indicatorStyle: { backgroundColor: colors.primary },
        }}
      >
        <Tab.Screen name="Games" component={Games} />
        <Tab.Screen name="Users" component={Users} />
      </Tab.Navigator>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3552758561036628/7487974176"
        servePersonalizedAds
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  navigator: {
    marginTop: Constants.statusBarHeight,
  },
});
