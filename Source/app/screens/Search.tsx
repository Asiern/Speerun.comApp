import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { colors } from "../themes/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Games from "../components/Search/Games";
import Users from "../components/Search/Users";
import { StatusBar } from "expo-status-bar";

//AdMob
import AdMob from "../config/admob.json";
import { AdMobBanner } from "expo-ads-admob";
import { context } from "../config/config";

const Tab = createMaterialTopTabNavigator();

export default function Search() {
  const { theme } = useContext(context);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <Tab.Navigator
        style={styles.navigator}
        tabBarOptions={{
          activeTintColor: theme.colors.text,
          labelStyle: { fontSize: 15 },
          style: { backgroundColor: theme.colors.card },
          indicatorStyle: { backgroundColor: theme.colors.primary },
        }}
      >
        <Tab.Screen name="Games" component={Games} />
        <Tab.Screen name="Users" component={Users} />
      </Tab.Navigator>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={AdMob.search}
        servePersonalizedAds
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigator: {
    marginTop: Constants.statusBarHeight,
  },
});
