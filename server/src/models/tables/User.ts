import { Table, Column, Model, HasMany, BelongsToMany, Unique, Length } from 'sequelize-typescript'
import Chat from './Chat';
import Group from './Group'
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
    @Length({ min: 1, max: 32})
    @Column
    nickname!: string;

    @Length({ min: 1, max: 1024})
    @Column
    profile!: string;

    @Length({ min: 1, max: 1024})
    @Column
    cover!: string;

    @Length({ min: 1, max: 100})
    @Column
    bio!: string;

    @BelongsToMany(() => User, {through: () => Chat, foreignKey: 'senderidx'})
    senderidx?: User[]

    @BelongsToMany(() => User, {through: () => Chat, foreignKey: 'receiveridx'})
    receiveridx?: User[]

    @BelongsToMany(() => Group, {through: () => UserGroup, foreignKey: 'useridx'})
    useridx?: Group[]
}