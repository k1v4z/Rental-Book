require('dotenv').config({ path: '../../.env' });
const { Sequelize } = require('sequelize');

//config
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

const sequelize = new Sequelize(db_name, db_user, db_password, {
    host: db_host,
    dialect: 'mysql',
    port: Number(db_port),
    define: {
        timestamps: false
    }
});

module.exports = {
    sequelize
}

