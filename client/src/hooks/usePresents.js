import { useState } from 'react';

const PRESENT_CODE_LIST = ['hbc3', 'bba4', 'tic7', 'bbg1', 'app2', 'mch3', 'aaa4', 'ddd7', 'asd5', 'bca9'];
const LIST_OF_PRESENTS = [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, -5000, -4000];

const usePresents = () => {
  const [isEnteringPresentCode, setEnteringPresentCode] = useState(false);
  const [listOfPresents, setListOfPresents] = useState([]);
  const [presentCodes, setPresentCodes] = useState(PRESENT_CODE_LIST);
  const [listOfAvailablePresents, setListOfAvailablePresents] = useState(
    LIST_OF_PRESENTS
  );
  const [presentErrorLabel, setPresentErrorLabel] = useState('');

  const enteringPresentCode = () => {
    setEnteringPresentCode(true);
  };

  const presentOverlayClosed = () => {
    setEnteringPresentCode(false);
  };

  const presentCodeEntered = presentCode => {
    setPresentErrorLabel('');
    if (presentCodes.length > 0) {
      const letPresentCodeLoc = presentCodes.indexOf(presentCode);
      if (letPresentCodeLoc > -1) {
        setPresentCodes(presentCodes.filter(code => code !== presentCode));
        const present =
          listOfAvailablePresents[
            Math.floor(Math.random() * listOfPresents.length) + 1
          ];
        setListOfAvailablePresents(
          listOfPresents.filter(presentVal => presentVal !== present)
        );
        setListOfPresents([...listOfPresents, present]);
        presentOverlayClosed();
      } else {
        setPresentErrorLabel('Invalid Code Entered.');
      }
    } else {
      setPresentErrorLabel('You have already found all of the presents!');
    }
  };
  return [
    {
      isEnteringPresentCode,
      listOfPresents,
      presentCodes,
      listOfAvailablePresents,
      presentErrorLabel
    },
    enteringPresentCode,
    presentOverlayClosed,
    presentCodeEntered
  ];
};

export default usePresents;
