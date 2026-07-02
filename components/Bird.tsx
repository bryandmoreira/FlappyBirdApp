import { BIRD_ASPECT_RATIO, BIRD_HEIGHT, GRAVITY } from "@/constants/bird"
import { Dimensions, StyleSheet } from "react-native"
import { useGame } from "@/hooks/game"
import { useEffect } from "react"
import Animated, { useAnimatedStyle, useFrameCallback } from "react-native-reanimated"
import { GROUND_HEIGHT } from "@/constants/ground"

export default function Bird() {
    const { height } = Dimensions.get("window")
    const { birdY, velocity } = useGame()

    const frame = useFrameCallback((frameInfo) => {
        "worklet"

        const t = (frameInfo.timeSincePreviousFrame ?? 0) / 1000

        velocity.value += GRAVITY * t;
        birdY.value += velocity.value * t;
    })

    if(birdY.value > height - BIRD_HEIGHT - GROUND_HEIGHT) {
        birdY.value = height - BIRD_HEIGHT - GROUND_HEIGHT
        velocity.value = 0
    }

    useEffect(() => {
        frame.setActive(true)

        return () => frame.setActive(false)
    }, [frame])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: birdY.value }],
    }))


    return (
        <Animated.Image 
        source={require("@/assets/images/bird.png")}
        style={[styles.bird, animatedStyle]}
        />
    )
}

const styles = StyleSheet.create({
    bird: {
        width: BIRD_HEIGHT * BIRD_ASPECT_RATIO,
        height: BIRD_HEIGHT,
        position: "absolute",
        top: 0,
        left: 100,
    }
})
