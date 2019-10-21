import React, { useEffect } from 'react';
import { useGetHighscores } from '../hooks/getHighscores';

const Highscores = () => {
  const [scores, loading, error, updateScores] = useGetHighscores();
  useEffect(() => {
    updateScores();
    setInterval(async () => {
      updateScores();
    }, 60 * 1000);
  }, []);

  return (
    <div>
      {scores &&
        scores.map(({_id, name, score}) => {
          return <div key={_id}>{name} {score}</div>;
        })}
    </div>
  );
};

export default Highscores;
