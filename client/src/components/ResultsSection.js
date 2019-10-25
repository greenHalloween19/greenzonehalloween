import React, { Fragment } from 'react';
import LinkButton from './LinkButton';

const ResultsSection = ({
  loadingResult,
  loadingScores,
  scores,
  scorePostingError,
  scoreRetrievalError,
  currentPoints,
  currentPosition,
  character,
  currentUser
}) => (
  <section className="game__section game__section--playing">
    {(loadingResult || loadingScores) && <h2>Loading...</h2>}
    {(!loadingResult || !loadingScores) && scores && scores.length > 0 && (
      <Fragment>
        <h1 className="primary-title">Game Complete!</h1>
        <div>
          <div>
          <img
            className="results__character"
            src={character.img}
            alt={character.name}
          ></img>
          <p className="primary-title">{currentUser}</p>
          </div>
          <p>
            Score: <span className="primary-title">{currentPoints}</span>
          </p>
          {!scorePostingError && (
            <p>
              Position #{' '}
              <span className="primary-title">{currentPosition()}</span>
            </p>
          )}
          {(scoreRetrievalError || scorePostingError) && (
            <p>{scoreRetrievalError || scorePostingError}</p>
          )}
        </div>
        <div>
          <LinkButton label="Home Screen" navUrl="/"></LinkButton>
          <div className="button-gap-top">
            <LinkButton label="High Scores" navUrl="/highscores"></LinkButton>
          </div>
        </div>
      </Fragment>
    )}
  </section>
);

export default ResultsSection;
