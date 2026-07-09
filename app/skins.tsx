// app/skins.tsx
import MovingBackground from "@/components/MovingBackground";
import { SKINS } from "@/constants/skins";
import { useSkin } from "@/hooks/skin";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Skins() {
  const { skin, setSkinId } = useSkin();

  return (
    <ImageBackground
      source={require("@/assets/images/city.webp")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Escolha sua skin</Text>

        <View style={styles.grid}>
          {SKINS.map((item) => {
            const isSelected = item.id === skin.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSkinId(item.id)}
              >
                <Image source={item.source} style={styles.preview} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
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
    paddingTop: 40,
  },
  title: {
    color: "#FF00F6",
    fontSize: 24,
    fontFamily: "PublicPixel",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: 130,
    margin: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#512597",
    alignItems: "center",
  },
  cardSelected: {
    borderColor: "#FF00F6",
  },
  preview: {
    width: 60,
    height: 60,
  },
  name: {
    color: "white",
    marginTop: 8,
    fontSize: 11,
    fontFamily: "PublicPixel",
    textAlign: "center",
  },
  backButton: {
    marginTop: 70,
    borderWidth: 2,
    borderColor: "#FF00F6",
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "black",
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "PublicPixel",
  },
});