import { TextInput } from "react-native";


interface Cell {
    row: number;
    col: number;
    value: string;
  }
  
  export const updateCellValue = (board: string[][], row: number, col: number, value: string): string[][] => {
    const updatedBoard = [...board];
    updatedBoard[row][col] = value.toUpperCase();
    return updatedBoard;
  };
  
  export const clearCellValue = (board: string[][], row: number, col: number): string[][] => {
    const updatedBoard = [...board];
    updatedBoard[row][col] = '';
    return updatedBoard;
  };
  
  export const isLastColumn = (colIndex: number, numCols: number): boolean => {
    return colIndex === numCols - 1;
  };
  
  export const moveCursorToNextRow = (inputsRef: React.MutableRefObject<TextInput[]>, rowIndex: number, numCols: number): void => {
    if (rowIndex < numCols - 1) {
      inputsRef.current[(rowIndex + 1) * numCols].focus();
    }
  };
  