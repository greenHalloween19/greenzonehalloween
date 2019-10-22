import React, { useState } from 'react';
import SignupForm from './SignupForm';
import OogieBoogie from '../assets/OogieBoogie.png';

const GamePage = () => {
  const [gameState, setGameState] = useState(1);
  const [currentUser, setCurrentUser] = useState('');
  const [currentTileNumber, setCurrentTileNumber] = useState(0);
  const [isRolling, setRolling] = useState(false);

  const userInfoSubmitted = username => {
    setGameState(2);
    setCurrentUser(username);
  };

  const rollTheDice = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 2000);
  };

  const startGame = () => {
    setGameState(3);
    rollTheDice();
  };

  return (
    <div className="game">
      {gameState === 1 && (
        <section className=" game__form game__section">
          <h1 className="game__header">What's Your Name?</h1>
          <SignupForm
            onFormSubmitted={username => userInfoSubmitted(username)}
          ></SignupForm>
        </section>
      )}
      {gameState === 2 && (
        <section className="game__section">
          <h1 className="game__header">{currentUser}</h1>
          <h2>Welcome to the game!</h2>
          <p>Please roll the dice below when you are ready to continue!</p>
          <button
            onClick={() => startGame()}
            type="button"
            class="roll-button button-control"
          >
            Roll The Dice!{' '}
            <span class="button-emoji" role="img" aria-label="roll the dice">
              🎲
            </span>
          </button>
        </section>
      )}
      {gameState === 3 && (
        <section className="game__section">
          <h1>You are on tile number: {currentTileNumber}</h1>
        </section>
      )}
      {isRolling && (
        <div className="rolling-overlay">
          <div>
            <img
              className="rolling-overlay__img"
              src={OogieBoogie}
              alt="Oogie Boogie"
            ></img>
          </div>
          <h1>Rolling...</h1>
        </div>
      )}
    </div>
  );
};

export default GamePage;
