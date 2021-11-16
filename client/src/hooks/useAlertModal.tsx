import { useRecoilState, useResetRecoilState } from 'recoil';

import { AlertState } from 'recoil/store';

const useAlertModal = () => {
  const resetModal = useResetRecoilState(AlertState);
  const [alertState, setAlertState] = useRecoilState(AlertState);

  return (comment: string, bgColor?: string) => {
    setAlertState({ comment: comment, bgColor: bgColor, modalState: true });
    resetModal();
  };
};

export default useAlertModal;
