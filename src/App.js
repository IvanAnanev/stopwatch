import React, { useState, useEffect } from 'react';

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerStart, setTimerStart] = useState();

  const timestampNow = () => {
    return new Date().getTime();
  };

  const handleStart = () => {
    setTimerStart(timestampNow());
    setIsOn(true);
  };

  const handleStop = () => {
    setTimer(timestampNow() - timerStart);
    setIsOn(false);
  };

  useEffect(() => {
    let interval;

    if (isOn) {
      interval = setInterval(() => setTimer(timestampNow() - timerStart), 10);
    }

    return () => clearInterval(interval);
  }, [isOn]);

  return (
    <div>
      <TimerPresenter timer={timer} />
      <button onClick={handleStart} type="button">
        Start
      </button>
      <button onClick={handleStop} type="button">
        Stop
      </button>
    </div>
  );
};

const TimerPresenter = ({ timer }) => {
  const addZeros = (numStr, length = 2) => {
    if (numStr.length >= length) {
      return numStr;
    }
    return addZeros(`0${numStr}`, length);
  };

  const timerMinutes = () => {
    const minutes = Math.floor(timer / 60000) % 60;
    return addZeros(minutes.toString());
  };

  const timerSeconds = () => {
    const seconds = Math.floor(timer / 1000) % 60;
    return addZeros(seconds.toString());
  };

  const timerMilliseconds = () => {
    const milleseconds = timer % 1000;
    return addZeros(milleseconds.toString(), 3);
  };

  return (
    <h1>
      {timerMinutes()}:{timerSeconds()}.{timerMilliseconds()}
    </h1>
  );
};

export default App;
