import { useState } from 'react';

export const useGetHighscores = () => {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateScores = async () => {
    setError(null);
    setLoading(true);
    try {
      const scoresResponse = await fetch('/scores');
      const scoresData = await scoresResponse.json();
      if (scoresData) {
        setScores(scoresData);
      }
    } catch (e) {
      console.error(e);
      setError(e && e.message);
    }
  };

  return [scores, loading, error, updateScores];
};
