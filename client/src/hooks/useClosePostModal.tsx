import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  isImgMaxState,
  isImgUploadingState,
  modalStateStore,
  postModalDataStates,
  uploadImgList
} from 'recoil/store';

const useClosePostModal = () => {
  const resetModal = useResetRecoilState(modalStateStore);
  const resetImgMax = useResetRecoilState(isImgMaxState);
  const resetImgList = useResetRecoilState(uploadImgList);
  const resetImgUploading = useResetRecoilState(isImgUploadingState);
  const [postData, setPostData] = useRecoilState(postModalDataStates);

  return () => {
    resetModal();
    resetImgMax();
    resetImgList();
    resetImgUploading();
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
