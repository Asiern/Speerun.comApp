import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { colors, h4, shadow, h3pb, h4pb } from "../themes/theme";
import Splits from "../components/Splits/Splits";
import VideoCarousel from "../components/RunInfo/VideoCarousel";
import GameCard from "../components/GameCard";
import TopBar from "../components/TopBar";
import Links from "../components/RunInfo/Links";
import Modal from "../components/RunInfo/Modal";

//Interface
import { run } from "../interface/runInterface";
import { game } from "../interface/gameInterface";
import { category } from "../interface/categoryInterface";
import { player } from "../interface/playersInterface";
import { platform } from "../interface/platformInterface";
import { ScrollView } from "react-native-gesture-handler";
import { AdMobBanner } from "expo-ads-admob";

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
      userid: "",
      username: "",
    };
    runner.userid = player.id;
    if (player.names.international != "null") {
      runner.username = player.names.international;
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
  const { weblink } = props.route.params;
  const [data, setData] = useState<dataProps & run>();
  const [examiner, setExaminer] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [platforms, setPlatforms] = useState<platform[]>([]);
  const [splits, setSplits] = useState([]);
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
        //setPlace(pbs.data.names.international);
        //Splits
        // if (data.data.splits != null) {
        //   const splitUrl = data.data.splits.uri;
        //   const splitresponse = await fetch(splitUrl);
        //   const splitdata = await splitresponse.json();
        //   setSplits(splitdata.run.splits);
        // }
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
        color={colors.primary}
      />
    );
  } else {
    return (
      <Animated.ScrollView style={{ flex: 1 }} ref={scroll} onScroll={onScroll}>
        <Modal visible={modalVisible} offset={ScrollY.value}>
          <View />
        </Modal>
        <StatusBar style={"dark"}></StatusBar>
        <View style={styles.container}>
          <TopBar
            label={"Run Info"}
            variant={"light"}
            onPress={onPress}
            icon={"more-horizontal"}
          />
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
              <Text style={h4}>{data.game.data.names.international} </Text>
              <View style={styles.platforms}>
                {platforms.map((item) => {
                  return (
                    <Text key={item.id} style={h4}>
                      {item.name}
                    </Text>
                  );
                })}
              </View>
              <Text style={h4}>
                Release Date: {data.game.data["release-date"]}
              </Text>
            </View>
          </View>
          <View style={[styles.runtitle, shadow]}>
            {getPlayers(data).map((item) => {
              return (
                <Text key={item.userid} style={h3pb}>
                  {item.username}
                </Text>
              );
            })}
            <View style={styles.rowtext}>
              <Text style={[h4pb, styles.padding]}>{place}</Text>
              <Text style={[h4, styles.padding]}>
                place in {timeConverter(data.times.primary)}
              </Text>
            </View>

            <Text style={[h4, styles.padding]}>
              Submitted at{" "}
              {data.submitted.slice(0, data.submitted.indexOf("T"))}
            </Text>
            {data.status.status === "new" ? (
              <Text style={[h4, styles.padding]}>Pending verification</Text>
            ) : (
              <View style={styles.rowtext}>
                <Text style={[h4, styles.padding]}>Verified by</Text>
                <Text style={h3pb}>{examiner}</Text>
              </View>
            )}
            {data.comment === null ? null : (
              <Text style={[h4, styles.padding]}>{data.comment}</Text>
            )}
          </View>
        </View>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3552758561036628/7487974176"
          servePersonalizedAds
        />
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
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
