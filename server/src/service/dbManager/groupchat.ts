import db from '../../models';

const setGroupChatList = async (
  sender: string,
  groupidx: number,
  msg: string
) => {
  const senderData = await db.models.User.findOne({
    where: { nickname: sender },
    logging: false
  });

  const senderidx: number = senderData?.get().idx ? senderData?.get().idx : -1;

  await db.models.GroupChat.create(
    {
      useridx: senderidx,
      groupidx: groupidx,
      content: msg
    },
    { logging: false }
  );
};

export { setGroupChatList };
