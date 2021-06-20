import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";
import { colors } from "../themes/theme";

//Components
import Svgheader from "./svgheader";
import { Feather } from "@expo/vector-icons";
import { context } from "../config/config";

const { width, height } = Dimensions.get("screen");

function UserHeader() {
  const navigation = useNavigation();
  const { Config, setConfig } = useContext(context);
  const { username, userid } = Config.user;
  async function signOut() {
    //Remove user
    Config.user = {
      logged: false,
      username: null,
      userid: null,
      key: null,
    };
    setConfig(Config);
    await AsyncStorage.setItem("@Config", JSON.stringify(Config));
    navigation.navigate("Login", { screen: "Login" });
  }
  const createAlert = (msg: string) =>
    Alert.alert(
      "Alert",
      msg,
      [
        { text: "OK", onPress: () => signOut() },
        { text: "Cancel", onPress: () => null },
      ],

      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Svgheader width={width} height={height / 5} />
      <View style={styles.headercontainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              username,
              userid,
            })
          }
          style={styles.touch}
        >
          <View style={styles.imagecontainer}>
            <Image
              source={{
                uri:
                  "https://www.speedrun.com/themes/user/" +
                  username +
                  "/image.png",
              }}
              style={styles.Image}
            ></Image>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.usename}>{username}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconcontainer}
          onPress={() => createAlert("Are you sure you want to log out?")}
        >
          <Feather name="log-out" color={colors.white} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    top: height / 10 - 30,
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
  },
  Image: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
  },
  touch: {
    marginLeft: 10,
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  imagecontainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textcontainer: {
    flex: 2,
    flexDirection: "column",
  },
  welcome: { color: colors.light },
  usename: { color: colors.white, fontWeight: "bold", fontSize: 25 },
  iconcontainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginRight: 20,
    justifyContent: "flex-end",
  },
});

export default UserHeader;
