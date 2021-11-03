import db from "../models";

const dbManager = {
    sync: async () => {
        await db.sync({force: true, logging: true}).then(() => {
            console.log('Connection has been established successfully.');
          }).catch((error: any) => {
            console.error('Unable to connect to the database:', error);
          })
          
    },

    getUserdata: async (username: string) => {
      const [user, created] = await db.models.User.findOrCreate({
        where: { nickname: username },
        defaults: { nickname: username }
      })

      return user.get();
    }
}

export default dbManager;