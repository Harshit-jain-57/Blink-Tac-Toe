import { useState } from 'react';
import styled from '@emotion/styled';
import Board from './components/Board';
import EmojiSelector from './components/EmojiSelector';
import GameInstructions from './components/GameInstructions';
import { useGameLogic } from './hooks/useGameLogic';
import { getRandomEmoji } from './utils/emojiCategories';
import { theme } from './styles/theme';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.gradients.background};
  padding: 2rem;
  color: ${theme.colors.white};
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.hotPink};
  text-shadow: ${theme.shadows.neon} ${theme.colors.hotPink};
  margin-bottom: 1rem;
  text-align: center;
`;

const Status = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.springGreen};
  text-shadow: ${theme.shadows.glow} ${theme.colors.springGreen};
  padding: 1rem;
  background: rgba(47, 79, 79, 0.8);
  border-radius: 8px;
  border: 2px solid ${theme.colors.dodgerBlue};
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(47, 79, 79, 0.8);
  border-radius: 12px;
  box-shadow: ${theme.shadows.neon} ${theme.colors.dodgerBlue};
  border: 2px solid ${theme.colors.dodgerBlue};
`;

const ScoreItem = styled.div`
  text-align: center;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  background: ${props => props.isCurrent ? 'rgba(255, 20, 147, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.isCurrent ? theme.colors.hotPink : theme.colors.dodgerBlue};
  color: ${props => props.isCurrent ? theme.colors.hotPink : theme.colors.white};
  text-shadow: ${props => props.isCurrent ? theme.shadows.glow + theme.colors.hotPink : 'none'};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  background: ${theme.colors.dodgerBlue};
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: ${theme.transitions.default};
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid ${theme.colors.dodgerBlue};

  &:hover:not(:disabled) {
    background: ${theme.colors.darkOrange};
    border-color: ${theme.colors.darkOrange};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.neon} ${theme.colors.darkOrange};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${theme.colors.darkSlateGray};
    border-color: ${theme.colors.darkSlateGray};
  }
`;

const PlayerSetup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  width: 100%;
  margin: 1rem 0;
`;

const PlayerSection = styled.div`
  background: rgba(47, 79, 79, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid ${theme.colors.dodgerBlue};
  box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};
`;

const PlayerTitle = styled.h2`
  color: ${theme.colors.hotPink};
  text-shadow: ${theme.shadows.glow} ${theme.colors.hotPink};
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  background: ${theme.colors.darkSlateGray};
  border: 2px solid ${theme.colors.dodgerBlue};
  border-radius: 8px;
  color: ${theme.colors.white};
  font-family: 'Orbitron', sans-serif;
  transition: ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.springGreen};
    box-shadow: ${theme.shadows.glow} ${theme.colors.springGreen};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

function App() {
  const [playerCategories, setPlayerCategories] = useState({ 1: null, 2: null });
  const [playerNames, setPlayerNames] = useState({ 1: '', 2: '' });
  const [gameStarted, setGameStarted] = useState(false);
  const { 
    board, 
    currentPlayer, 
    winner, 
    lastVanishedCell, 
    scores,
    winningCombination,
    handleCellClick, 
    resetGame 
  } = useGameLogic();

  const handleCategorySelect = (player, category) => {
    setPlayerCategories(prev => ({
      ...prev,
      [player]: category
    }));
  };

  const handleNameChange = (player, name) => {
    setPlayerNames(prev => ({
      ...prev,
      [player]: name
    }));
  };

  const startGame = () => {
    if (playerCategories[1] && playerCategories[2] && playerNames[1] && playerNames[2]) {
      setGameStarted(true);
    }
  };

  const handleCellClickWithEmoji = (index) => {
    const category = playerCategories[currentPlayer];
    const emoji = getRandomEmoji(category);
    handleCellClick(index, emoji);
  };

  const handleReset = () => {
    setGameStarted(false);
    setPlayerCategories({ 1: null, 2: null });
    resetGame();
  };

  if (!gameStarted) {
    return (
      <AppContainer>
        <GameContainer>
          <Title>Blink Tac Toe</Title>
          <GameInstructions />
          <PlayerSetup>
            <PlayerSection>
              <PlayerTitle>Player 1</PlayerTitle>
              <Input
                type="text"
                placeholder="Enter your name"
                value={playerNames[1]}
                onChange={(e) => handleNameChange(1, e.target.value)}
                maxLength={15}
              />
              <EmojiSelector onSelect={(category) => handleCategorySelect(1, category)} />
            </PlayerSection>
            <PlayerSection>
              <PlayerTitle>Player 2</PlayerTitle>
              <Input
                type="text"
                placeholder="Enter your name"
                value={playerNames[2]}
                onChange={(e) => handleNameChange(2, e.target.value)}
                maxLength={15}
              />
              <EmojiSelector onSelect={(category) => handleCategorySelect(2, category)} />
            </PlayerSection>
          </PlayerSetup>
          <Button 
            onClick={startGame} 
            disabled={!playerCategories[1] || !playerCategories[2] || !playerNames[1] || !playerNames[2]}
          >
            Start Game
          </Button>
        </GameContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <GameContainer>
        <Title>Blink Tac Toe</Title>
        <ScoreBoard>
          <ScoreItem isCurrent={currentPlayer === 1}>
            {playerNames[1]}: {scores[1]}
          </ScoreItem>
          <ScoreItem isCurrent={currentPlayer === 2}>
            {playerNames[2]}: {scores[2]}
          </ScoreItem>
        </ScoreBoard>
        <Status>
          {winner 
            ? `${playerNames[winner]} Wins!` 
            : `${playerNames[currentPlayer]}'s Turn`}
        </Status>
        <Board 
          board={board} 
          onCellClick={handleCellClickWithEmoji}
          lastVanishedCell={lastVanishedCell}
          winningCombination={winningCombination}
        />
        <Button onClick={handleReset}>Play Again</Button>
      </GameContainer>
    </AppContainer>
  );
}

export default App; 