require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const connectDb = require('./db/connect');

const notFound = require('./middleware/not-found');
const apiErrorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

const userRouter = require('./routes/userRouter');
const employeeRouter = require('./routes/employeeRouter');


// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/employees', employeeRouter);

app.get('/', (req, res) => { 
    res.send(`<h1>Store API</h1><a href="/api/v1/products">Products route</a>`);
});

app.use(notFound);
app.use(apiErrorHandlerMiddleware);


const start = async () => {
    try {
        await connectDb(process.env.MONGO_DB_URI);
        app.listen(
            PORT,
            () => console.log(`It's alive on http://localhost:${PORT}`)
        );
    }
    catch (error) {
        console.error(error);
    }
};

start();