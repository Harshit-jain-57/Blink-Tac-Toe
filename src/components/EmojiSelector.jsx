import { useState } from 'react';
import styled from '@emotion/styled';
import { emojiCategories, getRandomEmoji } from '../utils/emojiCategories';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #f0f0f0;
  }

  &.selected {
    background: #333;
    color: white;
  }
`;

const EmojiSelector = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  return (
    <SelectorContainer>
      <h2>Choose your emoji category:</h2>
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