module.exports = {
    ...require('./auth'),
    ...require('./poll')
}

module.exports.notFound = (req, res, next) => {
    const err = new Error('No encontrado');
    err.status = 404;

    next(err);
};

module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Algo salió mal'
    });
};