import React, { useState } from 'react';
import { CHARACTER_LIST } from '../data/characters';

const SignupForm = ({ onFormSubmitted }) => {
  const [userName, setUsername] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('JACK');

  const onSubmit = e => {
    e.preventDefault();
    setSubmissionError('');
    if (userName.length < 10 && userName.length > 1) {
      onFormSubmitted(userName);
      return;
    }
    setSubmissionError(
      'A Username between the length of 1 - 9 characters is required.'
    );
  };
  return (
    <section className="game__form">
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
            aria-label="Enter Username"
            placeholder="Enter a username"
          ></input>
        </div>

        <div className="input__container">
          <label className="signup-label">Select a character:</label>
          <div className="characters">
            {CHARACTER_LIST.map(({ id, name, img }) => (
              <label className="character__container" key={id}>
                <input
                  type="radio"
                  name="site_name"
                  value={name}
                  checked={selectedCharacter === name}
                  onChange={e => setSelectedCharacter(e.target.value)}
                />
                <div className="character-tile">
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
        {submissionError && (
          <label className="error-label form__space--bottom">
            {submissionError}
          </label>
        )}
      </form>
    </section>
  );
};

export default SignupForm;
