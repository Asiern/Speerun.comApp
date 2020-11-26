import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { colors } from "../themes/theme";
import { Feather } from "@expo/vector-icons";

export interface SettingsSectionProps {
  navigateTO: string | null;
  weblink: string | null;
  icon: string;
  backgroundColor: string;
  accentColor: string;
  title: string;
  textPrimaryColor: string;
}
const SettingsSection = ({
  navigateTO,
  weblink,
  icon,
  backgroundColor,
  title,
  accentColor,
  textPrimaryColor,
}: SettingsSectionProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={
        navigateTO === null
          ? () => Linking.openURL(weblink == null ? "" : weblink)
          : () => navigation.navigate(navigateTO)
      }
    >
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.icon}>
          <Feather name={icon} color={accentColor} size={26} />
        </View>
        <View style={styles.textcontainer}>
          <Text style={[styles.text, { color: textPrimaryColor }]}>
            {title}
          </Text>
        </View>
        <View style={styles.icon}>
          <Feather name="arrow-right" color={accentColor} size={26} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  textcontainer: {
    flex: 3,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  icon: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SettingsSection;
