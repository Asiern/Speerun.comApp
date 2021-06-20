import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { StackActions } from "@react-navigation/native";
import Carousel from "./GameInfoCarousel";

import Constants from "expo-constants";
import Feather from "@expo/vector-icons/Feather";
import { colors, h2w } from "../../themes/theme";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { context } from "../../config/config";

export interface GameHeaderProps {
  abbreviation: string;
  name: string;
  date: string;
  platforms: any[];
  id: string;
}

const GameHeader = ({
  abbreviation,
  name,
  date,
  platforms,
  id,
}: GameHeaderProps) => {
  const [isFav, setFav] = useState(false);
  const navigation = useNavigation();
  const goBack = StackActions.pop();
  const { games, setGames } = useContext(context);
  const _isFavourite = async (id: string) => {
    for (let GAME of games) {
      if (GAME.id == id) {
        setFav(true);
      }
    }
  };
  const _toggleFavourites = async () => {
    //Create game obj
    var game = {
      id: id,
      abbreviation: abbreviation,
    };
    if (!isFav) {
      //add game to list
      games.push(game);
      //Game added to list
      await AsyncStorage.setItem("@MyGames", JSON.stringify(games));
      setGames(games);
      setFav(true);
    } else {
      //Game got removed from list
      for (let GAME of games) {
        if (game.id == GAME.id) {
          games.splice(games.indexOf(GAME), 1);
        }
      }
      await AsyncStorage.setItem("@MyGames", JSON.stringify(games));
      setGames(games);
      setFav(false);
    }
  };
  useEffect(() => {
    console.log("render GH");
    let mounted = true;
    if (mounted) {
      (async () => {
        _isFavourite(id);
      })();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);
  return (
    <ImageBackground
      imageStyle={{
        opacity: 0.3,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
      style={styles.profileBG}
      source={{
        uri:
          "https://www.speedrun.com/themes/" + abbreviation + "/cover-256.png",
      }}
    >
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
        <View style={styles.topbarright}>
          {isFav ? (
            <FontAwesome
              onPress={() => _toggleFavourites()}
              name="heart"
              color={colors.white}
              size={30}
              style={{ paddingRight: 20 }}
            />
          ) : (
            <FontAwesome
              onPress={() => _toggleFavourites()}
              name="heart-o"
              color={colors.white}
              size={30}
              style={{ paddingRight: 20 }}
            />
          )}
        </View>
      </View>
      <View style={styles.profile}>
        <Carousel
          abbreviation={abbreviation}
          date={date}
          platformIDs={platforms}
        />
      </View>
      <View style={styles.userinfo}>
        <Text style={h2w}>{name}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileBG: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: colors.black,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 20, height: 10 },
    shadowOpacity: 0.9,
    elevation: 10,
  },
  topbar: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    paddingTop: 15,
    paddingBottom: 10,
  },
  topbarleft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  topbarcenter: {
    flex: 1,
    justifyContent: "center",
  },
  topbarright: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Image: {
    width: 110,
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  profile: {
    flex: 1,
  },
  userinfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
export default GameHeader;
