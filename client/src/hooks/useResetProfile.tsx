import { useRecoilState, useResetRecoilState } from 'recoil';

import { profileState } from 'recoil/store';
import { IProfile } from 'types/user';
import fetchApi from 'api/fetch';

const useProfileData = () => {
  const resetProfile = useResetRecoilState(profileState);
  const [profileData, setProfileData] = useRecoilState(profileState);

  const resetProfileData = async (userName: string) => {
    resetProfile();
    const fetchProfileData: IProfile = await fetchApi.getProfile(userName);
    setProfileData(fetchProfileData);
  };

  return (userName: string) => {
    resetProfileData(userName);
  };
};

export default useProfileData;
