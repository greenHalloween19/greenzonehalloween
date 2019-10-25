import React, { Fragment } from 'react';

const SpinnerOverlay = ({ isSpinning, isConfirmingSpin, onSpinConfirmed, lastSpinnedNumber, currentTileNumber, character }) => (
  <section className="rolling-overlay">
    {isSpinning && (
      <Fragment>
        <div>
          <img
            className="rolling-overlay__img"
            src={character.img}
            alt={character.name}
          ></img>
        </div>
        <h2>Spinning...</h2>
      </Fragment>
    )}
    {isConfirmingSpin && (
      <Fragment>
        <h2>You've spun the number:</h2>
        <div className="tile-number">
          <span className="primary-title">{lastSpinnedNumber}</span>
        </div>
        <h2>Go to tile:</h2>
        <div className="tile-number">
          <span className="primary-title">{currentTileNumber}</span>
        </div>
        <div>
          <input
            onClick={() => onSpinConfirmed()}
            type="button"
            className="roll-button button-control"
            value="Done"
          ></input>
        </div>
      </Fragment>
    )}
  </section>
);

export default SpinnerOverlay;
