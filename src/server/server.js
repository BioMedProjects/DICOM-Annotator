import dbModel from './dbModel.js';

// app config
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 8080;


// middlewares
app.use(express.json());
app.use(cors());


// DB config
const connection_url = 'mongodb+srv://admin:admin@cluster0.aq16p.mongodb.net/dicomDB?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () =>{
  console.log('DB Connected');
});

// api routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.post('/upload', (req, res) => {
  const body = req.body;
  dbModel.create(body, (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    };
  })
}); 

app.get('/sync', (req, res) => {
  dbModel.find((err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    };
  });
});


// listen
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})