import React from "react";
import { Text, View, StyleSheet, ColorValue } from "react-native";
import { colors } from "../../themes/theme";
export interface NotificationCardProps {
  width: number;
  color: ColorValue;
  backgroundColor: ColorValue;
  text: string;
}
const NotificationCard = ({
  width,
  color,
  backgroundColor,
  text,
}: NotificationCardProps) => {
  function stripHtml(html: string) {
    const regex = /(<([^>]+)>)/gi;
    const result = html.replace(regex, "");
    return result;
  }
  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={[styles.text, { color }]}>{stripHtml(text)}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  card: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 5,
  },
  text: {
    padding: 20,
    alignSelf: "center",
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
});
export default NotificationCard;
