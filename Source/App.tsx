import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

//Themes
import { Theme } from "./app/themes/DefaultTheme";

//Screens
import Navigation from "./app/Navigation/Navigation";
import { context, config } from "./app/config/config";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Onboarding");
  const [theme, setTheme] = useState(Theme);
  const [games, setGames] = useState([]);
  const [Config, setConfig] = useState(config);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const THEME = await AsyncStorage.getItem("@Theme");
        const CONF = await AsyncStorage.getItem("@Config");
        const GAMES = await AsyncStorage.getItem("@MyGames");
        var CONFIG;
        //Load Config
        if (CONF === null) {
          await AsyncStorage.setItem("@Config", JSON.stringify(config));
          CONFIG = config;
          setConfig(config);
        } else {
          CONFIG = JSON.parse(CONF);
          setConfig(JSON.parse(CONF));
        }
        //Load Theme
        if (THEME === null) {
          await AsyncStorage.setItem("@Theme", JSON.stringify(Theme));
          setTheme(Theme);
        } else {
          setTheme(JSON.parse(THEME));
        }
        //Load Games
        if (GAMES === null) {
          await AsyncStorage.setItem("@MyGames", JSON.stringify(games));
          setGames([]);
        } else {
          setGames(JSON.parse(GAMES));
        }
        //Load Route
        var route = "";
        if (CONFIG.onboarding !== true) {
          route = "Onboarding";
        } else if (CONFIG.user.logged !== true) {
          route = "Login";
        } else {
          route = "Main";
        }
        setInitialRoute(route);
        setLoading(false);
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return (
      <context.Provider
        value={{ theme, setTheme, Config, setConfig, games, setGames }}
      >
        <Navigation initialRoute={initialRoute} />
      </context.Provider>
    );
  }
}
