import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { colors } from "../themes/theme";
import GameCard from "./GameCard";
import NotificationCard from "./Notifications/NotificationCard";

export interface MyGamesProps {
  data: any[];
}

export default function MyGames({ data }: MyGamesProps) {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  return (
    <>
      {data[0] !== undefined ? (
        <View style={styles.conatiner}>
          {data.map((game) => {
            return (
              <GameCard
                key={game.id}
                id={game.id}
                abbreviation={game.abbreviation}
              />
            );
          })}
        </View>
      ) : (
        <TouchableWithoutFeedback
          style={{ width }}
          onPress={() => navigation.navigate("Search")}
        >
          <NotificationCard
            width={width}
            color={colors.white}
            backgroundColor={colors.darkgrey}
            text={
              "It looks like your game list is empty.\nStart adding games to your list."
            }
          />
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});
