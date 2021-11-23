import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { profileState } from 'recoil/store';
import fetchApi from 'api/fetch';
import { IProfile } from 'types/user';

const InitProfileData = ({ userName }: { userName: string }) => {
  const [profileData, setprofileData] = useRecoilState(profileState);
  const resetprofileData = useResetRecoilState(profileState);

  const fetchProfile = async (userName: string) => {
    const { data: profile, error } = await fetchApi.getProfile(userName);
    if (!error) setprofileData(profile);
  };

  useEffect(() => {
    resetprofileData();
    fetchProfile(userName);
  }, []);

  return <></>;
};

export default InitProfileData;
