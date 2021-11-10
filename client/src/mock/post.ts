export const mockPost = Array(50)
  .fill(undefined)
  .map((_, i) => ({
    idx: i + 1,
    useridx: 1,
    secret: 1,
    likenum: 10,
    contents: `테스트 ${i + 1}`,
    picture1: null,
    picture2: null,
    picture3: null,
    createdAt: new Date(),
    BTUseruseridx: {
      bio: null,
      idx: 1,
      nickname: '테스트유저',
      profile: null
    }
  }));
