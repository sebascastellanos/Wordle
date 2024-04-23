import React, { useContext, useRef, useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameContext } from '../context/GameContext';

const GameScreen = () => {
  const { board, updateCell, targetWord } = useContext(GameContext);
  const inputsRef = useRef([]);
  const [cellValues, setCellValues] = useState<string[][]>(board);
  const [highlightedCells, setHighlightedCells] = useState<boolean[][]>(Array(6).fill(Array(5).fill(false)));
  const [highlightedCorrectPositionCells, setHighlightedCorrectPositionCells] = useState<boolean[][]>(Array(6).fill(Array(5).fill(false)));

  inputsRef.current = board.flatMap((row, rowIndex) =>
    row.map((_, colIndex) => inputsRef.current[rowIndex * board[0].length + colIndex] || React.createRef())
  );

  const handleTextChange = (text, rowIndex, colIndex) => {
    const updatedValues = [...cellValues];
    updatedValues[rowIndex][colIndex] = text.toUpperCase();
    setCellValues(updatedValues);

    if (colIndex === 4 && text) {
      const wordEntered = updatedValues[rowIndex].join('');
      if (wordEntered === targetWord.toUpperCase()) {
        
        Alert.alert('¡Felicidades!', '¡Has ganado 100 puntos!');
        saveScore(100); 
      } else {
        
        Alert.alert('¡Inténtalo de nuevo!', 'La palabra ingresada no es la correcta.');
        
        if (rowIndex < board.length - 1) {
          inputsRef.current[(rowIndex + 1) * board[0].length].focus();
        }
      }
      
      const newHighlightedCells = updatedValues.map((row, i) =>
        row.map((_, j) => targetWord.toUpperCase().includes(updatedValues[i][j]) && updatedValues[i][j] !== '' ? true : false)
      );
      setHighlightedCells(newHighlightedCells);

      
      const newHighlightedCorrectPositionCells = updatedValues.map((row, i) =>
        row.map((val, j) => val.toUpperCase() === targetWord[j].toUpperCase() && j < wordEntered.length ? true : false)
      );
      setHighlightedCorrectPositionCells(newHighlightedCorrectPositionCells);
    } else {
      const nextIndex = rowIndex * board[0].length + colIndex + 1;
      if (text && nextIndex < inputsRef.current.length) {
        inputsRef.current[nextIndex].focus();
      }
    }
  };

  const handleKeyPress = (event, rowIndex, colIndex) => {
    if (event.nativeEvent.key === 'Backspace' && colIndex > 0) {
      const updatedValues = [...cellValues];
      updatedValues[rowIndex][colIndex - 1] = '';
      setCellValues(updatedValues);
      inputsRef.current[rowIndex * board[0].length + colIndex - 1].focus();
    }
  };

  
  const saveScore = async (score) => {
    try {
      await AsyncStorage.setItem('userScore', score.toString());
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TextInput
              key={colIndex}
              ref={(ref) => (inputsRef.current[rowIndex * board[0].length + colIndex] = ref)}
              style={[
                styles.cell,
                highlightedCells[rowIndex][colIndex] && styles.highlightedCell,
                highlightedCorrectPositionCells[rowIndex][colIndex] && styles.highlightedCorrectPositionCell,
              ]}
              onChangeText={(text) => handleTextChange(text, rowIndex, colIndex)}
              onKeyPress={(event) => handleKeyPress(event, rowIndex, colIndex)}
              maxLength={1}
              value={cellValues[rowIndex][colIndex]}
              editable={true}
              textAlign="center"
              autoCapitalize="characters"
              keyboardType="visible-password"
            />
          ))}
        </View>
      ))}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
  },
  cell: {
    width: 50,
    height: 50,
    margin: 8,
    borderWidth: 1,
    borderColor: '#d3d6da',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  highlightedCell: {
    backgroundColor: 'yellow',
  },
  highlightedCorrectPositionCell: {
    backgroundColor: 'green',
  },
});

export default GameScreen;
