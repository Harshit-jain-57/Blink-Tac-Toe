export const emojiCategories = {
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥨', '🥪', '🌮', '🌯'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🎱', '🏓'],
  nature: ['🌸', '🌺', '🌹', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴'],
};

export const getRandomEmoji = (category) => {
  const emojis = emojiCategories[category];
  return emojis[Math.floor(Math.random() * emojis.length)];
}; 