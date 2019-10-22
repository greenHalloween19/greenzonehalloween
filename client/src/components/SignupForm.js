import React, { useState } from 'react';

const SignupForm = ({ onFormSubmitted }) => {
  const [userName, setUsername] = useState('');
  const [submissionError, setSubmissionError] = useState('');

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
    <form onSubmit={e => onSubmit(e)}>
      <div className="text-input__container">
        <input
          className="text-input"
          type="text"
          onChange={e => setUsername(e.target.value)}
          value={userName}
          aria-label="Enter Username"
          placeholder="Enter a username"
        ></input>
      </div>
      <div className="button-control__container">
        <input className="button-control" type="submit" value="Submit"></input>
      </div>
      {submissionError && (
        <label className="error-label">{submissionError}</label>
      )}
    </form>
  );
};

export default SignupForm;
