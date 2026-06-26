import MovingBackground from "@/components/MovingBackground";
import { useEffect } from "react";
import { useAudioPlayer } from "expo-audio";
import { Image, ImageBackground, Pressable, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pipe from "@/components/Pipe";

export default function Play() {
    const jumpSound = useAudioPlayer(require("@/assets/Sounds/mine.mp3"))

    function handleJump() {
        jumpSound.seekTo(0);
        jumpSound.play();
    }

    useEffect(() => {
        jumpSound.seekTo(0)
        jumpSound.loop = true
        jumpSound.play()

        return () => {
            jumpSound.pause()
        }
    }, [])
  

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <Pressable onPress={handleJump}>
        <SafeAreaView style={styles.screen}>
          <Image
            source={require("@/assets/images/bird.png")}
            style={styles.bird}
          />

          <Pipe gapY={180} />
        </SafeAreaView>
      </Pressable>

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

  bird: {
    width: 130,
    height: 65,
    position: "absolute",
    top: "50%",
    left: 100,
  }
});