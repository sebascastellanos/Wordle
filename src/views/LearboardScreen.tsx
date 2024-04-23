import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LearboardScreen = () => {
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const score = await AsyncStorage.getItem('userScore');
        setUserScore(score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marcador</Text>
      {userScore !== null ? (
        <Text style={styles.score}>Tu puntuación: {userScore}</Text>
      ) : (
        <Text style={styles.score}>No hay puntuación disponible</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CEE7E1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
  },
});

export default LearboardScreen;
