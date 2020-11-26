import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import MyGames from "../components/MyGames";
import UserHeader from "../components/UserHeader";
import NotificationBar from "../components/Notifications/NotificationBar";
import { colors, h1 } from "../themes/theme";
import { StatusBar } from "expo-status-bar";

import { AdMobBanner } from "expo-ads-admob";

const { width } = Dimensions.get("screen");

export default function Home() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("Guest");
  const [userid, setUserid] = useState("");
  const [games, setGames] = useState([]);
  const [notifications, setNotifications] = useState([]);

  function fetchNotifications(key: string) {
    var url = "https://www.speedrun.com/api/v1/notifications";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Host", "www.speedrun.com");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-API-Key", key);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.responseText);
        setNotifications(response.data);
      }
    };
    xhr.send();
  }
  async function fetchData() {
    const LOGGEDIN = await AsyncStorage.getItem("@Loggedin");
    const Onboarding = await AsyncStorage.getItem("@Onboarding");
    const key = await AsyncStorage.getItem("@API-Key");
    const GAMES = await AsyncStorage.getItem("@MyGames");
    const username = await AsyncStorage.getItem("@user");
    const userid = await AsyncStorage.getItem("@userid");
    if (Onboarding != "true") {
      navigation.navigate("Onboarding", { screen: "Onboarding" });
    } else if (LOGGEDIN != "true") {
      navigation.navigate("Login", { screen: "Login" });
    }
    setGames(JSON.parse(GAMES === null ? "[]" : GAMES));
    setUsername(username === null ? "" : username);
    setUserid(userid === null ? "" : userid);
    fetchNotifications(key === null ? "" : key);
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <ScrollView style={styles.container}>
      <StatusBar style={"dark"}></StatusBar>
      <View style={styles.profile}>
        <UserHeader username={username} userid={userid} />
      </View>
      <NotificationBar width={width} data={notifications} />
      <Text style={[h1, { marginLeft: 20, fontWeight: "bold" }]}>My Games</Text>
      <MyGames data={games} />
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3552758561036628/7487974176"
        servePersonalizedAds
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  profile: {
    height: 250,
  },
  flatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 3,
    margin: 20,

    justifyContent: "space-between",
  },
  notifications: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
