import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const CellContainer = styled(motion.div)`
  width: 100px;
  height: 100px;
  border: 2px solid ${theme.colors.dodgerBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;
  background: ${theme.colors.darkSlateGray};
  transition: ${theme.transitions.default};
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${theme.colors.springGreen};
    box-shadow: ${theme.shadows.glow} ${theme.colors.springGreen};
  }

  &.winning {
    background: ${theme.colors.hotPink};
    box-shadow: ${theme.shadows.neon} ${theme.colors.hotPink};
    animation: pulse 1s infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.dodgerBlue};
    opacity: 0;
    transition: ${theme.transitions.default};
  }

  &:hover::before {
    opacity: 0.1;
  }

  @keyframes pulse {
    0% { transform: scale(1); box-shadow: ${theme.shadows.neon} ${theme.colors.hotPink}; }
    50% { transform: scale(1.05); box-shadow: ${theme.shadows.neon} ${theme.colors.springGreen}; }
    100% { transform: scale(1); box-shadow: ${theme.shadows.neon} ${theme.colors.hotPink}; }
  }
`;

const Emoji = styled(motion.span)`
  display: inline-block;
  text-shadow: ${theme.shadows.glow} ${theme.colors.springGreen};
  z-index: 1;
`;

const Cell = ({ value, onClick, isDisabled, isWinning }) => {
  return (
    <CellContainer
      onClick={onClick}
      disabled={isDisabled}
      className={isWinning ? 'winning' : ''}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {value && (
        <Emoji
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </Emoji>
      )}
    </CellContainer>
  );
};

export default Cell; 