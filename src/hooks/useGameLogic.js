import { useState, useCallback } from 'react';
import { playPlacementSound, playWinSound, playVanishSound } from '../utils/sounds';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const useGameLogic = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerEmojis, setPlayerEmojis] = useState({ 1: [], 2: [] });
  const [winner, setWinner] = useState(null);
  const [lastVanishedCell, setLastVanishedCell] = useState(null);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [winningCombination, setWinningCombination] = useState(null);

  const checkWinner = useCallback((board, playerEmojis) => {
    // Check if any winning combination is present in the player's emojis
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        playerEmojis.includes(a) &&
        playerEmojis.includes(b) &&
        playerEmojis.includes(c)
      ) {
        setWinningCombination(combination);
        return true;
      }
    }
    setWinningCombination(null);
    return false;
  }, []);

  const handleCellClick = useCallback((index, emoji) => {
    if (board[index] || winner || index === lastVanishedCell) return;

    const newBoard = [...board];
    const currentPlayerEmojis = [...playerEmojis[currentPlayer]];

    // If player already has 3 emojis, remove the oldest one
    if (currentPlayerEmojis.length === 3) {
      const oldestEmojiIndex = currentPlayerEmojis[0];
      newBoard[oldestEmojiIndex] = null;
      setLastVanishedCell(oldestEmojiIndex);
      currentPlayerEmojis.shift();
      playVanishSound();
    } else {
      setLastVanishedCell(null);
    }

    // Place new emoji
    newBoard[index] = emoji;
    currentPlayerEmojis.push(index);
    playPlacementSound();

    setBoard(newBoard);
    setPlayerEmojis(prev => ({
      ...prev,
      [currentPlayer]: currentPlayerEmojis
    }));

    // Check for winner
    if (checkWinner(newBoard, currentPlayerEmojis)) {
      setWinner(currentPlayer);
      setScores(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1
      }));
      playWinSound();
    } else {
      setCurrentPlayer(prev => prev === 1 ? 2 : 1);
    }
  }, [board, currentPlayer, playerEmojis, winner, lastVanishedCell, checkWinner]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(1);
    setPlayerEmojis({ 1: [], 2: [] });
    setWinner(null);
    setLastVanishedCell(null);
    setWinningCombination(null);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    lastVanishedCell,
    scores,
    winningCombination,
    handleCellClick,
    resetGame
  };
}; 