module.exports = (req, res, view, args) => {
    res.render(
        view,
        {
            ...(args ? args : {}),
            ...req.payload
        }
    )
}
