import React, { Fragment } from 'react';

const WelcomePage = ({ currentUser, onSpin }) => (
  <Fragment>
    <h1 className="game__header">{currentUser}</h1>
    <h2>Welcome to the game!</h2>
    <p>Please spin using the button below when you are ready to continue!</p>
    <input
      onClick={() => onSpin()}
      type="button"
      className="roll-button button-control"
      value="Spin!"
    ></input>
  </Fragment>
);
export default WelcomePage;
