import { PostAddData } from 'types/interface';
import { objectStorage } from '../service/objectStorage';

export const pictureCheck = async (PostAddData: PostAddData) => {
  const pList: (string | null)[] = [
    PostAddData.picture1,
    PostAddData.picture2,
    PostAddData.picture3
  ];

  // picture 순서 예외처리 (fetch 강제 시도)
  if (pList[0] === null && (pList[1] !== null || pList[2] !== null))
    return false;
  if (pList[0] !== null && pList[1] === null && pList[2] !== null) return false;

  // picture 정상 체크
  if (pList[0] === null) {
  } else if (pList[1] === null) {
    if (!(await objectStorage.getExistObject(pList[0]))) return false;
  } else if (pList[2] === null) {
    if (!(await objectStorage.getExistObject(pList[0]))) return false;
    if (!(await objectStorage.getExistObject(pList[1]))) return false;
  } else {
    if (!(await objectStorage.getExistObject(pList[0]))) return false;
    if (!(await objectStorage.getExistObject(pList[1]))) return false;
    if (!(await objectStorage.getExistObject(pList[2]))) return false;
  }

  return true;
};
