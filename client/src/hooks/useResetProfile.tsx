import { useRecoilState, useResetRecoilState } from 'recoil';

import { modalStateStore, profileState } from 'recoil/store';
import { IProfile } from 'types/user';
import fetchApi from 'api/fetch';

const useResetProfile = () => {
  const resetProfile = useResetRecoilState(profileState);
  const [profileData, setProfileData] = useRecoilState(profileState);
  const [modalState, setModalState] = useRecoilState(modalStateStore);

  const resetProfileData = async (userName: string) => {
    resetProfile();
    setModalState({ ...modalState, editProfile: false });
    const fetchProfileData: IProfile = await fetchApi.getProfile(userName);
    setProfileData(fetchProfileData);
  };

  return (userName: string) => {
    resetProfileData(userName);
  };
};

export default useResetProfile;
