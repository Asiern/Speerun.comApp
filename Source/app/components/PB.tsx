import { Link, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { colors } from "../themes/theme";

function timeConverter(time: string) {
  var result = time.toLowerCase();
  return result.substr(2, result.length);
}

export interface PBProps {
  weblink: string;
  place: string;
  category: string;
  time: string;
}

const PB = ({ weblink, place, category, time }: PBProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(weblink)}
      style={styles.container}
    >
      <View style={styles.place}>
        <Text style={styles.accenttext}>{place}</Text>
      </View>
      <View style={styles.category}>
        <Text style={styles.text}>{category}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.text}>{timeConverter(time)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "gold",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 1,
  },
  place: {
    flex: 3,
    alignItems: "center",
  },
  category: {
    flex: 6,
    alignItems: "center",
  },
  runner: {
    flex: 8,
    alignItems: "center",
  },
  time: {
    flex: 8,
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  accenttext: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.primary,
  },
});

export default PB;
