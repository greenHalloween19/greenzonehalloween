import React from 'react';

const WelcomeSection = ({ currentUser, onSpin }) => (
  <section className="game__section">
    <h1 className="game__header">{currentUser}</h1>
    <h2>Welcome to the game!</h2>
    <p>Please spin using the button below when you are ready to continue!</p>
    <div className="path-choices">
      <label htmlFor="TheVoid">
        <input
          id="TheVoid"
          onClick={() => onSpin(true)}
          type="button"
          className="roll-button button-control"
          value="Spin!"
        ></input>
        The Void
      </label>
      <label htmlFor="graveyard">
        <input
          id="graveyard"
          onClick={() => onSpin(false)}
          type="button"
          className="roll-button button-control"
          value="Spin!"
        ></input>
        Graveyard
      </label>
    </div>
  </section>
);
export default WelcomeSection;
