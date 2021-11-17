import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { groupState } from 'recoil/store';
import fetchApi from 'api/fetch';
import { IGroup } from 'types/group';

const InitGroupData = ({ groupIdx }: { groupIdx: number }) => {
  const [groupData, setGroupData] = useRecoilState(groupState);

  const fetchGroup = async (groupIdx: number) => {
    const group: IGroup = await fetchApi.getGroup(groupIdx);
    setGroupData(group);
  };

  useEffect(() => {
    fetchGroup(groupIdx);
  }, []);

  return <></>;
};

export default InitGroupData;
