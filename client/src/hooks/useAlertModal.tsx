import { useRecoilState } from 'recoil';

import { AlertState } from 'recoil/store';

const useAlertModal = () => {
  const [alertState, setAlertState] = useRecoilState(AlertState);

  return (comment: string, bgColor?: string) => {
    setAlertState({ comment: comment, bgColor: bgColor, modalState: true });
  };
};

export default useAlertModal;
