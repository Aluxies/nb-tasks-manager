const {Task} = require('./mongoClient');
const TASK_PRIORITIES = require('../constants/taskPriorities');
const TASK_STATUSES = require('../constants/taskStatuses');

// Handles validation error while creating or updating a task
function validationErrorHandler(err) {
    if (err.name === "ValidationError") {
        const fields = [];
        for (const field in err.errors) {
            fields.push(field);
        }
        let fullErrorMessage = "Validation error caught :\n\n";
        fullErrorMessage += fields.map(field => `${field} : ${err.errors[field].message}`).join('\n');
        console.log(fullErrorMessage);
    } else {
        console.log("Unhandled error caught while creating new task :", err)
    }
}

// Allows to create a task in the database
async function createOneTask(title, description) {

    const newTask = new Task({
        title,
        description: description ?? "",
        priority: TASK_PRIORITIES.LOW,
        status: TASK_STATUSES.TODO
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