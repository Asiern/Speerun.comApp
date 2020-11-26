import React, { useState, useEffect } from "react";
import { View, SectionList } from "react-native";

import ProfileHeader from "../components/Profile/ProfileHeader";
import PB from "../components/PB";
import SectionHeader from "../components/SectionHeader";

import { AdMobBanner } from "expo-ads-admob";
import { StatusBar } from "expo-status-bar";

export default function Profile(props) {
  const [country, setCountry] = useState("");
  const [sections, setSections] = useState({});
  const [user, setUser] = useState([]);
  const { username, userid } = props.route.params;

  function filterPBS(data) {
    var sectionList = {
      data: [], //sections
      pagination: [],
    };
    for (let run of data) {
      var section = {
        abbreviation: "",
        name: "",
        id: "",
        data: [],
      };
      if (!sectionList.pagination.includes(run.game.data.id)) {
        section.abbreviation = run.game.data.abbreviation;
        section.id = run.game.data.id;
        section.name = run.game.data.names.international;

        sectionList.data.push(section);
        sectionList.pagination.push(run.game.data.id);
      }
      //Create run object
      var r = {
        place: run.place,
        runnerid: run.run.players[0].id,
        time: run.run.times.primary,
        category: run.category.data.name,
        weblink: run.run.weblink,
      };
      //Push data
      var index = sectionList.pagination.indexOf(run.game.data.id);
      sectionList.data[index].data.push(r);
    }

    setSections(sectionList);
  }
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        //PBs
        const runsurl =
          "https://www.speedrun.com/api/v1/users/" +
          userid +
          "/personal-bests?embed=game,category";
        const runsresponse = await fetch(runsurl);
        const runsdata = await runsresponse.json();
        //User
        const userurl = "https://www.speedrun.com/api/v1/users/" + userid;
        const userresponse = await fetch(userurl);
        const userdata = await userresponse.json();
        setUser(userdata.data);
        if (userdata.data.location != null) {
          setCountry(userdata.data.location.country.names.international);
        }
        filterPBS(runsdata.data);
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <>
      <StatusBar style={"dark"}></StatusBar>
      <SectionList
        sections={sections.data}
        keyExtractor={(item, index) => item + index}
        ListFooterComponent={
          <View style={{ paddingTop: 20 }}>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-3552758561036628/7487974176"
              servePersonalizedAds
            />
          </View>
        }
        ListHeaderComponent={
          <ProfileHeader
            username={username}
            country={country}
            signup={user.signup}
          />
        }
        renderItem={({ item }) => (
          <PB
            place={item.place}
            time={item.time}
            category={item.category}
            weblink={item.weblink}
          />
        )}
        renderSectionHeader={({ section }) => (
          <SectionHeader
            abbreviation={section.abbreviation}
            id={section.id}
            name={section.name}
          />
        )}
      />
    </>
  );
}
