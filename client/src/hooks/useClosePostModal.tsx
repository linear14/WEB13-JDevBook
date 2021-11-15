import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalStateStore, postModalData } from 'recoil/store';

const useClosePostModal = () => {
  const resetModal = useResetRecoilState(modalStateStore);
  const [postData, setPostData] = useRecoilState(postModalData);

  return () => {
    resetModal();
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
