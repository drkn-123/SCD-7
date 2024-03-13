const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/task');
const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017', {useNewURLParser: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Error'));
database.once('open', function(){
    console.log('Mongo Success')
})

app.listen(port, () => {
    console.log("Listening on port: 3000");
})

app.post('/tasks', async (req, res) => {
    try {
        const { id, priority, category, status } = req.body;
        const task = new Task({
            id,
            priority, 
            category,
            status
        });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/tasks/:id/category', async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;
        const task = await Task.findByIdAndUpdate(id, { category }, { new: true });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/tasks/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(id, { status });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Priority Levels
app.put('/tasks/:id/priority', async (req, res) => {
    try {
        const { id } = req.params;
        const { priority } = req.body;
        const task = await Task.findByIdAndUpdate(id, { priority });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});