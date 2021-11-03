import { Table, Column, Model, HasMany, BelongsToMany, Length, Unique } from 'sequelize-typescript'
import User from './User';
import UserGroup from './UserGroup'

@Table({
    tableName: 'groups',
    timestamps: true,
    paranoid: true
})
export default class Group extends Model<Group> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;

    @Unique
    @Length({ min: 1, max: 32})
    @Column
    title!: string;

    @Length({ min: 1, max: 1024})
    @Column
    description!: string;

    @Length({ min: 1, max: 1024})
    @Column
    cover!: string;

    @BelongsToMany(() => User, {through: () => UserGroup, foreignKey: 'groupidx'})
    groupidx?: User[]
}