import BackgroundSound from "@/components/BackgroundSound";
import MovingBackground from "@/components/MovingBackground";
import { useGame } from "@/hooks/game";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameOver() {
    const { score } = useGame();
    const birdY = useRef(new Animated.Value(0)).current;

   const getScoreMessage = (score: number) => {
    if (score >= 20) return "Amassou!";
    if (score > 10) return "Muito bom!";
    if (score < 5) return "Pode melhorar!";
    return "Continue jogando!"; 
};

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(birdY, {
                    toValue: -10,
                    duration: 600,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(birdY, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <ImageBackground
            source={require("@/assets/images/city.webp")}
            resizeMode="cover"
            style={styles.background}
        >
            <BackgroundSound source={require("@/assets/audios/background.mp3")} />
            <SafeAreaView style={styles.screen}>
                <View style={styles.headerContainer}>
                    <View style={styles.titleRow}>
                        <Animated.Image
                            source={require("@/assets/images/drone.gif")}
                            style={[
                                styles.birdLeft,
                                { transform: [{ translateY: birdY }] },
                            ]}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Game over</Text>



                    </View>
                </View>

                <View style={styles.score}>
                    <Text style={styles.scoreText}>{score}</Text>
                    <Image source={require("@/assets/images/coin.gif")}
                        style={styles.scoreImage} />
                </View>

                <Text style={styles.messageText}>{getScoreMessage(score)}</Text>


                <Link href="/" asChild replace>
                    <TouchableOpacity style={styles.button}>
                        <LinearGradient
                            style={styles.buttonGradient}
                            colors={["#621AD3", "#512597"]}
                        >
                            <Text style={styles.buttonText}>Voltar ao menu</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
            </SafeAreaView>
            <MovingBackground />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
    },
    screen: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 50,
        marginTop: 30,
        fontFamily: "PublicPixel",
        textShadowColor: "#FF00F6",
        textShadowOffset: {
            width: 3,
            height: 3,
        },
        paddingRight: 3,
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 30,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    birdLeft: {
        width: 120,
        height: 120,
        marginRight: 12,
    },
    titleSuffix: {
        marginLeft: 6,
    },
    bird: {
        width: 80,
        height: 80,
        marginTop: 10,
    },
    button: {
        backgroundColor: "black",
        position: "absolute",
        top: "55%",
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 12,

    },



    buttonGradient: {
        paddingHorizontal: 50,
        paddingVertical: 12,
        width: "100%",
        height: "100%",
        borderRadius: 10,

    },
    buttonText: {
        color: "white",
        fontSize: 20,
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        textShadowColor: "black",
        fontFamily: "PublicPixel",
    },

    score: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    scoreImage: {
        height: 20,
        width: 20,
    },
    scoreText: {
        color: "white",
        fontSize: 20,
        fontFamily: "PublicPixel",
        textShadowColor: "black",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
    },

    messageText: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: "PublicPixel",
        color: "white",
        textShadowColor: "black",
        textShadowOffset: { width: 1, height: 1 },
    },
},




);