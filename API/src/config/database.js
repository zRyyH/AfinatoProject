import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'afinato',
    'afinato',
    'Raridadef750*', {
    host: '154.38.180.78',
    port: 3306,
    dialect: 'mysql',
    timezone: '-03:00'
});

export default sequelize;