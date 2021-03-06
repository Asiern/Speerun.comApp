import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { context } from "../../config/config";
import { colors } from "../../themes/theme";

export interface ButtonProps {
  label: string;
  variant: "default" | "primary";
  onPress: () => void;
  width: number;
}

const Button = ({ label, variant, onPress, width }: ButtonProps) => {
  const { theme } = React.useContext(context);
  const height = width * 0.2;
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : colors.light;
  const color = variant === "primary" ? colors.white : colors.darkgrey;
  return (
    <RectButton
      style={[styles.container, { backgroundColor, width, height }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = {
  varian: "default",
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: colors.darkgrey,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 1,
  },
  label: {
    fontSize: 15,
  },
});
export default Button;
