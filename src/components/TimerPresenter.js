import React from 'react';
import timerHumanizer from '../helpers/timerHumanizer';

export default ({ timer }) => {
  const time = timerHumanizer(timer);
  return <h1>{time}</h1>;
};
