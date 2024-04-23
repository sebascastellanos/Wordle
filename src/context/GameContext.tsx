// GameProvider.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getRandomWord } from '../utils/WordGenrator'; // Importamos la función getRandomWord

interface IGameContext {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  updateCell: (row: number, col: number, value: string) => void;
  targetWord: string;
}

export const GameContext = createContext<IGameContext>({
  board: Array(6).fill(null).map(() => Array(5).fill("")),
  setBoard: () => {},
  updateCell: () => {},
  targetWord: "avion"
});

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [board, setBoard] = useState<string[][]>(
    Array(6).fill(null).map(() => Array(5).fill(""))
  );
  const [targetWord, setTargetWord] = useState<string>("");

  const updateCell = (row: number, col: number, value: string) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  useEffect(() => {
    const generatedWord = getRandomWord();
    setTargetWord(generatedWord);
  }, []); // Ejecutado solo una vez al inicializar el contexto

  return (
    <GameContext.Provider value={{ board, setBoard, updateCell, targetWord }}>
      {children}
    </GameContext.Provider>
  );
};