import React, { useState, useEffect } from 'react';
import SignupForm from './SignupForm';
import { tiles } from '../data/tiles';
import { useGetHighscores } from '../hooks/getHighscores';
import WelcomeSection from './WelcomeSection';
import ActiveGameSection from './ActiveGameSection';
import ResultsSection from './ResultsSection';
import SpinnerOverlay from './SpinnerOverlay';
import PresentCodeOverlay from './PresentCodeOverlay';
import usePresents from '../hooks/usePresents';

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
  const [isTheVoidPath, setVoidPath] = useState(null);
  const [scorePostingError, setScorePostingError] = useState('');
  const [character, setCharacter] = useState(null);

  const [scores, loading, error, updateScores] = useGetHighscores();

  const [
    {
      isEnteringPresentCode,
      presentErrorLabel,
      listOfPresents
    },
    enteringPresentCode,
    presentOverlayClosed,
    presentCodeEntered
  ] = usePresents();

  const userInfoSubmitted = ([username, character]) => {
    setGameState(2);
    setCurrentUser(username);
    setCharacter(character);
  };

  // Really need to refactor this.
  const spinTheSpinner = (firstVoidPathRoll = false) => {
    setSpinnedNumber(0);
    setSpinning(true);
    // Random # 1 - 10.
    const spinnedNumber = Math.floor(Math.random() * 10) + 1;
    let nextTile = currentTileNumber + spinnedNumber;

    // Skips to void area if you chose to start there.
    if (firstVoidPathRoll) {
      nextTile += 21;
    }

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

  const startGame = isTheVoid => {
    setVoidPath(isTheVoid);
  };

  useEffect(
    () => {
      if (isTheVoidPath !== null) {
        spinTheSpinner(isTheVoidPath);
        setGameState(3);
      }
    },
    // Figure out why setIsTheVoid path is changing every render.
    // eslint-disable-next-line
    [isTheVoidPath]
  );

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
          onSpin={isTheVoid => startGame(isTheVoid)}
        ></WelcomeSection>
      )}

      {/* Active Game Page */}
      {gameState === 3 && currentTileData && (
        <ActiveGameSection
          currentUser={currentUser}
          currentTileNumber={currentTileNumber}
          currentTileData={currentTileData}
          tiles={tiles}
          listOfPresents={listOfPresents}
          onSpin={() => spinTheSpinner()}
          onGameEnd={() => endTheGame()}
          currentPoints={currentPoints}
          enteringPresentCode={() => enteringPresentCode()}
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
      {isEnteringPresentCode && (
        <PresentCodeOverlay
          submitPresentCode={code => presentCodeEntered(code)}
          closePresentOverlay={() => presentOverlayClosed()}
          presentErrorLabel={presentErrorLabel}
        ></PresentCodeOverlay>
      )}
    </div>
  );
};

export default GamePage;
