const express = require('express');

const app = express();

const indexRouter = require('./routes/index.js');

app.use("/api/index", indexRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});