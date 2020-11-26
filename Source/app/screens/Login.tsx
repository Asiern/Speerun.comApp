import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { colors } from "../themes/theme";
import AsyncStorage from "@react-native-community/async-storage";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import { Feather } from "@expo/vector-icons";
import Button from "../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function Login() {
  const [textinput, setTextinput] = useState("");
  const [keyinput, setKeyinput] = useState("");
  const navigation = useNavigation();
  function showToastWithGravity(text: string) {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
  async function _storeData(user: string, key: string) {
    try {
      const url = "https://www.speedrun.com/api/v1/users/" + user;
      const response = await fetch(url);
      const data = await response.json();
      //TODO Verify API key
      if (data.data.id !== null) {
        const id = data.data.id;
        const name = data.data.names.international;
        await AsyncStorage.setItem("@user", name);
        await AsyncStorage.setItem("@userid", id);
        await AsyncStorage.setItem("@API-Key", key);
        await AsyncStorage.setItem("@Loggedin", "true");

        showToastWithGravity("Logged in successfully.");
        navigation.navigate("Main", { screen: "Home" });
      }
    } catch (error) {
      showToastWithGravity(
        "User not found, please type the username as shown on Speedrun.com"
      );
    }
  }
  function loadInBrowser(link: string) {
    Linking.openURL(link).catch((err) =>
      showToastWithGravity("Couldn't load page")
    );
  }
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[colors.primary, colors.primary]}
    >
      <View style={styles.login}>
        <StatusBar style={"dark"}></StatusBar>
        <View style={styles.header}>
          <Text style={styles.h1}>Welcome back</Text>
          <Text style={styles.h2}>
            Use your credentials to login into your account.{"\n\n"} API-Key is
            optional and only used for notifications.
          </Text>
        </View>
        <KeyboardAvoidingView style={styles.form}>
          <View style={styles.textinputs}>
            <View style={styles.textinput}>
              <Feather name={"user"} size={18} color={colors.primary} />
              <TextInput
                style={{ marginLeft: 10, flex: 1 }}
                autoCapitalize={"none"}
                placeholder={"Username"}
                autoCompleteType={"username"}
                onChangeText={(text) => setTextinput(text)}
                value={textinput}
              />
            </View>
            <View style={styles.textinput}>
              <Feather name={"key"} size={18} color={colors.primary} />
              <TextInput
                style={{ marginLeft: 10, flex: 1 }}
                autoCapitalize={"none"}
                placeholder={"API-Key (Optional)"}
                autoCompleteType={"username"}
                onChangeText={(text) => setKeyinput(text)}
                value={keyinput}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View style={styles.buttons}>
            <Button
              label={"LOG IN"}
              variant={"primary"}
              onPress={() => _storeData(textinput, keyinput)}
            />
            <Button
              label={"SIGN UP"}
              variant={"default"}
              onPress={() => {
                loadInBrowser("https://speedrun.com");
              }}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footerline}>
          <View>
            <Text>Don't have an API-Key? </Text>
          </View>
          <TouchableOpacity
            onPress={() => loadInBrowser("https://www.speedrun.com/api/auth")}
          >
            <Text style={{ color: colors.primary }}>Obtain it here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          label={"LOG IN AS GUEST"}
          variant={"default"}
          onPress={() => _storeData("Guest", "")}
        ></Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  login: {
    flex: 4,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignContent: "center",
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    paddingHorizontal: 30,
  },

  header: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 2,
  },
  textinputs: {
    flex: 0.5,
    justifyContent: "center",
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.9,
  },
  footerline: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 0.5,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    color: colors.primary,
  },
  h2: {
    fontSize: 15,
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  textinput: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
