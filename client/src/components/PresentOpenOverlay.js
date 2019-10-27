import React, { useState } from 'react';

const PresentOpenOverlay = ({ listOfPresents, finishedOpeningPresents }) => {
  const [currentPresentScore, setCurrentPresentScore] = useState(0);
  const [currentListOfPresents, setCurrentListOfPresents] = useState(
    listOfPresents
  );
  const [presentsError, setPresentsError] = useState('');

  const openPresent = presentIndex => {
    setCurrentPresentScore(
      currentPresentScore + currentListOfPresents[presentIndex].value
    );
    setCurrentListOfPresents(
      currentListOfPresents.map((present, i) => {
        if (i === presentIndex) {
          return {
            ...present,
            opened: true
          };
        }
        return present;
      })
    );
  };

  const finishedOpening = () => {
    if (currentListOfPresents.find(present => !present.opened)) {
      setPresentsError('Open all of your presents first!');
    } else {
      finishedOpeningPresents(currentPresentScore);
    }
  };
  return (
    <section className="present-overlay game__overlay">
      <h1>Open Presents:</h1>
      <h2 className="game__header">{currentPresentScore}</h2>
      <div className="presents-list">
        {currentListOfPresents.map((present, i) => {
          if (present.opened) {
            return (
              <div className="present-tile present--opened">
                <p
                  className={
                    'alignment-label' +
                    (present.value > 0
                      ? 'alignment-label--good'
                      : 'alignment-label--bad')
                  }
                >
                  {present.value > 0 ? 'Good:' : 'Evil:'}
                </p>
                <p>{present.value}</p>
              </div>
            );
          }
          return (
            <div className="present-tile present--closed">
              <button
                className="present-tile__btn"
                key={i}
                onClick={() => openPresent(i)}
              >
                <span role="img" aria-label="present">
                  🎁
                </span>
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {presentsError && (
          <div className="form__space--bottom">
            <label className="error-label">{presentsError}</label>
          </div>
        )}
        <input
          className="button-control form__space--top form__space--bottom"
          type="button"
          value="Close"
          onClick={() => finishedOpening()}
        ></input>
      </div>
    </section>
  );
};
export default PresentOpenOverlay;
