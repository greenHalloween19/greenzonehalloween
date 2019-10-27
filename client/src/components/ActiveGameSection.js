import React from 'react';

const ActiveGameSection = ({
  currentUser,
  currentTileNumber,
  currentPoints,
  currentTileData,
  tiles,
  onSpin,
  onGameEnd,
  listOfPresents,
  enteringPresentCode,
  openPresents
}) => {
  const { desc, points, name } = currentTileData;
  return (
    <section className="game__section game__section--playing">
      <div>
        <h1 className="primary-title">{currentUser}</h1>
        <h3>
          Tile: <span className="primary-title">{currentTileNumber}</span>
        </h3>
        <h3>
          Score: <span className="primary-title">{currentPoints}</span>
        </h3>
        <h3>
          Presents: <span className="primary-title">{listOfPresents.length}</span>
        </h3>
      </div>
      <button
        className="present-button button-control button-control--alt"
        onClick={() => enteringPresentCode()}
      >
        <span role="img" aria-label="present">🎁
        </span>
      </button>
      <section className="game__outcome">
        <h3 className="primary-title">{name}</h3>
        <p>{desc}</p>
        <div className={points > 0 ? 'gain' : 'lose'}>
          <p>You {points > 0 ? 'gained' : 'lost'}:</p>
          <p> {points} pts!</p>
        </div>
      </section>
      {currentTileNumber < tiles.totalNumberOfTiles && (
        <input
          onClick={() => onSpin()}
          type="button"
          className="roll-button button-control"
          value="Spin Again"
        ></input>
      )}
      {currentTileNumber >= tiles.totalNumberOfTiles && listOfPresents.length <= 0 && (
        <input
          onClick={() => onGameEnd()}
          type="button"
          className="roll-button button-control"
          value="End Game"
        ></input>
      )}
      {currentTileNumber >= tiles.totalNumberOfTiles && listOfPresents.length > 0 && (
        <input
          onClick={() => openPresents()}
          type="button"
          className="roll-button button-control"
          value="Open Presents"
        ></input>
      )}
    </section>
  );
};

export default ActiveGameSection;
