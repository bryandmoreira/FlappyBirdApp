import { GAP_SIZE, PIPE_WIDTH } from "@/constants/pipe"
import { StyleSheet, View, Dimensions } from "react-native"

interface Props {
    gapY: number
}

export default function Pipe({ gapY }: Props) {
    const {height} = Dimensions.get("window")
    const topHeight = gapY - GAP_SIZE / 2
    const bottomY = gapY + GAP_SIZE / 2
    const bottomHeight = height - bottomY

    return (
        <>
            <View style={[styles.pipe, {left: 100, top: 0, height: topHeight}]} />

            <View style={[styles.pipe, {left: 100, top: bottomY, height: bottomHeight}]} />

        </>
    )
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
        width: PIPE_WIDTH,
        backgroundColor: "#000000",
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: "#242121",
    }
})