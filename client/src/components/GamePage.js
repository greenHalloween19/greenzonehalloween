import React, { useState, Fragment } from 'react';
import SignupForm from './SignupForm';
import OogieBoogie from '../assets/OogieBoogie.png';
import { tiles } from '../data/tiles';
import LinkButton from './LinkButton';
import { useGetHighscores } from '../hooks/getHighscores';

const GamePage = () => {
  // TODO: Refactor gamestate into one object and useReducer to manage it
  const [gameState, setGameState] = useState(1);
  const [currentUser, setCurrentUser] = useState('');
  const [currentTileNumber, setCurrentTileNumber] = useState(0);
  const [currentTileData, setCurrentTileData] = useState(null);
  const [lastSpinnedNumber, setSpinnedNumber] = useState(0);
  const [isSpinning, setSpinning] = useState(false);
  const [isConfirmingSpin, setConfirmingSpin] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [loadingResult, setLoadingResult] = useState(false);
  const [scorePostingError, setScorePostingError] = useState('');
  const [scores, loading, error, updateScores] = useGetHighscores();

  const userInfoSubmitted = username => {
    setGameState(2);
    setCurrentUser(username);
  };

  const spinTheSpinner = () => {
    setSpinnedNumber(0);
    setSpinning(true);
    // Random # 1 - 10.
    const spinnedNumber = Math.floor(Math.random() * 10) + 1;
    const nextTile = currentTileNumber + spinnedNumber;
    if (nextTile < tiles.totalNumberOfTiles) {
      setSpinnedNumber(spinnedNumber);
      setCurrentTileNumber(nextTile);
    } else {
      setSpinnedNumber(tiles.totalNumberOfTiles - currentTileNumber);
      setCurrentTileNumber(tiles.totalNumberOfTiles);
    }
    let area = '';
    if (currentTileNumber <= 50) {
      area = 'example-area-options';
    }
    if (currentTileNumber >= 51) {
      area = 'example-area-options2';
    }
    const tileIndex = Math.floor(Math.random() * tiles[area].length);
    setCurrentTileData(tiles[area][tileIndex]);
    setCurrentPoints(currentPoints + tiles[area][tileIndex].points);
    setTimeout(() => {
      setSpinning(false);
      setConfirmingSpin(true);
    }, 2000);
  };

  const startGame = () => {
    setGameState(3);
    spinTheSpinner();
  };

  const postScore = async () => {
    try {
      const scorePost = await fetch('/scores', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        referrer: 'no-referrer',
        body: JSON.stringify({ name: currentUser, score: currentPoints })
      });
      console.log(scorePost);
      updateScores(1000);
    } catch (e) {
      console.error(e);
      setScorePostingError('There was an error posting your score!');
    }
    setLoadingResult(false);
  };

  const getPosition = () => {
    const currentPosition = scores.findIndex(
      score => score.name === currentUser
    );
    if (currentPosition > -1) {
      return currentPosition + 1;
    } else {
      setScorePostingError('Could not get your score position at this time :(');
    }
  };

  const endTheGame = () => {
    setLoadingResult(true);
    setGameState(4);
    postScore();
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
              Tile: <span className="primary-title">{currentTileNumber}</span>
            </h3>
            <h3>
              Score: <span className="primary-title">{currentPoints}</span>
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
          {currentTileNumber < tiles.totalNumberOfTiles && (
            <input
              onClick={() => spinTheSpinner()}
              type="button"
              className="roll-button button-control"
              value="Spin Again"
            ></input>
          )}
          {currentTileNumber >= tiles.totalNumberOfTiles && (
            <input
              onClick={() => endTheGame()}
              type="button"
              className="roll-button button-control"
              value="End Game"
            ></input>
          )}
        </section>
      )}
      {gameState === 4 && (
        <section className="game__section game__section--playing">
          <h1 className="primary-title">Game Complete!</h1>
          {(loadingResult || loading) && <h2>Loading...</h2>}
          {(!loadingResult || !loading) && scores && scores.length > 0 && (
            <Fragment>
              <div>
                <p>
                  Score: <span className="primary-title">{currentPoints}</span>
                </p>
                {!scorePostingError && (
                  <p>
                    Position #{' '}
                    <span className="primary-title">{getPosition()}</span>
                  </p>
                )}
                {(error || scorePostingError) && (
                  <p>{error || scorePostingError}</p>
                )}
              </div>
              <div>
                <LinkButton label="Home Screen" navUrl="/"></LinkButton>
                <LinkButton
                 className="button-gap-top"
                  label="High Scores"
                  navUrl="/highscores"
                ></LinkButton>
              </div>
            </Fragment>
          )}
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
          <h2>Go to tile: {currentTileNumber}</h2>
          <div>
            <input
              onClick={() => setConfirmingSpin(false)}
              type="button"
              className="roll-button button-control"
              value="Done"
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
