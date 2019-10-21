import React from 'react';
import LinkButton from './LinkButton';
const Home = () => {
  return (
    <section className="home">
      <h1 className="home__title">Green Zone Halloween</h1>
      <nav className="button-list">
        <LinkButton label="Play" navUrl="play"></LinkButton>
        <LinkButton label="HighScores" navUrl="highscores"></LinkButton>
      </nav>
    </section>
  );
};

export default Home;
