const express = require('express');
const app = express();

const indexRouter = require('./routes/index');


app.use(express.json());


app.use('/api/index', indexRouter );

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});