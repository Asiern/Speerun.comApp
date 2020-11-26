import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import NotificationCard from "../components/Notifications/NotificationCard";
import { colors } from "../themes/theme";

const Notifications = () => {
  const { data } = useRoute().params;
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <StatusBar style={"auto"}></StatusBar>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <View>
            {item.status == "read" ? (
              <View>
                <NotificationCard
                  width={width}
                  text={item.text}
                  backgroundColor={colors.white}
                  color={colors.darkgrey}
                />
              </View>
            ) : (
              <View>
                <NotificationCard
                  width={width}
                  text={item.text}
                  backgroundColor={colors.primary}
                  color={colors.white}
                />
              </View>
            )}
          </View>
        )}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headertext: {
    color: colors.darkgrey,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
});
export default Notifications;
