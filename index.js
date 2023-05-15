const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const connectDb = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const apiErrorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

const userRoute = require('./routes/userRouter');

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

// routes
app.use('/api/v1/users', userRoute);

app.use(notFound);
app.use(apiErrorHandlerMiddleware);

app.post('/abc/:id', (req, res) => {
    const { id } = req.params;
    const { alphabet } = req.body;
    if(!alphabet) {
        res.status(418).send({ message: 'We nee an alphabet!' })
    }
    res.status(200).send({
        alphabet: `Your alphabet is '${alphabet}' with an ID of ${id}`,
        
    });
});