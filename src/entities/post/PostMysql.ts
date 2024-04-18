import Sequelize from "sequelize";
import { mysqlConnection } from "../../db/mysqlConnection";


export const PostMysql = mysqlConnection.define('Post', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});