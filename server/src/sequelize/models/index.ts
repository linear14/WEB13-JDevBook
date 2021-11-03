//'use strict';

//const fs = require('fs');
import path from 'path';
import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize"; // models 바깥으로 나오면 에러남...
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/dbconfig.json')[env];
const users = require('./tb-users');
const chat = require('./tb-chat');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  Sequelize,
  Users: users(sequelize, DataTypes),
  Chats: chat(sequelize, DataTypes)
}

// fs.readdirSync(__dirname + "/models")
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       DataTypes
//     );
//     db[model.name] = model;
//   });

Object.keys(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
