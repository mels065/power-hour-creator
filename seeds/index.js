const sequelize = require('../config/connection');
const { User } = require('../models');

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true });

        process.exit(0);
    } catch (err) {
        console.error(err);
    }
}

seedDatabase();
