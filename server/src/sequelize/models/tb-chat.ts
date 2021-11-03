module.exports = (sequelize: any, DataTypes: any) => {
    const Chats = sequelize.define('Chats', {
        user1idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user2idx: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
    }, {
        tableName: 'Chats',
        paranoid: true
    })

    Chats.associate = (db: any) => {
        
    }

    return Chats
}