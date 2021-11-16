import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  isImgMaxState,
  modalStateStore,
  postModalDataStates
} from 'recoil/store';

const useClosePostModal = () => {
  const resetModal = useResetRecoilState(modalStateStore);
  const resetImgMax = useResetRecoilState(isImgMaxState);
  const [postData, setPostData] = useRecoilState(postModalDataStates);

  return () => {
    resetModal();
    resetImgMax();
    setPostData({
      ...postData,
      idx: 0,
      secret: false,
      contents: '',
      likenum: 0,
      likeFlag: false,
      picture1: null,
      picture2: null,
      picture3: null,
      createdAt: new Date(),
      BTUseruseridx: { ...postData.BTUseruseridx }
    });
  };
};

export default useClosePostModal;
