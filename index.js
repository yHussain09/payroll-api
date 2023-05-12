const express = require('express');
const app = express();
const PORT = 8080;
const connectDb = require('./db/connect');

require('dotenv').config();

app.use(express.json());

const users = require('./routes/userRouter');

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


app.use('/api/v1/users', users);

app.get('/abc', (req, res) => {
    res.status(200).send({
        alphabet: 'A',
        small: 'a'
    })
});

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