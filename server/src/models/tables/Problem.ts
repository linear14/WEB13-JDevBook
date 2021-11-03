import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import Group from './Group';
import User from './User'

@Table({
    tableName: 'problems',
    timestamps: true,
    paranoid: true
})
export default class Problem extends Model<Problem> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;

    @ForeignKey(() => Group)
    @Column
    groupidx!: number;

    @Column({ allowNull: false, type: DataType.STRING(1024)})
    question!: string;

    @Column({ allowNull: false})
    answer!: boolean;

    @BelongsTo(() => Group, {foreignKey: 'groupidx', targetKey: 'idx'})
    BTGroupgroupidx?: Group
}