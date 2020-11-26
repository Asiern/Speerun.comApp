import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { colors, h4w } from "../../themes/theme";
import { useValue, onScrollEvent } from "react-native-redash/lib/module/v1";
import Dot from "../Dot";
import Animated, { divide } from "react-native-reanimated";

export interface CarouselProps {
  username: string;
  signup: string;
  country?: string;
}

export default function Carousel({ username, signup, country }: CarouselProps) {
  const { width } = Dimensions.get("window");
  const x = useValue(0);
  const onScroll = onScrollEvent({ x });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        bounces={false}
        scrollEventThrottle={1}
        {...{ onScroll }}
      >
        <View style={[styles.imagecontainer, { width }]}>
          <Image
            source={{
              uri:
                "https://www.speedrun.com/themes/user/" +
                username +
                "/image.png",
            }}
            style={styles.Image}
          ></Image>
        </View>
        <View style={[styles.info, { width }]}>
          <Text style={h4w}>Signup: {signup}</Text>
          <Text style={h4w}>{country}</Text>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Dot index={0} currentIndex={divide(x, width)} color={colors.white} />
        <Dot index={1} currentIndex={divide(x, width)} color={colors.white} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
  },
  imagecontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  info: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  circunference: {
    height: 8,
    width: 8,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 5,
  },
});
