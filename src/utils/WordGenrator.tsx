// wordGenerator.tsx

type Word = string;

const validWords: Word[] = ["apple", "crane", "lemon", "grape", "olive"];

export const getRandomWord = (): Word => {
  const randomIndex = Math.floor(Math.random() * validWords.length);
  return validWords[randomIndex];
};

export const isWordValid = (word: Word): boolean => {
  return validWords.includes(word.toLowerCase()) && word.length === 5;
};
