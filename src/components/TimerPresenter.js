import React from 'react';

export default ({ timer }) => {
  const addZeros = (numStr, length = 2) => {
    return numStr.length >= length ? numStr : addZeros(`0${numStr}`, length);
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
