import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { profileState } from 'recoil/store';
import fetchApi from 'api/fetch';
import { IProfile } from 'types/user';

const InitProfileData = ({ userName }: { userName: string }) => {
  const [profileData, setProfileData] = useRecoilState(profileState);
  const resetprofileData = useResetRecoilState(profileState);

  const fetchProfile = async (userName: string) => {
    const { data: profile, error } = await fetchApi.getProfile(userName);
    //if (!error) setprofileData(profile);
    if (!error) {
      setProfileData({
        idx: profile.idx,
        nickname: profile.nickname,
        cover: profile.cover,
        bio: profile.bio
      });
    }
  };

  useEffect(() => {
    resetprofileData();
    fetchProfile(userName);
  }, [userName]);

  return <></>;
};

export default InitProfileData;
