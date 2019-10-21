import React, { useEffect } from 'react';
import { useGetHighscores } from '../hooks/getHighscores';

const Highscores = () => {
  const [scores, loading, error, updateScores] = useGetHighscores();

  useEffect(() => {
    console.log('wat');
    updateScores();
    const updateInterval = setInterval(async () => {
      updateScores();

      return () => {
        clearInterval(updateInterval);
      };
    }, 60 * 1000);
    // TODO: Figure out how to fix this issue, dependency array is saying updateScores is triggering update when I include it?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="highscores">
      <h1 className="highscores__title">High Scores</h1>
      <div className="highscores__content">
        {loading && scores.length === 0 && <div>Loading...</div>}

        {// High Scores List.
        !error && scores.length > 0 && (
          <div className="highscores__list">
            {scores.map(({ _id, name, score }, i) => {
              return (
                <div key={_id} className="highscores__row">
                  <div>{`${i + 1}:`} {name}</div>
                  <div className="highscores__divider"></div>
                  <div>{score}</div>
                </div>
              );
            })}
          </div>
        )}

        {// Error Message.
        error && <div>{error}</div>}
      </div>
    </section>
  );
};

export default Highscores;
