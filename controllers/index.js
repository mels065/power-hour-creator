const express = require('express');

const { User, Post, Comment } = require('../models');

const apiRouter = require('./api');

const withAuth = require('../utils/with-auth');
const initiateRender = require('../utils/initiate-render');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/', async (req, res) => {
    try {
        initiateRender(req, res, 'landing');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
