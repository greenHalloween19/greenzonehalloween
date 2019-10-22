import React, { useState } from 'react';
import SignupForm from './SignupForm';

const GamePage = () => {
  const [gameState, setGameState] = useState(1);
  const [currentUser, setCurrentUser] = useState('');

  const userInfoSubmitted = username => {
    setGameState(2);
    setCurrentUser(username);
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
      {gameState === 2 && 
      <section className="game__section">
        <h1 className="game__header">{currentUser}</h1>
        <h2>Welcome to the game!</h2>
        <p>Please roll the dice below when you are ready to continue!</p>
      </section>}
    </div>
  );
};

export default GamePage;
