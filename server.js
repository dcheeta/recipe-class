const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const recipeModel = require('./api/recipe.model');
const recipeControllers = require('./api/recipe.controllers');

require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// const dataBaseURL =
//   'mongodb+srv://daniel:dd2345@recipes-3k4ea.mongodb.net/test?retryWrites=true&w=majority';
const dataBaseURL = process.env.DATABASE;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/recipes', recipeControllers.findAll);
app.get('/api/recipes/:id', recipeControllers.findById);
app.post('/api/recipes', recipeControllers.add);
app.put('/api/recipes/:id', recipeControllers.update);
app.delete('/api/recipes/:id', recipeControllers.delete);
app.get('/api/import', recipeControllers.import);
app.get('/api/killall', recipeControllers.killall);
app.post('/api/upload', recipeControllers.upload);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
