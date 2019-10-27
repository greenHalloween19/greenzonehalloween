import React, { useState } from 'react';

const PresentCodeOverlay = ({
  submitPresentCode,
  closePresentOverlay,
  presentErrorLabel
}) => {
  const [presentCode, setPresentCode] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    submitPresentCode(presentCode);
  };

  return (
    <section className="present-overlay game__overlay">
      <h1 className="game__header">Enter a present code:</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input
          id="present-code"
          className="text-input"
          type="text"
          onChange={e => setPresentCode(e.target.value)}
          value={presentCode}
          aria-labelledby="Present Code"
          placeholder="Present Code"
        ></input>
        {presentErrorLabel && (
          <div className="form__space--top">
            <label className="error-label">
              {presentErrorLabel}
            </label>
          </div>
        )}
        <div>
          <input
            className="button-control form__space--top form__space--bottom form__space--right"
            type="submit"
            value="Submit"
          ></input>
          <input
            className="button-control form__space--top form__space--bottom"
            type="button"
            value="x"
            onClick={() => closePresentOverlay()}
          ></input>
        </div>
      </form>
    </section>
  );
};

export default PresentCodeOverlay;
