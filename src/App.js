import React, { useState } from 'react';

import './App.css';

const words = ['react', 'javascript', 'hangman', 'coding'];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Hangman = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(6);

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setAttemptsLeft(attemptsLeft - 1);
      }
    }
  };

  const isGameWon = word.split('').every(letter => guessedLetters.includes(letter));
  const isGameLost = attemptsLeft <= 0;

  return (
      <div>
        <h1>Hangman</h1>
        <WordDisplay word={word} guessedLetters={guessedLetters} />
        <Keyboard onGuess={handleGuess} guessedLetters={guessedLetters} />
        <GameStatus isGameWon={isGameWon} isGameLost={isGameLost} attemptsLeft={attemptsLeft} />
        {isGameWon && <button onClick={() => resetGame()}>Play Again</button>}
        {isGameLost && <button onClick={() => resetGame()}>Play Again</button>}
      </div>
  );

  function resetGame() {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setAttemptsLeft(6);
  }
};

const WordDisplay = ({ word, guessedLetters }) => (
    <div>
      {word.split('').map((letter, index) => (
          <span key={index}>
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
      ))}
    </div>
);

const Keyboard = ({ onGuess, guessedLetters }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return (
      <div>
        {alphabet.map((letter) => (
            <button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={guessedLetters.includes(letter)}
            >
              {letter}
            </button>
        ))}
      </div>
  );
};

const GameStatus = ({ isGameWon, isGameLost, attemptsLeft }) => (
    <div>
      {isGameWon && <p>Congratulations! You won!</p>}
      {isGameLost && <p>Game Over! You lost!</p>}
      <p>Attempts Left: {attemptsLeft}</p>
    </div>
);

export default Hangman;