import { useState } from 'react';
import styled from '@emotion/styled';
import { emojiCategories } from '../utils/emojiCategories';
import { theme } from '../styles/theme';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.darkSlateGray};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.neon} ${theme.colors.dodgerBlue};
  border: 2px solid ${theme.colors.dodgerBlue};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const CategoryButton = styled.button`
  width: 320px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 2px solid ${theme.colors.dodgerBlue};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.darkSlateGray};
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSizes.xl};
  cursor: pointer;
  transition: ${theme.transitions.bounce};
  box-shadow: ${theme.shadows.glow} ${theme.colors.dodgerBlue};

  &:hover, &:focus {
    background: ${theme.colors.hotPink};
    color: ${theme.colors.white};
    border-color: ${theme.colors.hotPink};
    box-shadow: ${theme.shadows.intense} ${theme.colors.hotPink};
    outline: none;
    transform: scale(1.05);
  }

  &.selected {
    background: ${theme.colors.springGreen};
    color: ${theme.colors.darkSlateGray};
    border-color: ${theme.colors.springGreen};
    box-shadow: ${theme.shadows.intense} ${theme.colors.springGreen};
    font-weight: ${theme.typography.fontWeights.bold};
    transform: scale(1.08);
  }
`;

const SelectorTitle = styled.h2`
  color: ${theme.colors.dodgerBlue};
  text-shadow: ${theme.shadows.text} ${theme.colors.dodgerBlue};
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
  width: 100%;
`;

const EmojiSelector = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  return (
    <SelectorContainer>
      <SelectorTitle>Choose your emoji category:</SelectorTitle>
      {Object.entries(emojiCategories).map(([category, emojis]) => (
        <CategoryButton
          key={category}
          onClick={() => handleCategorySelect(category)}
          className={selectedCategory === category ? 'selected' : ''}
        >
          {emojis[0]} {category.charAt(0).toUpperCase() + category.slice(1)}
        </CategoryButton>
      ))}
    </SelectorContainer>
  );
};

export default EmojiSelector; 