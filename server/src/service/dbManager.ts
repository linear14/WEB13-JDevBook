import { sequelize } from "../models";

const dbManager = {
    sync: async () => {
        await sequelize.sync({force: true}).then(() => {
            console.log('Connection has been established successfully.');
          }).catch((error: any) => {
            console.error('Unable to connect to the database:', error);
          })
          
    }
}

export default dbManager;