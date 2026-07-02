import { Dimensions, Image, StyleSheet, View, } from "react-native";
import Animated, {useSharedValue, useAnimatedStyle, Easing, withRepeat, withTiming} from "react-native-reanimated";
import { useEffect } from "react";
import { GROUND_HEIGHT } from "@/constants/ground";

export default function MovingBackground() {
  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withRepeat(withTiming(width, { duration: 10000,
      easing: Easing.linear, }), -1,);
  }, [translateX]);

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          source={require("@/assets/images/ground.webp")}
          resizeMode="stretch"
          style={styles.image}
        />
        <Image
          source={require("@/assets/images/ground.webp")}
          resizeMode="stretch"
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
  },

  container: {
    width: "100%",
    flexDirection: "row",
  },

  image: {
    width: "100%",
    height: GROUND_HEIGHT,
  },
});