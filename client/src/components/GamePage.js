import React, { useState } from 'react';
import SignupForm from './SignupForm';
import { tiles } from '../data/tiles';
import { useGetHighscores } from '../hooks/getHighscores';
import WelcomeSection from './WelcomeSection';
import ActiveGameSection from './ActiveGameSection';
import ResultsSection from './ResultsSection';
import SpinnerOverlay from './SpinnerOverlay';

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
  const [character, setCharacter] = useState(null);
  const [scores, loading, error, updateScores] = useGetHighscores();

  const userInfoSubmitted = ([username, character]) => {
    setGameState(2);
    setCurrentUser(username);
    setCharacter(character);
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
      {/* Sign Up */}
      {gameState === 1 && (
        <SignupForm
          onFormSubmitted={formInfo => userInfoSubmitted(formInfo)}
        ></SignupForm>
      )}

      {/* Welcome Page After Sign Up (Path Choice) */}
      {gameState === 2 && (
        <WelcomeSection
          currentUser={currentUser}
          onSpin={() => startGame()}
        ></WelcomeSection>
      )}

      {/* Active Game Page */}
      {gameState === 3 && currentTileData && (
        <ActiveGameSection
          currentUser={currentUser}
          currentTileNumber={currentTileNumber}
          currentTileData={currentTileData}
          tiles={tiles}
          onSpin={() => spinTheSpinner()}
          onGameEnd={() => endTheGame()}
          currentPoints={currentPoints}
        ></ActiveGameSection>
      )}
      {gameState === 4 && (
        <ResultsSection
          loadingResult={loadingResult}
          loadingScores={loading}
          scores={scores}
          scorePostingError={scorePostingError}
          scoreRetrievalError={error}
          currentPosition={() => getPosition()}
          currentPoints={currentPoints}
          character={character}
          currentUser={currentUser}
        ></ResultsSection>
      )}
      {(isSpinning || isConfirmingSpin) && (
        <SpinnerOverlay
          lastSpinnedNumber={lastSpinnedNumber}
          onSpinConfirmed={() => setConfirmingSpin(false)}
          isSpinning={isSpinning}
          isConfirmingSpin={isConfirmingSpin}
          currentTileNumber={currentTileNumber}
          character={character}
        ></SpinnerOverlay>
      )}
    </div>
  );
};

export default GamePage;
