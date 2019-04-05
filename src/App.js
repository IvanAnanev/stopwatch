import React, { useState, useEffect } from 'react';
import TimerPresenter from './components/TimerPresenter';
import LapsPresenter from './components/LapsPresenter';

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerStart, setTimerStart] = useState();
  const [commonTimer, setCommonTimer] = useState(0);
  const [commonTimerStart, setCommonTimerStart] = useState();
  const [timerPause, setTimerPause] = useState();
  const [laps, setLaps] = useState([]);

  const timestampNow = () => new Date().getTime();

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
    const now = timestampNow();
    setTimerStart(timerStart + (now - timerPause));
    if (commonTimerStart) {
      setCommonTimerStart(commonTimerStart + (now - timerPause));
    }
    setIsOn(true);
    setIsPause(false);
  };

  const handleReset = () => {
    setTimerStart(null);
    setTimer(0);
    setIsOn(false);
    setLaps([]);
    if (commonTimerStart) {
      setCommonTimerStart(null);
      setCommonTimer(0);
    }
  };

  const handleLap = () => {
    const now = timestampNow();
    setLaps([...laps, { start: timerStart, end: now }]);
    if (!commonTimerStart) {
      setCommonTimerStart(timerStart);
    }
    setTimerStart(now);
  };

  useEffect(() => {
    let interval;

    if (isOn) {
      interval = setInterval(() => {
        const now = timestampNow();
        setTimer(now - timerStart);
        if (commonTimerStart) {
          setCommonTimer(now - commonTimerStart);
        }
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isOn, laps]);

  return (
    <div>
      <TimerPresenter timer={timer} commonTimer={commonTimer} />
      <button disabled={isOn || timer !== 0} onClick={handleStart} type="button">
        Start
      </button>
      <button disabled={!isOn} onClick={handlePause} type="button">
        Pause
      </button>
      <button disabled={!isPause} onClick={handleContinue} type="button">
        Continue
      </button>
      <button disabled={!isOn} onClick={handleLap} type="button">
        Lap
      </button>
      <button disabled={!isOn} onClick={handleStop} type="button">
        Stop
      </button>
      <button disabled={timer === 0 || isOn || isPause} onClick={handleReset} type="button">
        Reset
      </button>
      {laps.length > 0 && <LapsPresenter laps={laps} />}
    </div>
  );
};

export default App;
