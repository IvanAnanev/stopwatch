import React, { useState } from 'react';
import timerHumanize from '../helpers/timerHumanize';

export default ({ timer, commonTimer }) => {
  const time = timerHumanize(timer);
  const commonTime = timerHumanize(commonTimer);

  return commonTimer ? <ComplexTimer commonTime={commonTime} time={time} /> : <SimpleTimer time={time} />;
};

const ComplexTimer = ({ commonTime, time }) => {
  const [flagCommonMaster, setFlagCommonMaster] = useState(false);
  const handleChangePriority = () => setFlagCommonMaster(!flagCommonMaster);
  const masterTimer = () => (flagCommonMaster ? `Common: ${commonTime}` : `Lap: ${time}`);
  const slaveTimer = () => (flagCommonMaster ? `Lap: ${time}` : `Common: ${commonTime}`);

  return (
    <div>
      <h1>{masterTimer()}</h1>
      <h3>{slaveTimer()}</h3>
      <button type="button" onClick={handleChangePriority}>
        Change priority
      </button>
    </div>
  );
};

const SimpleTimer = ({ time }) => <h1>{time}</h1>;
