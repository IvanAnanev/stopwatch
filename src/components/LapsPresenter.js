import React from 'react';
import timerHumanize from '../helpers/timerHumanize';

export default ({ laps }) => {
  return (
    <div>
      <h2>Laps:</h2>
      <ol>
        {laps.map((lap, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Lap lap={lap} key={index} />
        ))}
      </ol>
    </div>
  );
};

const Lap = ({ lap }) => {
  const time = timerHumanize(lap.end - lap.start);
  return <li>{time}</li>;
};
