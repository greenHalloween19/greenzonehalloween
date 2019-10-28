import React, { Fragment, useEffect } from 'react';
import LinkButton from './LinkButton';
import { useGetHighscores } from '../hooks/getHighscores';
import { CHARACTER_LIST } from '../data/characters';

const ResultsSection = ({ id }) => {
  // TODO: kinda weird to  have scores be multi or singular, maybe refactor to a different param later?
  const [
    scores,
    position,
    loading,
    error,
    positionError,
    updateScore
  ] = useGetHighscores();

  useEffect(() => {
    updateScore(1000, id);
    // eslint-disable-next-line
  }, [id]);

  const imageTile = () => {
    const character = CHARACTER_LIST.find(
      character => character.id === scores.characterId
    );
    return (
      <img
        className="results__character"
        src={character.img}
        alt={character.name}
      ></img>
    );
  };

  return (
    <div className="game">
      <section className="game__section game__section--playing">
        {loading && <h2>Loading...</h2>}
        {!loading && scores && scores.length > 1 && (
          <p>An Error Occured when fetching by ID.</p>
        )}
        {!loading && !scores && (
          <p>An Error Occured when fetching by ID.</p>
        )}
        {!loading && scores && scores.length !== 0 && (
          <Fragment>
            <h1 className="primary-title">Game Complete!</h1>
            <div>
              <div>
                {scores && imageTile()}
                {scores && <p className="primary-title">{scores.name}</p>}
              </div>
              <p>
                Score:{' '}
                <span className="primary-title">{scores && scores.score}</span>
              </p>
              {(!error || positionError) && (
                <p>
                  Position # <span className="primary-title">{position}</span>
                </p>
              )}
              {error && <p>{error || positionError}</p>}
            </div>
            <div>
              <LinkButton label="Home Screen" navUrl="/"></LinkButton>
              <div className="button-gap-top">
                <LinkButton
                  label="High Scores"
                  navUrl="/highscores"
                ></LinkButton>
              </div>
            </div>
          </Fragment>
        )}
      </section>
    </div>
  );
};

export default ResultsSection;
