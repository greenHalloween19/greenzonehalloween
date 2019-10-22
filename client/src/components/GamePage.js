import React, { useState } from 'react';

const GamePage = () => {
  const [gameState, setGameState] = useState(1);
  const [userName, setUsername] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    setSubmissionError('');
    if (userName.length < 10 && userName.length > 1) {
      setGameState(2);
      return;
    }
    setSubmissionError('A Username between the length of 1 - 9 characters is required.');
  };

  return (
    <div className="game">
      {gameState === 1 && (
        <div className="game-form">
          <form onSubmit={e => onSubmit(e)}>
            <input
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={userName}
              aria-label="Enter Username"
              placeholder="Enter a username"
            ></input>
            <input type="submit" value="Submit"></input>
            {submissionError && <label className="error-label">{submissionError}</label>}
          </form>
        </div>
      )}
    </div>
  );
};

export default GamePage;
