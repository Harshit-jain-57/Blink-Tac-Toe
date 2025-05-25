import { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Board from './components/Board';
import EmojiSelector from './components/EmojiSelector';
import GameInstructions from './components/GameInstructions';
import { useGameLogic } from './hooks/useGameLogic';
import { getRandomEmoji } from './utils/emojiCategories';
import { theme } from './styles/theme';

const neonGridAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.darkSlateGray};
  padding: ${theme.spacing.xl};
  color: ${theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.gradients.neonGrid};
    background-size: 50px 50px;
    animation: ${neonGridAnimation} 20s linear infinite;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.xxl};
  color: ${theme.colors.hotPink};
  text-shadow: ${theme.shadows.text} ${theme.colors.hotPink};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
  animation: ${theme.animations.float};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const Status = styled.div`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  text-align: center;
  color: ${theme.colors.springGreen};
  text-shadow: ${theme.shadows.text} ${theme.colors.springGreen};
  padding: ${theme.spacing.md};
  background: rgba(47, 79, 79, 0.8);
  border-radius: ${theme.borderRadius.lg};
  border: 2px solid ${theme.colors.dodgerBlue};
  box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};
  animation: ${theme.animations.glow};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing.md} 0;
  padding: ${theme.spacing.md};
  background: rgba(47, 79, 79, 0.8);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.neon} ${theme.colors.dodgerBlue};
  border: 2px solid ${theme.colors.dodgerBlue};
  width: 100%;
  max-width: 600px;
  justify-content: center;
`;

const ScoreItem = styled.div`
  text-align: center;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.isCurrent ? 'rgba(255, 20, 147, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.isCurrent ? theme.colors.hotPink : theme.colors.dodgerBlue};
  color: ${props => props.isCurrent ? theme.colors.hotPink : theme.colors.white};
  text-shadow: ${props => props.isCurrent ? theme.shadows.text + theme.colors.hotPink : 'none'};
  transition: ${theme.transitions.bounce};
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};
  }
`;

const Button = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  font-size: ${theme.typography.fontSizes.md};
  background: ${theme.gradients.button};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.bounce};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${theme.typography.fontWeights.bold};
  box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.05);
    box-shadow: ${theme.shadows.intense} ${theme.colors.springGreen};
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${theme.colors.darkSlateGray};
    box-shadow: none;
  }
`;

const PlayerSetup = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  margin: ${theme.spacing.md} 0;
  justify-content: center;


  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlayerSection = styled.div`
  background: rgba(47, 79, 79, 0.8);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  border: 2px solid ${theme.colors.dodgerBlue};
  box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};
  width: 100%;
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.intense} ${theme.colors.dodgerBlue};
  }
`;

const PlayerTitle = styled.h2`
  color: ${theme.colors.hotPink};
  text-shadow: ${theme.shadows.text} ${theme.colors.hotPink};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
  font-size: ${theme.typography.fontSizes.xl};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  background: ${theme.colors.darkSlateGray};
  border: 2px solid ${theme.colors.dodgerBlue};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily};
  transition: ${theme.transitions.default};
  font-size: ${theme.typography.fontSizes.md};

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