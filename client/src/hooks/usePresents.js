import { useState } from 'react';

const PRESENT_CODE_LIST = ['MerryHalloween19', 'SnakeEyes11', 'FrogsBreath20', 'WhatsThis85', 'PumpkinKing50', 'MakingXmas22', 'SandyClaws63', 'Snowball57', 'Nightmare99', 'ZeroRulez00'];
const LIST_OF_PRESENTS = [5000, 4000, 3000, 2000, 1000, 500, 400, 300, -1000, -500];

const usePresents = () => {
  const [isEnteringPresentCode, setEnteringPresentCode] = useState(false);
  const [listOfPresents, setListOfPresents] = useState([]);
  const [presentCodes, setPresentCodes] = useState(PRESENT_CODE_LIST);
  const [isOpeningPresents, setIsOpeningPresents] = useState(false);
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

  const openingPresents = () => {
    setIsOpeningPresents(true);
  }
  const finishedOpeningPresents = () => {
    setListOfPresents([]);
    setIsOpeningPresents(false);
  }


  const presentCodeEntered = presentCode => {
    setPresentErrorLabel('');
    if (presentCodes.length > 0) {
      const letPresentCodeLoc = presentCodes.indexOf(presentCode);
      if (letPresentCodeLoc > -1) {
        setPresentCodes(presentCodes.filter(code => code !== presentCode));
        const present =
          listOfAvailablePresents[
            Math.floor(Math.random() * listOfAvailablePresents.length)
          ];
        setListOfAvailablePresents(
          listOfAvailablePresents.filter(presentVal => presentVal !== present)
        );
        setListOfPresents([...listOfPresents, { value: present, opened: false }]);
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
      presentErrorLabel,
      isOpeningPresents
    },
    enteringPresentCode,
    presentOverlayClosed,
    presentCodeEntered,
    openingPresents,
    finishedOpeningPresents
  ];
};

export default usePresents;
