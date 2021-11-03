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
  } from "sequelize";

//import db from '../models';

// interface UsersAttributes {
//     idx: number,
//     nickname: string,
//     profile: string, // url
//     cover: string, // url
//     bio: string
// }

// export class Users extends Model<UsersAttributes>{
//     public readonly idx!: number;
//     public nickname!: string;
//     public profile!: string;
//     public cover!: string;
//     public bio!: string;

//     //timestamps
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;

//     // Since TS cannot determine model association at compile time
//   // we have to declare them here purely virtually
//   // these will not exist until `Model.init` was called.
// //   public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
// //   public addProject!: HasManyAddAssociationMixin<Project, number>;
// //   public hasProject!: HasManyHasAssociationMixin<Project, number>;
// //   public countProjects!: HasManyCountAssociationsMixin;
// //   public createProject!: HasManyCreateAssociationMixin<Project>;

// // You can also pre-declare possible inclusions, these will only be populated if you
//   // actively include a relation.
// //   public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

// //   public static associations: {
// //     projects: Association<User, Project>;
// //   };
// }

// Users.init({
//     idx: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     nickname: {
//         type: DataTypes.STRING(32),
//         allowNull: false,
//         unique: true
//     },
//     profile: {
//         type: DataTypes.STRING(1024),
//     },
//     cover: {
//         type: DataTypes.STRING(1024),
//     },
//     bio: {
//         type: DataTypes.STRING(100),
//     }
// }, {
//     tableName: 'Users',
//     sequelize: db.sequelize, // TypeError: Cannot read property 'sequelize' of undefined
//     // 도대체 왜..............
//     paranoid: true
// })

// Here we associate which actually populates out pre-declared `association` static and other methods.
// User.hasMany(Project, {
//     sourceKey: "id",
//     foreignKey: "ownerId",
//     as: "projects", // this determines the name in `associations`!
//   });

module.exports = (sequelize: any, DataTypes: any) => {
    const Users = sequelize.define('Users', {
    idx: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nickname: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    },
    profile: {
        type: DataTypes.STRING(1024),
    },
    cover: {
        type: DataTypes.STRING(1024),
    },
    bio: {
        type: DataTypes.STRING(100),
    }
    }, {
        tableName: 'Users',
        paranoid: true // deletedAt
    })

    Users.associate = (db: any) => {
        //n:m 작동을 안하네 왜지.........
        db.Users.belongsToMany(db.Users, {as: 'user1idx', through: db.Chats, foreignKey: 'user1idx'})
        db.Users.belongsToMany(db.Users, {as: 'user2idx', through: db.Chats, foreignKey: 'user2idx'})
    }

    return Users
}