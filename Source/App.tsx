import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator } from "react-native";

//Screens
import Navigation from "./app/Navigation/Navigation";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [Loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const LOGGEDIN = await AsyncStorage.getItem("@Loggedin");
        if (LOGGEDIN == "true") {
          setLoggedin(true);
          setLoading(false);
        } else if (LOGGEDIN == "false") {
          setLoggedin(false);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }

    return function cleanup() {
      mounted = false;
    };
  }, [Loggedin]);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return <Navigation />;
  }
}
