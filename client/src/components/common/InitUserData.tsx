import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  solvedProblemState,
  groupListState,
  myJoinedGroupState
} from 'recoil/store';
import { commonState } from 'recoil/common';
import { userDataStates } from 'recoil/user';
import { postModalDataStates } from 'recoil/post';

import { IProblem } from 'types/problem';
import { IGroup } from 'types/group';
import fetchApi from 'api/fetch';

const InitUserData = () => {
  const setUserdata = useSetRecoilState(userDataStates);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [groupList, setGroupList] = useRecoilState(groupListState);
  const setSolvedProblems = useSetRecoilState(solvedProblemState);
  const setJoinedGroups = useSetRecoilState(myJoinedGroupState);
  const setCommon = useSetRecoilState(commonState);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi.getuserData();
      const fetchGroupList: IGroup[] = await fetchApi.getGroupList();
      if (error) {
        alert('비정상 접근');
        history.push('/');
      } else {
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

        //socket.connect();
        //socket?.emit('name', data.nickname);
      }
    })();
  }, []);

  return <></>;
};

export default InitUserData;
