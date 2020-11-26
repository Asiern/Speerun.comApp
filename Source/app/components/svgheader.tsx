import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../themes/theme";

export interface svgheaderProps {
  height: number;
  width: number;
}
export default function svgheader({ height, width }) {
  return (
    <View>
      <View
        style={{
          backgroundColor: colors.primary,
          height: height,
          width: "100%",
        }}
      >
        <Svg
          height="100%"
          width="100%"
          viewBox="0 80 1440 320"
          style={{ top: height, width: width }}
        >
          <Path
            fill={colors.primary}
            d="M0,128L34.3,149.3C68.6,171,137,213,206,229.3C274.3,245,343,235,411,208C480,181,549,139,617,112C685.7,85,754,75,823,106.7C891.4,139,960,213,1029,208C1097.1,203,1166,117,1234,101.3C1302.9,85,1371,139,1406,165.3L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}
