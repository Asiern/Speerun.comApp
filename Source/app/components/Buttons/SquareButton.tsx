import React from "react";
import { TouchableOpacity, StyleSheet, Text, ColorValue } from "react-native";
import { h3 } from "../../themes/theme";
import { Feather } from "@expo/vector-icons";

export interface SquareButtonProps {
  title: String;
  color: ColorValue;
  backgroundColor: ColorValue;
  onPress?: () => void;
  icon?: string;
}

export default function SquareButtonComponent({
  title,
  color,
  backgroundColor,
  onPress,
  icon,
}: SquareButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      {icon ? (
        <Feather
          name={icon}
          style={{ marginHorizontal: 10 }}
          size={20}
          color={color}
        />
      ) : null}
      <Text style={[h3, { color, alignSelf: "center" }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 5,
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "center",
  },
});
