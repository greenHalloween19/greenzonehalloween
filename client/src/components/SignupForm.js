import React, { useState } from 'react';
import { CHARACTER_LIST } from '../data/characters';
import { Link } from '@reach/router';

const SignupForm = ({ onFormSubmitted }) => {
  const [userName, setUsername] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTER_LIST[0]);

  const onSubmit = e => {
    e.preventDefault();
    setSubmissionError('');
    if (userName.length < 10 && userName.length > 1) {
      onFormSubmitted([userName, selectedCharacter]);
      return;
    }
    setSubmissionError(
      'A Username between the length of 1 - 9 characters is required.'
    );
  };
  return (
    <section className="game__form">
      <Link className=" game__back" to="/">
        <span role="img" aria-label="home">
          🏠
        </span>
      </Link>

      <h1 className="game__header">Sign up</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className="input__container">
          <label className="signup-label" htmlFor="username">
            What's Your Name?
          </label>
          <input
            id="username"
            className="text-input"
            type="text"
            onChange={e => setUsername(e.target.value)}
            value={userName}
            aria-labelledby="Enter Username"
            placeholder="Enter a username"
          ></input>
          {submissionError && (
            <div className="form__space--top">
              <label className="error-label">{submissionError}</label>
            </div>
          )}
        </div>

        <div className="input__container">
          <label className="signup-label">Select a character:</label>
          <label className="signup-label--small game__header">
            {selectedCharacter.name}
          </label>
          <div className="characters">
            {CHARACTER_LIST.map(({ id, name, img }) => (
              <label className="character__container" key={id}>
                <input
                  type="radio"
                  name="character_name"
                  value={id}
                  checked={selectedCharacter.id === id}
                  onChange={e =>
                    setSelectedCharacter(CHARACTER_LIST[e.target.value - 1])
                  }
                />
                <div
                  className={
                    'character-tile' +
                    (selectedCharacter.id === id
                      ? ' character-tile--selected'
                      : '')
                  }
                >
                  <img
                    className="character-tile__img"
                    src={img}
                    alt={name}
                  ></img>
                </div>
              </label>
            ))}
          </div>
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

export default SignupForm;
