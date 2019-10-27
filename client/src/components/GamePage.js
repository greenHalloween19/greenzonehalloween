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
import PresentOpenOverlay from './PresentOpenOverlay';

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
  const [currentArea, setCurrentArea] = useState('');
  const [possibleTilesList, setPossibleTilesList] = useState(tiles);
  const [character, setCharacter] = useState(null);

  const [scores, loading, error, updateScores] = useGetHighscores();

  const [
    {
      isEnteringPresentCode,
      presentErrorLabel,
      listOfPresents,
      isOpeningPresents
    },
    enteringPresentCode,
    presentOverlayClosed,
    presentCodeEntered,
    openingPresents,
    finishedOpeningPresents
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

    if (nextTile < possibleTilesList.totalNumberOfTiles) {
      setSpinnedNumber(spinnedNumber);
      setCurrentTileNumber(nextTile);
    } else {
      setSpinnedNumber(possibleTilesList.totalNumberOfTiles - currentTileNumber);
      setCurrentTileNumber(possibleTilesList.totalNumberOfTiles);
    }
    let area = '';
    if (nextTile <= 16) {
      area = 'Graveyard';
    } else if ((nextTile >= 17) & (nextTile <= 20)) {
      area = 'Ring of Holiday Trees';
    } else if ((nextTile >= 21) & (nextTile <= 30)) {
      area = 'Vortex to Christmas Land';
    } else if ((nextTile >= 31) & (nextTile <= 39)) {
      area = 'Christmas Town';
    } else if ((nextTile >= 40) & (nextTile <= 50)) {
      area = 'Christmas Preparation Zone';
    } else if ((nextTile >= 51) & (nextTile <= 66)) {
      area = 'Halloween Town';
    } else if ((nextTile >= 67) & (nextTile <= 72)) {
      area = "Jack's House";
      // Add Sally's lab here! (73-88)
    } else if ((nextTile >= 73) & (nextTile <= 95)) {
      area = "Finkelstein's Castle";
    } else if ((nextTile >= 89) & (nextTile <= 95)) {
      area = "Oogie Boogie's Lair";
    } else if ((nextTile >= 96) & (nextTile <= 100)) {
      area = 'Halloween Town';
    } else if ((nextTile >= 101) & (nextTile <= 111)) {
      area = 'Creepy Christmas Village';
    } else if (nextTile >= 112) {
      area = 'End Space';
    }

    const tileIndex = Math.floor(Math.random() * possibleTilesList[area].length);
    let newTileArrForArea = possibleTilesList[area].filter((_tile, i) => {
      return i !== tileIndex
    });

    if (newTileArrForArea.length === 0) {
      newTileArrForArea = tiles[area];
    }
  
    const newTileListData = {...possibleTilesList, [area]: newTileArrForArea};
    setCurrentTileData(possibleTilesList[area][tileIndex]);
    setPossibleTilesList(newTileListData);
    setCurrentPoints(currentPoints + possibleTilesList[area][tileIndex].points);
    setCurrentArea(area);
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

  const finishedPresents = score => {
    setCurrentPoints(currentPoints + score);
    finishedOpeningPresents();
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
          tiles={possibleTilesList}
          listOfPresents={listOfPresents}
          onSpin={() => spinTheSpinner()}
          onGameEnd={() => endTheGame()}
          openPresents={() => openingPresents()}
          currentPoints={currentPoints}
          enteringPresentCode={() => enteringPresentCode()}
          currentAreaName={currentArea}
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
      {isOpeningPresents && (
        <PresentOpenOverlay
          listOfPresents={listOfPresents}
          finishedOpeningPresents={score => finishedPresents(score)}
        ></PresentOpenOverlay>
      )}
    </div>
  );
};

export default GamePage;
