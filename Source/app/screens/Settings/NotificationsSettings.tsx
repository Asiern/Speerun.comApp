import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  Switch,
} from "react-native";
import { h3, h4b, h6 } from "../../themes/theme";
import { config, context } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import Button from "../../components/Buttons/Button";
const { width } = Dimensions.get("window");

async function apply(
  config: config,
  max: number,
  unread: boolean,
  setConfig: (config: config) => void
) {
  try {
    config.notifications.max = max;
    config.notifications.unread = unread;
    setConfig(config);
    await AsyncStorage.setItem("@Config", JSON.stringify(config));
    showToastWithGravity("Settings applied correctly");
  } catch (error) {
    showToastWithGravity(error);
  }
}
const showToastWithGravity = (text: string) => {
  ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export function NotificationsSettings() {
  const { Config, setConfig, theme } = useContext(context);
  const [max, setMax] = useState<number>(Config.notifications.max);
  const [unread, setUnread] = useState<boolean>(Config.notifications.unread);
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <View style={styles.row}>
          <Text style={[h4b, { color: theme.colors.text }]}>
            Only show unread notifications
          </Text>
          <Switch
            value={unread}
            onValueChange={() => setUnread(!unread)}
            thumbColor={theme.colors.primary}
            trackColor={theme.colors.text}
            ios_backgroundColor={theme.colors.text}
          />
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[h4b, { color: theme.colors.text }]}>
          Set the number of notifications to receive{"\n"}
        </Text>
        <Text style={[h3, { color: theme.colors.text }]}>{max}</Text>
        <Slider
          style={{ width: width - 40, height: 40 }}
          minimumValue={20}
          maximumValue={200}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.text}
          value={max}
          onValueChange={(value) => setMax(Math.round(value))}
        />
      </View>
      {Config.user.key.length > 0 ? null : (
        <View
          style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={h6}>
            It seems you did not provide your api key, the key is required to
            receive notifications.{"\n"}If you want to receive notifications,
            log in with your key.
          </Text>
        </View>
      )}
      <Button
        variant={"primary"}
        label={"Apply Changes"}
        onPress={() => apply(Config, max, unread, setConfig)}
        width={(width / 3) * 2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  section: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width,
  },
});
