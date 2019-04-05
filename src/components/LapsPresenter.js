import React from 'react';
import timerHumanizer from '../helpers/timerHumanizer';

export default ({ laps }) => {
  return (
    <div>
      <h2>Laps:</h2>
      <ol>
        {laps.map((lap, index) => (
          <Lap lap={lap} id={index} />
        ))}
      </ol>
    </div>
  );
};

const Lap = ({ lap }) => {
  const time = timerHumanizer(lap.end - lap.start);
  return <li>{time}</li>;
};
