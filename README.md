# Tic-Tac-Toe Web Application

A modern, interactive tic-tac-toe game built with HTML, CSS, and JavaScript featuring both Player vs Player and Player vs AI modes.

🔗 Live site: https://rohanraaj2.github.io/PRODIGY_WD_03/

## 🎮 Features

### Core Gameplay
- **Player vs Player Mode**: Two players can play against each other
- **Player vs AI Mode**: Play against an intelligent AI opponent
- **Interactive Game Board**: Click on cells to place your markers
- **Win Detection**: Automatically detects winning conditions and highlights winning cells
- **Draw Detection**: Recognizes when the game ends in a draw

### User Interface
- **Modern Design**: Beautiful gradient background with glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging hover effects, transitions, and winner animations
- **Game Modal**: Displays game results with options to play again
- **Score Tracking**: Keeps track of wins and draws with persistent storage

### Enhanced Features
- **Keyboard Support**: Use number keys 1-9 to place markers, ESC to close modals
- **Sound Effects**: Audio feedback for moves and game events (optional)
- **Game Analytics**: Track game statistics and history
- **Local Storage**: Scores persist between browser sessions

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation
1. Clone this repository or download the files
2. Open `index.html` in your web browser
3. Start playing immediately!

### File Structure
```
PRODIGY_WD_03/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and animations
├── script.js           # JavaScript game logic
└── README.md           # Project documentation
```

## 🎯 How to Play

### Game Rules
1. The game is played on a 3×3 grid
2. Players take turns placing their markers (X or O)
3. The first player to get 3 markers in a row (horizontally, vertically, or diagonally) wins
4. If all 9 cells are filled without a winner, the game is a draw

### Controls
- **Mouse**: Click on any empty cell to place your marker
- **Keyboard**: Press number keys 1-9 to place markers in corresponding positions
- **Game Modes**: Switch between Player vs Player and Player vs AI
- **Reset**: Use "Reset Game" to start a new game or "Reset Score" to clear statistics

### AI Strategy
The AI opponent uses an intelligent strategy:
1. **Win**: Attempts to complete three in a row
2. **Block**: Prevents the player from winning
3. **Center**: Takes the center position when available
4. **Corners**: Prioritizes corner positions
5. **Edges**: Falls back to edge positions

## 🎨 Customization

### Modifying Styles
Edit `style.css` to customize:
- Color schemes and gradients
- Animation speeds and effects
- Layout and spacing
- Responsive breakpoints

### Extending Functionality
The modular JavaScript structure allows easy extension:
- Add new game modes
- Implement different AI difficulties
- Add multiplayer networking
- Create tournament modes

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript ES6+**: Object-oriented game logic and DOM manipulation

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Efficient DOM manipulation
- CSS hardware acceleration
- Optimized animations
- Minimal memory footprint

## 📱 Mobile Experience

The game is fully optimized for mobile devices:
- Touch-friendly interface
- Responsive design adapts to all screen sizes
- Optimized button sizes for touch interaction
- Portrait and landscape orientation support

## 🔧 Development

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Make changes to the files
4. Refresh the browser to see updates

### Code Structure
- **TicTacToe Class**: Main game logic and state management
- **GameAnalytics Class**: Statistics tracking and history
- **SoundManager Class**: Audio effects management
- **Utility Functions**: Helper functions for UI enhancements

## 🎁 Bonus Features

### Keyboard Shortcuts
- `1-9`: Place marker in corresponding cell
- `ESC`: Close modal dialogs
- `R`: Reset current game (when implemented)

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Focus indicators for all interactive elements

## 🤝 Contributing

Feel free to fork this project and submit pull requests for:
- Bug fixes
- Feature enhancements
- Performance improvements
- Documentation updates

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔒 Privacy & Analytics

This site includes Google Analytics for traffic tracking. No personal data is collected.

## 🎉 Credits

Created as part of the PRODIGY Web Development internship program.

---

**Enjoy playing Tic-Tac-Toe! 🎮**
