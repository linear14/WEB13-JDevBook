import { useSetRecoilState } from 'recoil';

import { alertState } from 'recoil/store';

const useAlertModal = () => {
  const setAlertModal = useSetRecoilState(alertState);

  return (comment: string, bgColor?: string) => {
    setAlertModal({ comment: comment, bgColor: bgColor, modalState: true });
  };
};

export default useAlertModal;
