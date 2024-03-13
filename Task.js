const mongoose = require('mongoose');

const TaskTable = new mongoose.Schema({
    id: {type: Number, required: true},
    priority: String,
    category: String,
    status: {type: Boolean, required: true}
});

const task = mongoose.model('task', TaskTable);
module.exports = task;