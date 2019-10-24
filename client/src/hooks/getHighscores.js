import { useState } from 'react';

export const useGetHighscores = () => {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateScores = async (highScoresToGrab = 10) => {
    setError('');
    setLoading(true);
    try {
      const scoresResponse = await fetch('/scores');
      const scoresData = await scoresResponse.json();
      if (scoresData) {
        setScores(scoresData.slice(0, highScoresToGrab));
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError('There was an error loading the scores.');
      setLoading(false);
    }
  };

  return [scores, loading, error, updateScores];
};
