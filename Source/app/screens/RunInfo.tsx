import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import User from "../components/Search/User";

import { colors, h4 } from "../themes/theme";
import { FlatList } from "react-native-gesture-handler";
import Splits from "../components/Splits/Splits";

const { width } = Dimensions.get("window");

function getId(weblink: string) {
  const first = weblink.lastIndexOf("/") + 1;
  const last = weblink.length;
  return weblink.slice(first, last);
}
function getPlayers(data: any[]) {
  var outString = "";
  for (let player of data.players.data) {
    if (player.names.international != "null") {
      outString += player.names.international;
    } else {
      outString += player.names.japanese;
    }
  }
  return outString;
}
function timeConverter(time: string) {
  var result = time.toLowerCase();
  return result.substr(2, result.length);
}
export default function RunInfo(props) {
  const { weblink } = props.route.params;
  const [data, setData] = useState([]);
  const [splits, setSplits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runners, setRunners] = useState([]);

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
        setRunners(data.data.players.data);
        //Splits
        if (data.data.splits != null) {
          const splitUrl = data.data.splits.uri;
          const splitresponse = await fetch(splitUrl);
          const splitdata = await splitresponse.json();
          setSplits(splitdata.run.splits);
        }
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
      <ScrollView style={styles.container}>
        <StatusBar style={"dark"}></StatusBar>
        <View style={styles.title}>
          <Text style={h4}>
            {data.category.data.name} in {timeConverter(data.times.primary)} by{" "}
            {getPlayers(data)}
          </Text>
          <Text style={h4}>n place</Text>
        </View>
        <FlatList
          data={runners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width, marginVertical: 10 }}>
              <User username={item.names.international} userid={item.id} />
            </View>
          )}
        ></FlatList>
        <View style={styles.title}>
          {data.times.ingame == null ? null : (
            <Text style={h4}>IGT: {timeConverter(data.times.ingame)}</Text>
          )}
          {data.times.primary == null ? null : (
            <Text style={h4}>Primary: {timeConverter(data.times.primary)}</Text>
          )}
          {data.times.realtime == null ? null : (
            <Text style={h4}>
              Real Time: {timeConverter(data.times.realtime)}
            </Text>
          )}
          <Text></Text>
          <Text style={h4}>Submitted: {data.submitted}</Text>
          <Text style={h4}>Verified by: {data.status.examiner}</Text>
          <Text style={h4}>Verify-date: {data.status["verify-date"]}</Text>
        </View>

        {splits[0] != undefined ? <Splits data={splits} /> : null}
      </ScrollView>
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
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 20,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
});
