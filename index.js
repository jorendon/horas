const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment')

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/time', (req, res) => {
    if (!req.body.time) {
        res.status(400).json("El campo time es requerido")
        return
    }
    if (!req.body.timeZone) {
        res.status(400).json("El campo timeZone es requerido")
        return
    }

    const a = moment(req.body.time, "HH:mm:ss", req.body.timeZone)
        .utc()
        .format("HH:mm:ss");

    const response = {
        "response": {"time": a, "timezone": "UTC"}
    }
    res.status(200).json(response)

});

app.listen(port, () => console.log(`Tuten app listening on port ${port}!`));