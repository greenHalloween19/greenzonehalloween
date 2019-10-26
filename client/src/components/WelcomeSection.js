import React, { useState } from 'react';
import Jack from '../assets/Jack.svg';
import Sally from '../assets/Sally.svg';

const WelcomeSection = ({ currentUser, onSpin }) => {
  const [isVoidSelected, setIsVoidSelected] = useState('true');

  const onSubmit = e => {
    e.preventDefault();
    onSpin(isVoidSelected === 'true');
  };
  return (
    // TODO: Replace Jack with Grave Stone / Sally with Void Symbol.
    <section className="game__form">
      <h1 className="game__header">{currentUser}</h1>
      <h2>Welcome!</h2>
      <form onSubmit={e => onSubmit(e)}>
        <p>Please choose your path below:</p>
        <label className="signup-label--small game__header">
          {isVoidSelected === 'true' ? 'The Void' : 'The Graveyard'}
        </label>
        <div className="path-choices">
          <label>
            <input
              type="radio"
              name="path"
              value={true}
              checked={isVoidSelected === 'true'}
              onChange={e => setIsVoidSelected(e.target.value)}
            />
            <div
              className={
                'path-tile' +
                (isVoidSelected === 'true' ? ' path-tile--selected' : '')
              }
            >
              <img className="path-tile__img" src={Sally} alt="The Void"></img>
            </div>
          </label>
          <label>
            <input
              type="radio"
              name="path"
              value={false}
              checked={isVoidSelected === 'false'}
              onChange={e => setIsVoidSelected(e.target.value)}
            />
            <div
              className={
                'path-tile' +
                (isVoidSelected === 'false' ? ' path-tile--selected' : '')
              }
            >
              <img
                className="path-tile__img"
                src={Jack}
                alt="Grave Stone"
              ></img>
            </div>
          </label>
        </div>
        <div>
          <input
            className="button-control form__space--top form__space--bottom"
            type="submit"
            value="Submit"
          ></input>
        </div>
      </form>
    </section>
  );
};
export default WelcomeSection;
