import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import User from './User';
import Group from './Group';

@Table({
  tableName: 'usergroups',
  timestamps: true,
  paranoid: true,
  charset: 'utf8mb4'
})
export default class UserGroup extends Model<UserGroup> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  idx!: number;

  @ForeignKey(() => User)
  @Column
  useridx!: number;

  @ForeignKey(() => Group)
  @Column
  groupidx!: number;
}
