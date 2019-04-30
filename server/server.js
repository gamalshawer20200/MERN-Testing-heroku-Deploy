var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
// var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log(req.body);
    var todoObj = new Todo({
        text: req.body.text,
        completed: true,
        completedAt: new Date().toLocaleString()
    })

    todoObj.save().then((doc) => {
        // console.log('Saved to Mongo', docs)
        res.send(doc);
    }, (err) => {
        // console.log('Unable to save !')
        res.status(400).send(err)
    })

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e)
    })
})


app.listen(3000, () => {
    console.log('Started on port 3000')
});

module.exports = {
    app
};