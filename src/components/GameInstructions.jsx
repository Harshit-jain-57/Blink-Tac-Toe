import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const InstructionsContainer = styled.div`
  background: ${theme.colors.darkSlateGray};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${theme.shadows.neon} ${theme.colors.dodgerBlue};
  max-width: 600px;
  margin: 1rem auto;
  border: 2px solid ${theme.colors.dodgerBlue};
  color: ${theme.colors.white};
`;

const Title = styled.h2`
  color: ${theme.colors.hotPink};
  text-shadow: ${theme.shadows.glow} ${theme.colors.hotPink};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const RuleList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
`;

const RuleItem = styled.li`
  margin: 0.8rem 0;
  padding: 1rem;
  background: rgba(30, 144, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 1px solid ${theme.colors.dodgerBlue};
  transition: ${theme.transitions.default};

  &:hover {
    background: rgba(30, 144, 255, 0.2);
    transform: translateX(5px);
    box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};
  }
`;

const GameInstructions = () => {
  return (
    <InstructionsContainer>
      <Title>How to Play Blink Tac Toe</Title>
      <RuleList>
        <RuleItem>🎮 Choose your emoji category before starting the game</RuleItem>
        <RuleItem>🔄 Take turns placing emojis on the board</RuleItem>
        <RuleItem>⚡ You can only have 3 emojis on the board at a time</RuleItem>
        <RuleItem>💫 When placing your 4th emoji, your oldest one will disappear</RuleItem>
        <RuleItem>⚠️ You cannot place a new emoji on the cell where one just vanished</RuleItem>
        <RuleItem>🎯 Get 3 of your emojis in a row (horizontal, vertical, or diagonal) to win!</RuleItem>
      </RuleList>
    </InstructionsContainer>
  );
};

export default GameInstructions; 