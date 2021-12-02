import { useEffect, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from 'recoil';

import fetchApi from 'api/fetch';

import {
  userDataStates,
  postModalDataStates,
  solvedProblemState,
  groupListState,
  myJoinedGroupState,
  commonState,
  rightModalStates,
  usersocketStates
} from 'recoil/store';
import { useHistory } from 'react-router-dom';
import { IProblem } from 'types/problem';
import { IGroup } from 'types/group';

const InitUserData = () => {
  const setUserdata = useSetRecoilState(userDataStates);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [groupList, setGroupList] = useRecoilState(groupListState);
  const setSolvedProblems = useSetRecoilState(solvedProblemState);
  const setJoinedGroups = useSetRecoilState(myJoinedGroupState);
  const setCommon = useSetRecoilState(commonState);
  const history = useHistory();

  const resetCommonState = useResetRecoilState(commonState);
  const resetUserdata = useResetRecoilState(userDataStates);
  const resetSolvedProblemState = useResetRecoilState(solvedProblemState);
  const resetRightModalState = useResetRecoilState(rightModalStates);
  const socket = useRecoilValue(usersocketStates);

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi.getuserData();
      if (error) {
        resetUserdata();
        resetCommonState();
        resetSolvedProblemState();
        resetRightModalState();
        socket.emit('disconnect notify');
        history.push('/');
        alert('비정상 접근');
      } else {
        const fetchGroupList: IGroup[] = await fetchApi.getGroupList();
        setUserdata({
          name: data.nickname,
          idx: data.idx,
          profile: data.profile,
          cover: data.cover,
          bio: data.bio,
          login: true
        });
        setPostData({
          ...postData,
          useridx: data.idx,
          BTUseruseridx: { ...data }
        });
        setSolvedProblems(
          data.BTMUserProblemuseridx.map((item: IProblem) => ({
            idx: item.idx,
            groupIdx: item.groupidx
          }))
        );
        if (groupList.length === 0) setGroupList(fetchGroupList);
        setJoinedGroups(
          data.BTMUserGroupuseridx.map((item: IGroup) => item.idx)
        );
        setCommon(true);
      }
    })();
  }, []);

  return <></>;
};

export default InitUserData;
