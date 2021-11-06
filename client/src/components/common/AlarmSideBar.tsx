import React from 'react';
import { useRecoilValue } from 'recoil';
import { rightModalStates, userData } from 'recoil/modal';

const AlarmSideBar: React.FC = () => {
  const rightModalState = useRecoilValue(rightModalStates);

  if (rightModalState.rightModalFlag && rightModalState.alarmFlag) {
    return (
      <div>This is AlarmSideBar</div>
    );
  } else return (
    <div></div>
  );
};

export default AlarmSideBar;
