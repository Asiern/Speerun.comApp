import React from "react";
import SettingsSection from "../components/SettingsSection";
import { colors } from "../themes/theme";
import { StatusBar } from "expo-status-bar";
import { AdMobBanner } from "expo-ads-admob";
import { View } from "react-native";

export default function Settings() {
  const Sections = [
    {
      title: "My Account",
      icon: "user",
      navigateTo: "AccountSettings",
      weblink: null,
    },
    // {
    //   title: "Unlock Pro Version",
    //   icon: "unlock",
    //   navigateTo: null,
    //   weblink: "https://play.google.com/store",
    // },
    {
      title: "About",
      icon: "info",
      navigateTo: "About",
      weblink: null,
    },
    {
      title: "Privacy Policy",
      icon: "book-open",
      navigateTo: null,
      weblink:
        "https://github.com/Asiern/SpeedrunHub/blob/master/Readme/Privacy%20Policy.md",
    },
    {
      title: "Terms & Conditions",
      icon: "book",
      navigateTo: null,
      weblink:
        "https://github.com/Asiern/SpeedrunHub/blob/master/Readme/Terms%20%26%20Conditions.md",
    },
    // {
    //   title: "Dev Settings",
    //   icon: "alert-triangle",
    //   navigateTo: "DevSettings",
    //   weblink: null,
    // },
  ];
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <StatusBar style={"dark"}></StatusBar>
      <View>
        {Sections.map((section, index) => {
          return (
            <SettingsSection
              key={index}
              navigateTO={section.navigateTo}
              title={section.title}
              icon={section.icon}
              backgroundColor={colors.white}
              accentColor={colors.primary}
              textPrimaryColor={colors.darkgrey}
              weblink={section.weblink}
            />
          );
        })}
      </View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3552758561036628/7487974176"
        servePersonalizedAds
      />
    </View>
  );
}
