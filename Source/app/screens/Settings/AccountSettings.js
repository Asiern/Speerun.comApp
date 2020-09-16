import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  AsyncStorage,
  Clipboard,
} from "react-native";
import colors from "../../config/colors";
import Button from "../../components/Button";

const AccountSettings = (props) => {
  const [user, setUser] = useState("Aa");
  const [userId, setUserId] = useState("48g3q2rx");
  const [key, setKey] = useState("jhsodosaidjois");
  useEffect(() => {
    (async () => {
      const tempuser = await AsyncStorage.getItem("@user");
      const tempuserid = await AsyncStorage.getItem("@userid");
      const tempuserkey = await AsyncStorage.getItem("@API-Key");
      setUser(tempuser);
      setUserId(tempuserid);
      setKey(tempuserkey);
    })();
  }, []);
  function logout() {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.imagecontainer}>
          <Image
            source={{
              uri: "https://www.speedrun.com/themes/user/Asiern/image.png",
            }}
            style={styles.image}
          ></Image>
        </View>
        <View style></View>
      </View>
      <View style={styles.logout}>
        <View style={styles.textinputs}>
          <Text style={styles.text}>User Name</Text>
          <TextInput style={styles.textinput} value={user} editable={false} />
          <Text style={styles.text}>User ID</Text>
          <TextInput style={styles.textinput} value={userId} editable={false} />
          <Text style={styles.text}>User API Key</Text>
          <TextInput
            style={styles.textinput}
            value={key}
            editable={false}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"LOG OUT"}
            textcolor={colors.white}
            color={colors.primary}
            function={() => null}
          />
          <Button
            title={"COPY API-KEY"}
            textcolor={colors.darkgrey}
            color={colors.white}
            function={() => Clipboard.setString(key)}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignContent: "center",
  },
  user: {
    flex: 0.3,
    backgroundColor: colors.primary,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  image: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderRadius: 130,
  },
  imagecontainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textinput: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    justifyContent: "space-evenly",
    alignContent: "center",
    marginHorizontal: 20,
    flex: 0.7,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkgrey,
    marginLeft: 5,
  },
});
export default AccountSettings;