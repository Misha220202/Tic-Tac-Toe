# Tic-Tac-Toe

## Overview

This is a simple Tic Tac Toe game implemented in JavaScript, featuring a player vs. bot mode. Players can set their name and profile image, choose their symbol (X or O), and play against an AI bot. The game detects wins, ties, and allows for refreshing the game board.

## Features

- **Player Profile**: Players can input their name and upload a profile image.
- **Choice Selection**: Players can choose their symbol (X or O) before starting the game.
- **Bot Opponent**: Players can compete against a bot that randomly selects its moves.
- **Victory Detection**: The game detects when a player wins or if the game ends in a tie.
- **Game Reset**: Players can refresh the game board to start a new game.

## Code Breakdown

### 1. **Self-Executing Function**
The entire application is wrapped in an Immediately Invoked Function Expression (IIFE) to encapsulate variables and prevent global scope pollution.

### 2. **Player Creation**
- **createPlayer Function**: 
    - Handles player name input and profile image upload.
    - Shows a dialog for user inputs and clears it upon submission or cancellation.
    - Validates the player's name input.
 
### 3. Chess Player Factory Function
- **cchessPlayer(name, choice):
    - Creates player and bot objects with properties for name, choice, and their board states.
 
### 4. Game Controller Module
- **Game Logic: Contains all game-related functionality, including:
    - Initialization of the game board.
    - Toggle between player and bot moves.
    - Victory condition checks.
    - Bot movement logic.
 
### 5. Event Listeners
- **Event Handling:
    - Listens for button clicks to handle player moves, refresh actions, and symbol selections.
 
### 6. Victory Conditions
- **checkForWinner(chess):
    - Checks if a player has met any victory conditions and updates the game status accordingly.
