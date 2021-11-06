import React from 'react';
import { useRecoilValue } from 'recoil';
import { rightModalStates, userData } from 'recoil/modal';

const SelectorSideBar: React.FC = () => {
  const rightModalState = useRecoilValue(rightModalStates);

  if (rightModalState.rightModalFlag && rightModalState.selectorFlag) {
    return (
      <div>This is SelectorSideBar</div>
    );
  } else return (
    <div></div>
  );
};

export default SelectorSideBar;
