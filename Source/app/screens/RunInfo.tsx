import React, { useContext, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { colors, h4, shadow, h3 } from "../themes/theme";
import VideoCarousel from "../components/RunInfo/VideoCarousel";
import GameCard from "../components/GameCard";
import TopBar from "../components/TopBar";
import Links from "../components/RunInfo/Links";

//Interface
import { run } from "../interface/runInterface";
import { game } from "../interface/gameInterface";
import { category } from "../interface/categoryInterface";
import { player } from "../interface/playersInterface";
import { platform } from "../interface/platformInterface";
import { TouchableOpacity } from "react-native-gesture-handler";
import AdMob from "../config/admob.json";
import { AdMobBanner } from "expo-ads-admob";
import { context } from "../config/config";
import { useNavigation } from "@react-navigation/native";

interface dataProps {
  game: {
    data: game;
  };
  players: {
    data: player[];
  };
  category: {
    data: category;
  };
}
function getId(weblink: string) {
  const first = weblink.lastIndexOf("/") + 1;
  const last = weblink.length;
  return weblink.slice(first, last);
}
function getPlayers(data: run & dataProps) {
  var runners = [];
  for (let player of data.players.data) {
    var runner = {
      userid: null,
      username: "",
    };
    runner.userid = player.id;
    if (player.name !== undefined) {
      runner.username = player.name;
    } else if (player.names.international != "null") {
      runner.username = player.names.international;
      runner.userid = player.id;
    } else {
      runner.username = player.names.japanese;
    }
    runners.push(runner);
  }
  return runners;
}

function timeConverter(time: string) {
  var result = time.toLowerCase();
  return result.substr(2, result.length);
}

export default function RunInfo(props) {
  const { theme } = useContext(context);
  const { weblink } = props.route.params;
  const navigation = useNavigation();
  const [data, setData] = useState<dataProps & run>();
  const [examiner, setExaminer] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [platforms, setPlatforms] = useState<platform[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const scroll = useRef<Animated.ScrollView>(null);
  const ScrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      ScrollY.value = contentOffset.y;
    },
  });
  //Toggle modal visible
  function onPress() {
    setModalVisible(!modalVisible);
  }
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        //Request
        const url =
          "https://www.speedrun.com/api/v1/runs/" +
          getId(weblink) +
          "?embed=players,category,game";
        const response = await fetch(url);
        const data = await response.json();
        setData(data.data);
        //Examiner
        if (data.data.status.status === "verified") {
          const profileUrl =
            "https://www.speedrun.com/api/v1/users/" +
            data.data.status.examiner;
          const userResponse = await fetch(profileUrl);
          const user = await userResponse.json();
          setExaminer(user.data.names.international);
        }
        //Personal Bests
        const userUrl =
          "https://www.speedrun.com/api/v1/users/" +
          data.data.players.data[0].id +
          "/personal-bests";
        const userResponse = await fetch(userUrl);
        const pbs = await userResponse.json();
        for (let pb of pbs.data) {
          if (pb.run.id === getId(weblink)) {
            setPlace(pb.place);
            break;
          }
        }
        //Platforms
        var platforms = [];
        for (let platform of data.data.game.data.platforms) {
          const platformUrl =
            "https://www.speedrun.com/api/v1/platforms/" + platform;
          const platformResponse = await fetch(platformUrl);
          const plat = await platformResponse.json();
          var pla: platform = {
            name: plat.data.name,
            id: plat.data.id,
          };
          platforms.push(pla);
        }
        setPlatforms(platforms);
        setLoading(false);
      })();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        style={{ alignSelf: "center", flex: 1 }}
        size="large"
        color={theme.colors.primary}
      />
    );
  } else {
    return (
      <Animated.ScrollView style={{ flex: 1 }} ref={scroll} onScroll={onScroll}>
        {/* <Modal visible={modalVisible} offset={ScrollY.value}>
          <View />
        </Modal> */}
        <StatusBar style={"dark"}></StatusBar>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <TopBar label={"Run Info"} variant={theme.dark ? "dark" : "light"} />
          <VideoCarousel links={data.videos.links} />
          <Links videolink={data.videos.links[0].uri} weblink={weblink} />
          <View style={styles.gameinfocontainer}>
            <GameCard
              abbreviation={data.game.data.abbreviation}
              id={data.game.data.id}
              width={100}
              height={140}
            />
            <View style={styles.gameinfo}>
              <Text style={[h4, { color: theme.colors.text }]}>
                {data.game.data.names.international}{" "}
              </Text>
              <View style={styles.platforms}>
                {platforms.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={[h4, { color: theme.colors.text }]}
                    >
                      {item.name}{" "}
                    </Text>
                  );
                })}
              </View>
              <Text style={[h4, { color: theme.colors.text }]}>
                Release Date: {data.game.data["release-date"]}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.runtitle,
              shadow,
              { backgroundColor: theme.colors.card },
            ]}
          >
            {getPlayers(data).map((item) => {
              return (
                <TouchableOpacity
                  // onPress={() =>
                  //   item.userid !== undefined
                  //     ? navigation.navigate("Profile", {
                  //         username: item.username,
                  //         userid: item.userid,
                  //       })
                  //     : showToastWithGravity(
                  //         "Ooops, it look like this user has no account at speedrun.com"
                  //       )
                  // }
                  key={item.userid}
                >
                  <Text style={[h3, { color: theme.colors.primary }]}>
                    {item.username}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <View style={styles.rowtext}>
              <Text
                style={[h3, { color: theme.colors.primary }, styles.padding]}
              >
                {place}
              </Text>
              <Text style={[h4, { color: theme.colors.text }, styles.padding]}>
                place in {timeConverter(data.times.primary)}
              </Text>
            </View>

            <Text style={[h4, { color: theme.colors.text }, styles.padding]}>
              Submitted at{" "}
              {data.submitted.slice(0, data.submitted.indexOf("T"))}
            </Text>
            {data.status.status === "new" ? (
              <Text style={[h4, { color: theme.colors.text }, styles.padding]}>
                Pending verification
              </Text>
            ) : (
              <View style={styles.rowtext}>
                <Text
                  style={[h4, { color: theme.colors.text }, styles.padding]}
                >
                  Verified by
                </Text>
                <Text style={[h3, { color: theme.colors.primary }]}>
                  {examiner}
                </Text>
              </View>
            )}
            {data.comment === null ? null : (
              <Text style={[h4, { color: theme.colors.text }, styles.padding]}>
                {data.comment}
              </Text>
            )}
          </View>
        </View>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={AdMob.runinfo}
          servePersonalizedAds
        />
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 20,
  },
  gameinfocontainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gameinfo: {
    justifyContent: "center",
    margin: 10,
    alignItems: "center",
    flex: 1,
  },
  runtitle: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  padding: {
    padding: 10,
  },
  rowtext: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  platforms: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
  },
});
