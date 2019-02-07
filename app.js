//mongodb+srv://ray42:<PASSWORD>@cluster0-vyafr.mongodb.net/test?retryWrites=true
//password: mvRsDvAjg84B01Wl


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');

mongoose.connect('mongodb+srv://ray42:mvRsDvAjg84B01Wl@cluster0-vyafr.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      time: req.body.time,
      difficulty: req.body.difficulty
    });
    recipe.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
      _id: req.params.id
    }).then(
      (recipe) => {
        res.status(200).json(recipe);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });

  app.put('/api/recipes/:id', (req, res, next) => {
    const recipe = new Recipe({
      _id: req.params.id,
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      time: req.body.time,
      difficulty: req.body.difficulty
    });
    Recipe.updateOne({_id: req.params.id}, recipe).then(
      () => {
        res.status(201).json({
          message: 'Recipe updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.delete('/api/recipes/:id', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.use('/api/recipes', (req, res, next) => {
    Recipe.find().then(
      (recipes) => {
        res.status(200).json(recipes);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

app.use('/api/recipes', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'My first recipe',
        ingredients: 'All the ingredients used',
        instructions: 'fgdsfgdfg',
        time: 4900,
        difficulty: 455,
      },
      {
        _id: 'oeihfzeoi',
        title: 'My second recipe',
        ingredients: 'All the ingredients used',
        instructions: 'fdgsdfgcd',
        time: 4900,
        difficulty: 455,
      },
    ];
    res.status(200).json(stuff);
  });

module.exports = app;