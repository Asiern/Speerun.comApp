import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../themes/theme";
import { context } from "../../config/config";

export function About() {
  const { theme } = useContext(context);
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <StatusBar style={"dark"}></StatusBar>
      <View style={styles.info}>
        <View
          style={[
            styles.logocontainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text style={[styles.logo, { color: theme.colors.card }]}>
            Speedrun Hub
          </Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          About This App
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          SpeedrunHub is an open source app for IOS/Android platforms made with
          React Native and Expo.{"\n"}
          {"\n"}
          It allows you to consult the speedrun.com page natively on your
          Android/iOS device.{"\n"}
          {"\n"}
          All the data is provided by the speedrun.com REST API.
        </Text>
        <Text
          style={[
            styles.paragraph,
            { fontWeight: "bold", color: theme.colors.text },
          ]}
        >
          Disclaimer: This is not an official app
        </Text>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Release Notes
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              fontWeight: "bold",
              paddingBottom: -5,
              fontSize: 18,
              color: theme.colors.text,
            },
          ]}
        >
          What's New
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          - RunInfo {"\n"}- Expo SDK 40 {"\n"}- Themes {"\n"}- Notifications
          Settings {"\n"}- Show misc. categories
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              fontWeight: "bold",
              paddingBottom: -5,
              fontSize: 18,
              color: theme.colors.text,
            },
          ]}
        >
          Fixes
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          - Fixed: Login layout issues when using the keyboard. {"\n"}- Fixed:
          Leaderboard times format. {"\n"}- Fixed: App crashes when selecting a
          guest user profile/run. {"\n"}- Fixed: Settings layout. {"\n"}- Fixed:
          Webview interactions.
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              fontWeight: "bold",
              paddingBottom: -5,
              fontSize: 18,
              color: theme.colors.text,
            },
          ]}
        >
          Performance
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          - App loading {"\n"}- App perfomance
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              fontWeight: "bold",
              paddingBottom: -5,
              fontSize: 18,
              color: theme.colors.text,
            },
          ]}
        >
          Known Issues
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          - Japanese names not displaying. {"\n"}- OS forced darkmode breaks
          `UserHeader.js` colors. {"\n"}- Game without categories not loading.
        </Text>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Send Feedback
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.text }]}>
          Send me an email at asiern.dev@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  info: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    padding: 20,
  },
  logocontainer: {
    paddingVertical: 20,
    borderRadius: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 20,
  },
  paragraph: {
    paddingVertical: 10,
    fontSize: 15,
  },
  github: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  legal: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  githubtext: {
    alignSelf: "center",
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
