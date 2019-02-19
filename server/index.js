const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.json({
    hello: "world"
}));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;

    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    });
});

app.listen(port, console.log(`Server running on port ${port}`));