import { Table, Column, Model, HasMany, BelongsToMany, Unique, Length, DataType } from 'sequelize-typescript'
import Chat from './Chat';
import Group from './Group'
import Like from './Like';
import Post from './Post';
import UserGroup from './UserGroup';

@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true
})
export default class User extends Model<User> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;

    @Unique
    @Column({ type: DataType.STRING(32)})
    nickname!: string;

    @Column({ type: DataType.STRING(1024)})
    profile!: string;

    @Column({ type: DataType.STRING(1024)})
    cover!: string;

    @Column({ type: DataType.STRING(100)})
    bio!: string;

    @BelongsToMany(() => User, {through: () => Chat, foreignKey: 'senderidx'})
    BTMChatsenderidx?: User[]

    @BelongsToMany(() => User, {through: () => Chat, foreignKey: 'receiveridx'})
    BTMChatreceiveridx?: User[]

    @BelongsToMany(() => Group, {through: () => UserGroup, foreignKey: 'useridx'})
    BTMUserGroupuseridx?: Group[]

    @HasMany(() => Post, {foreignKey: 'useridx', sourceKey: 'idx'})
    HMPostuseridx?: Post[]

    @BelongsToMany(() => Post, {through: () => Like, foreignKey: 'useridx'})
    BTMLikeuseridx?: Post[]
}