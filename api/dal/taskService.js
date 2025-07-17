const {Task} = require('./mongoClient');
const TASK_PRIORITIES = require('../constants/taskPriorities');
const TASK_STATUSES = require('../constants/taskStatuses');
const { validationErrorHandler } = require('../utils/errorHandlers');

// Allows to create a task in the database
async function createOneTask(title, description, priority) {

    const newTask = new Task({
        title,
        description: description ?? "",
        priority: priority ?? TASK_PRIORITIES.LOW,
        status: TASK_STATUSES.NEW
    });

    try {
        return await newTask.save();
    } catch (err) {
        validationErrorHandler(err);
        return null;
    }
}

// Allows to create a task in the database
async function readAllTasks() {
    return await Task.find();
}

// Allows to update a task in the database
async function updateOneTask(taskId, dataToUpdate) {
    try {
        return await Task.findByIdAndUpdate(taskId, dataToUpdate, { new: true, runValidators: true });
    } catch (err) {
        validationErrorHandler(err);
        return null;
    }
}

// Allows to delete a task in the database
async function deleteOneTask(taskId) {
    await Task.findByIdAndDelete(taskId);
}

module.exports = {
    createOneTask,
    readAllTasks,
    updateOneTask,
    deleteOneTask
}