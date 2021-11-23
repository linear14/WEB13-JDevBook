import db from '../../models';
import './index';

const addAlarm = async function (receiver: string, msg: string) {
  const receiverData = await db.models.User.findOne({
    where: { nickname: receiver },
    logging: false
  });
  const receiveridx: number = receiverData?.get().idx
    ? receiverData?.get().idx
    : -1;

  await db.models.Alarm.create(
    {
      useridx: receiveridx,
      message: msg
    },
    { logging: false }
  );
};

export { addAlarm };
