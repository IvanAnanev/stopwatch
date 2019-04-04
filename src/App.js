import React, { useState, useEffect } from 'react';
import TimerPresenter from './components/TimerPresenter';

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerStart, setTimerStart] = useState();
  const [timerPause, setTimerPause] = useState();

  const timestampNow = () => {
    return new Date().getTime();
  };

  const handleStart = () => {
    setTimerStart(timestampNow());
    setIsOn(true);
  };

  const handleStop = () => {
    if (isOn) {
      setTimer(timestampNow() - timerStart);
      setIsOn(false);
    }
  };

  const handlePause = () => {
    setTimerPause(timestampNow());
    setIsOn(false);
    setIsPause(true);
  };

  const handleContinue = () => {
    setTimerStart(ts => ts + (timestampNow() - timerPause));
    setIsOn(true);
    setIsPause(false);
  };

  const handleReset = () => {
    setTimerStart(null);
    setTimer(0);
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
      <button disabled={isOn || timer !== 0} onClick={handleStart} type="button">
        Start
      </button>
      <button disabled={!isOn} onClick={handlePause} type="button">
        Pause
      </button>
      <button disabled={!isPause} onClick={handleContinue} type="button">
        Continue
      </button>
      <button disabled={!isOn} onClick={handleStop} type="button">
        Stop
      </button>
      <button disabled={timer === 0 || isOn || isPause} onClick={handleReset} type="button">
        Reset
      </button>
    </div>
  );
};

export default App;
