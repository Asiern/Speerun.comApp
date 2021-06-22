import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { Text, ToastAndroid, View, Button } from "react-native";
import { context } from "../../config/config";
import { h2 } from "../../themes/theme";

export function DevSettings() {
  const games = [
    { id: "w6jve26j", abbreviation: "darksouls" },
    { id: "m1zjlkm6", abbreviation: "re2remake" },
    { id: "m1zky010", abbreviation: "darksouls2" },
    { id: "k6qg0xdg", abbreviation: "darksouls3" },
    { id: "v1prkz68", abbreviation: "re7" },
    { id: "3dx07vdy", abbreviation: "lozss" },
    { id: "m1mn8kd2", abbreviation: "demonssouls" },
    { id: "76rkwed8", abbreviation: "na" },
    { id: "k6qre01g", abbreviation: "the_witcher_3_wild_hunt" },
  ];
  const Toast = (text: string) => {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  const { setGames } = React.useContext(context);
  return (
    <View style={{ alignItems: "center", flex: 1, padding: 20 }}>
      <Text style={h2}>Async Storage Settings</Text>
      <Button
        variant={"primary"}
        title={"Delete Onboarding"}
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("@Onboarding");
            await AsyncStorage.removeItem("@user");
            await AsyncStorage.removeItem("@userid");
            await AsyncStorage.removeItem("@API-Key");
            Toast("Async Storage deleted");
          } catch (error) {
            Toast("Error");
          }
        }}
      />
      <Button
        variant={"primary"}
        title={"Delete Themes"}
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("@Theme");
            Toast("Async Storage deleted");
          } catch (error) {
            Toast("Error");
          }
        }}
      />
      <Button
        variant={"primary"}
        title={"Delete Config"}
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("@Config");
            Toast("Async Storage deleted");
          } catch (error) {
            Toast("Error");
          }
        }}
      />
      <Button
        variant={"primary"}
        title={"Delete MyGames"}
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("@MyGames");
            Toast("Async Storage deleted");
          } catch (error) {
            Toast("Error");
          }
        }}
      />
      <Button
        variant={"primary"}
        title={"Load MyGames"}
        onPress={async () => {
          try {
            await AsyncStorage.setItem("@MyGames", JSON.stringify(games));
            setGames(games);
            Toast("Async Storage Loaded");
          } catch (error) {
            Toast("Error");
          }
        }}
      />
    </View>
  );
}
