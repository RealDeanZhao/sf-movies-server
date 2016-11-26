module.exports = function (err, req, res, next) {
    if (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
}