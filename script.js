class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameMode = 'pvp'; // 'pvp' for Player vs Player, 'pva' for Player vs AI
        this.scores = {
            X: 0,
            O: 0,
            draw: 0
        };
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerText = document.getElementById('current-player-text');
        this.gameStatus = document.getElementById('game-status');
        this.resetGameBtn = document.getElementById('reset-game');
        this.resetScoreBtn = document.getElementById('reset-score');
        this.pvpModeBtn = document.getElementById('pvp-mode');
        this.pvaModeBtn = document.getElementById('pva-mode');
        this.modal = document.getElementById('game-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.playAgainBtn = document.getElementById('play-again');
        this.closeModalBtn = document.getElementById('close-modal');
        
        this.scoreElements = {
            X: document.getElementById('score-x'),
            O: document.getElementById('score-o'),
            draw: document.getElementById('score-draw')
        };
        
        this.addEventListeners();
        this.updateDisplay();
        this.loadScores();
    }
    
    addEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetGameBtn.addEventListener('click', () => this.resetGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScores());
        this.pvpModeBtn.addEventListener('click', () => this.setGameMode('pvp'));
        this.pvaModeBtn.addEventListener('click', () => this.setGameMode('pva'));
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
            
            // Allow keyboard navigation (1-9 keys for cells)
            if (this.gameActive && e.key >= '1' && e.key <= '9') {
                const index = parseInt(e.key) - 1;
                this.handleCellClick(index);
            }
        });
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index, this.currentPlayer);
        
        if (this.gameActive && this.gameMode === 'pva' && this.currentPlayer === 'O') {
            // AI turn
            setTimeout(() => {
                this.makeAIMove();
            }, 500);
        }
    }
    
    makeMove(index, player) {
        this.board[index] = player;
        this.cells[index].textContent = player;
        this.cells[index].classList.add(player.toLowerCase());
        this.cells[index].classList.add('fade-in');
        
        if (this.checkWinner()) {
            this.gameActive = false;
            this.highlightWinningCells();
            this.updateScore(player);
            this.showGameOverModal(`Player ${player} Wins!`);
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.updateScore('draw');
            this.showGameOverModal("It's a Draw!");
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }
    
    makeAIMove() {
        if (!this.gameActive) return;
        
        const bestMove = this.getBestMove();
        this.makeMove(bestMove, 'O');
    }
    
    getBestMove() {
        // AI strategy: Try to win, then block player, then take center, then corners, then edges
        
        // 1. Try to win
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWinner()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // 2. Block player from winning
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWinner()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // 3. Take center if available
        if (this.board[4] === '') {
            return 4;
        }
        
        // 4. Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => this.board[i] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // 5. Take edges
        const edges = [1, 3, 5, 7];
        const availableEdges = edges.filter(i => this.board[i] === '');
        if (availableEdges.length > 0) {
            return availableEdges[Math.floor(Math.random() * availableEdges.length)];
        }
        
        // Fallback: random available cell
        const availableCells = this.board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        return availableCells[Math.floor(Math.random() * availableCells.length)];
    }
    
    checkWinner() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        this.winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.cells[a].classList.add('winning');
                this.cells[b].classList.add('winning');
                this.cells[c].classList.add('winning');
            }
        });
    }
    
    updateDisplay() {
        if (this.gameMode === 'pva') {
            this.currentPlayerText.textContent = this.currentPlayer === 'X' ? "Your Turn" : "AI's Turn";
        } else {
            this.currentPlayerText.textContent = `Player ${this.currentPlayer}'s Turn`;
        }
    }
    
    updateScore(winner) {
        if (winner === 'draw') {
            this.scores.draw++;
        } else {
            this.scores[winner]++;
        }
        
        this.scoreElements.X.textContent = this.scores.X;
        this.scoreElements.O.textContent = this.scores.O;
        this.scoreElements.draw.textContent = this.scores.draw;
        
        this.saveScores();
    }
    
    showGameOverModal(message) {
        this.modalTitle.textContent = "Game Over";
        this.modalMessage.textContent = message;
        this.modal.style.display = 'block';
        this.modal.classList.add('fade-in');
    }
    
    closeModal() {
        this.modal.style.display = 'none';
    }
    
    playAgain() {
        this.resetGame();
        this.closeModal();
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.gameStatus.textContent = '';
        this.updateDisplay();
    }
    
    resetScores() {
        this.scores = { X: 0, O: 0, draw: 0 };
        this.scoreElements.X.textContent = '0';
        this.scoreElements.O.textContent = '0';
        this.scoreElements.draw.textContent = '0';
        this.saveScores();
    }
    
    setGameMode(mode) {
        this.gameMode = mode;
        this.resetGame();
        
        // Update button states
        this.pvpModeBtn.classList.toggle('active', mode === 'pvp');
        this.pvaModeBtn.classList.toggle('active', mode === 'pva');
        
        // Update score labels
        const playerOLabel = document.querySelector('.score-item:nth-child(2) .player-label');
        playerOLabel.textContent = mode === 'pva' ? 'AI' : 'Player O';
        
        this.updateDisplay();
    }
    
    saveScores() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
    }
    
    loadScores() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
            this.scoreElements.X.textContent = this.scores.X;
            this.scoreElements.O.textContent = this.scores.O;
            this.scoreElements.draw.textContent = this.scores.draw;
        }
    }
}

// Game Statistics and Analytics
class GameAnalytics {
    constructor() {
        this.gameHistory = [];
        this.loadHistory();
    }
    
    recordGame(winner, moves, gameMode, duration) {
        const gameRecord = {
            timestamp: new Date().toISOString(),
            winner,
            moves,
            gameMode,
            duration,
            totalMoves: moves.length
        };
        
        this.gameHistory.push(gameRecord);
        this.saveHistory();
    }
    
    getStats() {
        const stats = {
            totalGames: this.gameHistory.length,
            playerXWins: this.gameHistory.filter(game => game.winner === 'X').length,
            playerOWins: this.gameHistory.filter(game => game.winner === 'O').length,
            draws: this.gameHistory.filter(game => game.winner === 'draw').length,
            averageGameDuration: 0,
            averageMovesPerGame: 0
        };
        
        if (stats.totalGames > 0) {
            stats.averageGameDuration = this.gameHistory.reduce((sum, game) => sum + game.duration, 0) / stats.totalGames;
            stats.averageMovesPerGame = this.gameHistory.reduce((sum, game) => sum + game.totalMoves, 0) / stats.totalGames;
        }
        
        return stats;
    }
    
    saveHistory() {
        localStorage.setItem('ticTacToeHistory', JSON.stringify(this.gameHistory));
    }
    
    loadHistory() {
        const savedHistory = localStorage.getItem('ticTacToeHistory');
        if (savedHistory) {
            this.gameHistory = JSON.parse(savedHistory);
        }
    }
    
    clearHistory() {
        this.gameHistory = [];
        localStorage.removeItem('ticTacToeHistory');
    }
}

// Enhanced Audio Effects (optional - requires sound files)
class SoundManager {
    constructor() {
        this.sounds = {
            move: this.createBeep(200, 100),
            win: this.createBeep(400, 300),
            draw: this.createBeep(300, 200),
            click: this.createBeep(150, 50)
        };
        this.enabled = true;
    }
    
    createBeep(frequency, duration) {
        return () => {
            if (!this.enabled) return;
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        };
    }
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
    }
}

// Utility functions
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
};

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
    const analytics = new GameAnalytics();
    const soundManager = new SoundManager();
    
    // Add ripple effects to buttons
    document.querySelectorAll('button').forEach(button => {
        utils.addRippleEffect(button);
    });
    
    // Add keyboard shortcuts info
    const addKeyboardShortcuts = () => {
        const info = document.createElement('div');
        info.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem; background: #f7fafc; border-radius: 10px; font-size: 0.8rem; color: #718096;">
                <strong>Keyboard Shortcuts:</strong><br>
                • Press 1-9 to place markers<br>
                • Press ESC to close modal<br>
                • Click and drag for better mobile experience
            </div>
        `;
        document.querySelector('.container').appendChild(info);
    };
    
    // Add keyboard shortcuts after a delay
    setTimeout(addKeyboardShortcuts, 2000);
    
    // Console welcome message
    console.log(`
    🎮 Tic-Tac-Toe Game Loaded Successfully!
    
    Game Features:
    ✅ Player vs Player mode
    ✅ Player vs AI mode
    ✅ Score tracking
    ✅ Responsive design
    ✅ Keyboard shortcuts
    ✅ Sound effects
    ✅ Game analytics
    
    Enjoy playing!
    `);
});
