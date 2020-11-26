import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import { StackActions, useNavigation } from "@react-navigation/native";

import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { colors, h2w, h4w } from "../../themes/theme";
import Carousel from "./ProfileCarousel";

const goBack = StackActions.pop();

export interface ProfileHeaderProps {
  username: string;
  country?: string;
  signup?: string;
}

const ProfileHeader = ({ username, country, signup }: ProfileHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View style={styles.topbarleft}>
          <Feather
            onPress={() => navigation.dispatch(goBack)}
            name="arrow-left"
            color={colors.white}
            size={35}
            style={{ paddingLeft: 20 }}
          />
        </View>
        <View style={styles.topbarcenter}></View>
        <View style={styles.topbarright}></View>
      </View>
      <View style={styles.imagecontainer}>
        <Carousel username={username} signup={signup} country={country} />
      </View>
      <View style={styles.userinfo}>
        <Text style={[h2w, { fontWeight: "bold" }]}>{username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topbar: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topbarleft: {
    flex: 1,
  },
  topbarcenter: {
    flex: 1,
    justifyContent: "center",
  },
  topbarright: {
    flex: 1,
  },
  profile: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
export default ProfileHeader;
