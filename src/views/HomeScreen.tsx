
import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  const handleStartGame = () => {
    navigation.navigate("Game");
  };

  const handleNavigateToScore = () => {
    navigation.navigate("Score");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Wordle</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStartGame}
          >
            <Text style={styles.buttonText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.scoreButton]}
            onPress={handleNavigateToScore}
          >
            <Text style={styles.buttonText}>Puntaje</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", 
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
     
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#ff6347", 
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  startButton: {
    backgroundColor: "#32cd32", 
  },
  scoreButton: {
    backgroundColor: "#ffa500", 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default HomeScreen;