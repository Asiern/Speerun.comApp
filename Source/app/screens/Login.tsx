import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { colors, h2, h6 } from "../themes/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Feather } from "@expo/vector-icons";
import Button from "../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { context } from "../config/config";

const { height, width } = Dimensions.get("window");

export default function Login() {
  const [textinput, setTextinput] = useState("");
  const [keyinput, setKeyinput] = useState("");
  const navigation = useNavigation();
  const { theme, Config, setConfig } = useContext(context);
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
        Config.user.logged = true;
        Config.user.username = name;
        Config.user.userid = id;
        Config.user.key = key;
        setConfig(Config);
        await AsyncStorage.setItem("@Config", JSON.stringify(Config));

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
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: theme.colors.primary }}
    >
      <StatusBar style={"dark"}></StatusBar>
      <View style={[styles.container]}>
        <View
          style={[
            styles.login,
            { backgroundColor: theme.colors.card, overflow: "hidden" },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                h2,
                {
                  color: theme.colors.primary,
                  textAlign: "center",
                },
              ]}
            >
              Welcome back
            </Text>
            <Text
              style={[
                h6,
                {
                  color: theme.colors.text,
                  textAlign: "center",
                },
              ]}
            >
              Use your credentials to login into your account.{"\n\n"} API-Key
              is optional and only used for notifications.
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.textinputs}>
              <View
                style={[
                  styles.textinput,
                  { borderColor: theme.colors.primary },
                ]}
              >
                <Feather name={"user"} size={18} color={theme.colors.primary} />
                <TextInput
                  style={{ marginLeft: 10, flex: 1, color: theme.colors.text }}
                  autoCapitalize={"none"}
                  placeholder={"Username"}
                  autoCompleteType={"username"}
                  onChangeText={(text) => setTextinput(text)}
                  placeholderTextColor={theme.colors.border}
                  value={textinput}
                />
              </View>
              <View
                style={[
                  styles.textinput,
                  { borderColor: theme.colors.primary },
                ]}
              >
                <Feather name={"key"} size={18} color={theme.colors.primary} />
                <TextInput
                  style={{ marginLeft: 10, flex: 1, color: theme.colors.text }}
                  autoCapitalize={"none"}
                  placeholder={"API-Key (Optional)"}
                  autoCompleteType={"username"}
                  onChangeText={(text) => setKeyinput(text)}
                  placeholderTextColor={theme.colors.border}
                  value={keyinput}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              label={"LOG IN"}
              variant={"primary"}
              onPress={() => _storeData(textinput, keyinput)}
              width={(width / 3) * 2}
            />
            <Button
              label={"SIGN UP"}
              variant={"default"}
              onPress={() => {
                loadInBrowser("https://speedrun.com");
              }}
              width={(width / 3) * 2}
            />
          </View>
          <View style={styles.footerline}>
            <View>
              <Text style={{ color: theme.colors.text }}>
                Don't have an API-Key?{" "}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => loadInBrowser("https://www.speedrun.com/api/auth")}
            >
              <Text style={{ color: theme.colors.primary }}>
                Obtain it here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.footer, { backgroundColor: theme.colors.primary }]}
        >
          <Button
            label={"LOG IN AS GUEST"}
            variant={"default"}
            onPress={() => _storeData("Guest", "")}
            width={(width / 3) * 2}
          ></Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
  },
  login: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    paddingHorizontal: 30,
  },

  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 2,
  },
  textinputs: {
    flex: 0.7,
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
    flex: 0.15,
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
