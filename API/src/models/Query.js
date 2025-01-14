import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Query = sequelize.define('Query', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    queryId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clientId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'querys',
    timestamps: true,     // Cria automaticamente createdAt e updatedAt
});

export default Query;