import React, { useState } from 'react';
import SignupForm from './SignupForm';
import OogieBoogie from '../assets/OogieBoogie.png';
import { tiles } from '../data/tiles';

const GamePage = () => {
  // TODO: Refactor gamestate into one object and useReducer to manage it
  const [gameState, setGameState] = useState(1);
  const [currentUser, setCurrentUser] = useState('');
  const [currentTileNumber, setCurrentTileNumber] = useState(0);
  const [currentTileData, setCurrentTileData] = useState(null);
  const [lastSpinnedNumber, setSpinnedNumber] = useState(0);
  const [isSpinning, setSpinning] = useState(false);
  const [isConfirmingSpin, setConfirmingSpin] = useState(false);
  const [ currentPoints, setCurrentPoints ] = useState(0);

  const userInfoSubmitted = username => {
    setGameState(2);
    setCurrentUser(username);
  };

  const spinTheSpinner = () => {
    setSpinnedNumber(0);
    setSpinning(true);
    // Random # 1 - 10.
    const spinnedNumber = Math.floor(Math.random() * 10) + 1;
    const tileIndex = Math.floor(
      Math.random() * (tiles['example-area-options'].length - 1)
    );
    setTimeout(() => {
      setSpinnedNumber(spinnedNumber);
      setCurrentTileData(tiles['example-area-options'][tileIndex]);
      setCurrentTileNumber(currentTileNumber + spinnedNumber);
      setCurrentPoints(currentPoints + (tiles['example-area-options'][tileIndex].points));
      setSpinning(false);
      setConfirmingSpin(true);
    }, 2000);
  };

  const startGame = () => {
    setGameState(3);
    spinTheSpinner();
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
          <p>
            Please spin using the button below when you are ready to continue!
          </p>
          <input
            onClick={() => startGame()}
            type="button"
            className="roll-button button-control"
            value="Spin!"
          ></input>
        </section>
      )}
      {gameState === 3 && currentTileData && (
        <section className="game__section game__section--playing">
          <div>
            <h1 className="primary-title">{currentUser}</h1>
            <h3>
              Go to tile:{' '}
              <span className="primary-title">{currentTileNumber}</span>
            </h3>
            <h3>
              Current Score: <span className="primary-title">{currentPoints}</span>
            </h3>
          </div>
          <section className="game__outcome">
            <h3 className="primary-title">{currentTileData.name}</h3>
            <p>{currentTileData.desc}</p>
            <div className={currentTileData.points > 0 ? 'gain' : 'lose'}>
              <p>You {currentTileData.points > 0 ? 'gained' : 'lost'}:</p>
              <p> {currentTileData.points} pts!</p>
            </div>
          </section>
          <input
            onClick={() => spinTheSpinner()}
            type="button"
            className="roll-button button-control"
            value="Spin Again"
          ></input>
        </section>
      )}
      {isSpinning && (
        <div className="rolling-overlay">
          <div>
            <img
              className="rolling-overlay__img"
              src={OogieBoogie}
              alt="Oogie Boogie"
            ></img>
          </div>
          <h1>Spinning...</h1>
        </div>
      )}

      {isConfirmingSpin && (
        <div className="rolling-overlay">
          <h1 className="primary-title">You've spun the number:</h1>
          <h1>{lastSpinnedNumber}</h1>
          <div>
            <input
              onClick={() => setConfirmingSpin(false)}
              type="button"
              className="roll-button button-control"
              value="Confirm"
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
