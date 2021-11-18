import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  isImgMaxState,
  modalStateStore,
  postModalDataStates,
  uploadImgList
} from 'recoil/store';

const useClosePostModal = () => {
  const resetModal = useResetRecoilState(modalStateStore);
  const resetImgMax = useResetRecoilState(isImgMaxState);
  const resetImgList = useResetRecoilState(uploadImgList);
  const [postData, setPostData] = useRecoilState(postModalDataStates);

  return () => {
    resetModal();
    resetImgMax();
    resetImgList();
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
