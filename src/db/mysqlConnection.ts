import { Sequelize } from "sequelize";

export const mysqlConnection = new Sequelize('express_posts', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});