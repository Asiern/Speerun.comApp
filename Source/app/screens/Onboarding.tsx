import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Slide from "../components/Slide";
import {
  interpolateColor,
  useValue,
  onScrollEvent,
} from "react-native-redash/lib/module/v1";
import Animated, { divide, multiply } from "react-native-reanimated";
import Subslide from "../components/Subslide";
import { colors } from "../themes/theme";
import Dot from "../components/Dot";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
const { width } = Dimensions.get("window");
const slides = [
  {
    title: "Speedrun Hub",
    description: "Your speedrun.com client.",
    color: "#ffc1c1",
    image: require("../assets/Onboarding/race.png"),
  },
  {
    title: "Notifications",
    description: "Receive notifications directly to your phone.",
    color: "#fffbd8",
    image: require("../assets/Onboarding/Notifications.png"),
  },
  {
    title: "My Games",
    description: "Manage your favourite games.",
    color: "#d5ffd1",
    image: require("../assets/Onboarding/Notifications.png"),
  },
  {
    title: "Wellcome!",
    description: "",
    color: "#FF8A65",
    image: require("../assets/Onboarding/Notifications.png"),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useValue();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((page) => page.color),
  });
  const onScroll = onScrollEvent({ x });

  async function save() {
    try {
      await AsyncStorage.setItem("@Onboarding", "true");
    } catch (error) {}
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate={"fast"}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}
        >
          {slides.map((slide, index) => {
            return (
              <Slide
                key={index}
                title={slide.title}
                width={width}
                description={slide.description}
                image={slide.image}
              />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={styles.footercontent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot currentIndex={divide(x, width)} key={index} {...{ index }} />
            ))}
          </View>
          <Animated.View
            style={{
              flexDirection: "row",
              width: width * slides.length,
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {slides.map(({ title, description }, index) => (
              <Subslide
                key={index}
                onPress={() => {
                  if (index === slides.length - 1) {
                    save();
                    navigation.navigate("Login");
                  }
                  if (scroll.current) {
                    scroll.current
                      .getNode()
                      .scrollTo({ x: width * (index + 1), animated: true });
                  }
                }}
                last={index === slides.length - 1}
                {...{ title, description }}
              />
            ))}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slider: {
    flex: 0.7,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  footer: {
    flex: 0.3,
  },
  footercontent: {
    flex: 1,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: 45,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});