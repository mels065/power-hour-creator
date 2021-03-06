const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const router = require('./controllers');

const helpers = require('./utils/helpers');

const createPayload = require('./utils/create-payload');

async function init() {
    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize
        })
    }));

    const hbs = exphbs.create({ helpers });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(createPayload);
    app.use(router);

    try {
        await sequelize.sync({ force: false });
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
}

init();
