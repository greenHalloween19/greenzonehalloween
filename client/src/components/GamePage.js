import React, { useState } from 'react';
import SignupForm from './SignupForm';

const GamePage = () => {
  const [gameState, setGameState] = useState(1);
  const [currentUser, setCurrentUser] = useState('');

  const userInfoSubmitted = username => {
    {
      setGameState(2);
      setCurrentUser(username);
    }
  };

  return (
    <div className="game">
      {gameState === 1 && (
        <div className="game-form">
          <SignupForm
            onFormSubmitted={username => userInfoSubmitted(username)}
          ></SignupForm>
        </div>
      )}
      {gameState === 2 && <h1>{currentUser}</h1>}
    </div>
  );
};

export default GamePage;
