import React, {Fragment} from 'react';

const ActiveGamePage = ({
  currentUser,
  currentTileNumber,
  currentPoints,
  currentTileData,
  tiles,
  onSpin,
  onGameEnd
}) => (
  <Fragment>
    <div>
      <h1 className="primary-title">{currentUser}</h1>
      <h3>
        Tile: <span className="primary-title">{currentTileNumber}</span>
      </h3>
      <h3>
        Score: <span className="primary-title">{currentPoints}</span>
      </h3>
    </div>
    <section className="game__outcome">
      <h3 className="primary-title">{currentTileData.name}</h3>
      <p>{currentTileData.desc}</p>
      <div className={currentTileData.points > 0 ? 'gain' : 'lose'}>
        <p>You {currentTileData.points > 0 ? 'gained' : 'lost'}:</p>
        <p> {currentTileData.points} pts!</p>
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
    {currentTileNumber >= tiles.totalNumberOfTiles && (
      <input
        onClick={() => onGameEnd()}
        type="button"
        className="roll-button button-control"
        value="End Game"
      ></input>
    )}
  </Fragment>
);

export default ActiveGamePage;
