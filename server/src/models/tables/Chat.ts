import { Table, Column, Model, Length, ForeignKey } from 'sequelize-typescript'
import User from './User';

@Table({
    tableName: 'chats',
    timestamps: true,
    paranoid: true
})
export default class Chat extends Model<Chat> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;
    
    @ForeignKey(() => User)
    @Column
    senderidx!: number;

    @ForeignKey(() => User)
    @Column
    receiveridx!: number;

    @Length({ min: 1, max: 1024})
    @Column({
        allowNull: false
    })
    content!: string;

}
