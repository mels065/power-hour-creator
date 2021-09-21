const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else if (process.env.NODE_ENV && process.env.NODE_ENV === 'staging') {
    sequelize = new Sequelize(
        process.env.STAGING_DB_NAME,
        process.env.STAGING_DB_USER,
        process.env.STAGING_DB_PASSWORD,
        {
            host: process.env.STAGING_DB_HOST,
            dialect: 'mysql',
            port: 3306
        }
    );
} else {
    sequelize = new Sequelize(
        process.env.DEV_DB_NAME,
        process.env.DEV_DB_USER,
        process.env.DEV_DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    )
}

module.exports = sequelize;
