# Blink Tac Toe 🎮

A modern twist on the classic Tic Tac Toe game, where players use emojis and must manage their emoji placements strategically.

## Features

- 🎯 3x3 game board with modern UI
- 🎨 Multiple emoji categories (Animals, Food, Sports, Nature)
- 🔄 Turn-based gameplay
- ⚡ Vanishing rule: Oldest emoji disappears when placing the 4th one
- 🎉 Win detection for horizontal, vertical, and diagonal combinations
- ✨ Smooth animations and transitions
- 📱 Responsive design for all devices

## Tech Stack

- React.js
- Vite
- Emotion (for styled components)
- Framer Motion (for animations)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd blink-tac-toe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## How to Play

1. Each player selects their emoji category before the game starts
2. Players take turns placing emojis on the board
3. Each player can have a maximum of 3 emojis on the board
4. When placing a 4th emoji, the oldest one disappears
5. You cannot place a new emoji on the cell where an emoji just vanished
6. First player to get 3 of their emojis in a row (horizontal, vertical, or diagonal) wins!

## Implementation Details

### Vanishing Rule
The vanishing rule is implemented using a First-In-First-Out (FIFO) queue for each player's emoji placements. When a player places their 4th emoji, the oldest one is automatically removed from the board.

### Emoji Categories
The game includes four categories:
- Animals: 🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯
- Food: 🍕 🍔 🍟 🌭 🍿 🧂 🥨 🥪 🌮 🌯
- Sports: ⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🎱 🏓
- Nature: 🌸 🌺 🌹 🌻 🌼 🌷 🌱 🌲 🌳 🌴

## Future Improvements

- Add sound effects for emoji placement and game events
- Implement a score tracking system
- Add custom emoji category support
- Create an AI opponent
- Add multiplayer support

## License

MIT License # Blink-Tac-Toe
