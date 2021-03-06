const express = require('express');

const { User } = require('../../models');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.is_loggedin = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json(err);
    }
})

userRouter.post('/logout', (req, res) => {
    if (req.session.is_loggedin) {
        req.session.destroy();
        res.redirect('/');
    } else {
        res.json({ message: "Failed to logout" });
    }
});

module.exports = userRouter;
