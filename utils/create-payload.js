module.exports = (req, res, next) => {
    req.payload = {
        logged_in: req.session.logged_in
    }
    next();
}
