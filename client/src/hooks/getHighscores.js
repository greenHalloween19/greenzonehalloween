import { useState } from 'react';

export const useGetHighscores = () => {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateScores = async () => {
    setError('');
    setLoading(true);
    try {
      const scoresResponse = await fetch('/scores');
      const scoresData = await scoresResponse.json();
      if (scoresData) {
        setScores(scoresData);
      }
    } catch (e) {
      console.error(e);
      setError('There was an error loading the scores.');
    }
  };

  return [scores, loading, error, updateScores];
};
