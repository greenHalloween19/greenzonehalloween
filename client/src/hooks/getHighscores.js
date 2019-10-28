import { useState } from 'react';

export const useGetHighscores = () => {
  const [scores, setScores] = useState([]);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [positionError, setPositionError] = useState('');

  const getPosition = (scoresData, id) => {
    setPositionError('');
    const currentPosition = scoresData.findIndex(score => score._id === id);
    if (currentPosition > -1) {
      return currentPosition + 1;
    } else {
      setPositionError('Could not get your score position at this time :(');
    }
  };

  const updateScores = async (highScoresToGrab = 10, id = null) => {
    setError('');
    setLoading(true);
    try {
      const scoresResponse = await fetch('/scores');
      const scoresData = await scoresResponse.json();
      if (scoresData) {
        if (id) {
          setScores(scoresData.find(score => score._id === id));
          console.log(scoresData.find(score => score._id === id));
          setPosition(getPosition(scoresData, id));
        } else {
          setScores(scoresData.slice(0, highScoresToGrab));
        }
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError('There was an error loading the scores.');
      setLoading(false);
    }
  };

  return [scores, position, loading, error, positionError, updateScores];
};
