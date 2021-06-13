const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.Task = require('./api/models/taskModel');
const routes = require('./api/routes/taskRoutes');

mongoose.Promise = global.Promise;
mongoose.set('userFindAndModify', false);
mongoose.connect(
    'mongodb://localhost/vue_crud_app',
    { useNewUrlParser: true }
);

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((request, response) => {
    response.status(404).send({ url: `${request.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);