import { Sequelize } from 'sequelize';

export const mysqlConnection = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASS as string,
    {
        host: process.env.MYSQL_HOST as string,
        dialect: 'mysql',
    }
);
