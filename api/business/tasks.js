const {createOneTask, readAllTasks, updateOneTask, deleteOneTask} = require('../dal/taskService');

const TASK_PRIORITIES = require('../constants/taskPriorities');
const TASK_STATUSES = require('../constants/taskStatuses');
const {buildBusinessResponse} = require("../utils/businessResponseBuilder");
const {isTaskPriorityValueValid, isTaskStatusValueValid} = require("../utils/validators");

async function getTasks() {
    const tasks = await readAllTasks();
    return buildBusinessResponse(tasks, 200, "Ok");
}

async function addTask(title, description, priority) {
    if (typeof title !== "string") {
        return buildBusinessResponse(null, 403, "'title' is not of 'string' type", true);
    }

    if (description !== undefined && description !== null && typeof description !== "string") {
        return buildBusinessResponse(null, 403, "'description' is not of 'string' type", true);
    }

    if (priority !== undefined) {

        if (typeof priority !== "string") {
            return buildBusinessResponse(null, 403, "'priority' is not of 'string' type", true);
        }

        const priorities = Object.values(TASK_PRIORITIES);

        if (!isTaskPriorityValueValid(priority)) {
            return buildBusinessResponse(null, 403, `'priority' value is not valid !\n\nExpected values : ${priorities.join(', ')}`, true);
        }
    }

    const createdTask = await createOneTask(title, description, priority);
    if (!createdTask) {
        return buildBusinessResponse(null, 403, "An error occured while creating the task", true);
    }
    return buildBusinessResponse(createdTask, 201, "Ok");
}

async function editTask(taskId, dataToUpdate) {

    if (dataToUpdate.title !== undefined && typeof dataToUpdate.title !== "string") {
        return buildBusinessResponse(null, 403, "'title' is not of 'string' type", true);
    }

    if (dataToUpdate.description !== undefined && typeof dataToUpdate.description !== "string") {
        return buildBusinessResponse(null, 403, "'description' is not of 'string' type", true);
    }

    if (dataToUpdate.priority !== undefined) {
        if (typeof dataToUpdate.priority !== "string") {
            return buildBusinessResponse(null, 403, "'priority' is not of 'string' type", true);
        }

        const priorities = Object.values(TASK_PRIORITIES);

        if (!isTaskPriorityValueValid(dataToUpdate.priority)) {
            return buildBusinessResponse(null, 403, `'priority' value is not valid !\n\nExpected values : ${priorities.join(', ')}`, true);
        }
    }

    if (dataToUpdate.status !== undefined) {
        if (typeof dataToUpdate.status !== "string") {
            return buildBusinessResponse(null, 403, "'status' is not of 'string' type", true);
        }

        const statuses = Object.values(TASK_STATUSES);

        if (!isTaskStatusValueValid(dataToUpdate.status)) {
            return buildBusinessResponse(null, 403, `'status' value is not valid !\n\nExpected values : ${statuses.join(', ')}`, true);
        }
    }

    const updatedTask = await updateOneTask(taskId, dataToUpdate);

    if (!updatedTask) {
        return buildBusinessResponse(null, 404, "Task not found");
    }
    return buildBusinessResponse(updatedTask, 200, "Updated");
}

async function removeTask(taskId) {
    await deleteOneTask(taskId);
    return buildBusinessResponse(null, 200, "Deleted");
}

module.exports = {
    addTask,
    getTasks,
    editTask,
    removeTask
}