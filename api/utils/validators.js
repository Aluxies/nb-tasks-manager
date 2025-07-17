const isEmail = require('validator/lib/isEmail');
const TASK_PRIORITIES = require("../constants/taskPriorities");
const TASK_STATUSES = require("../constants/taskStatuses");
const priorities = Object.values(TASK_PRIORITIES);
const statuses = Object.values(TASK_STATUSES);

function isTaskPriorityValueValid(taskPriority) {
    return priorities.includes(taskPriority);
}

function isTaskStatusValueValid(taskStatus) {
    return statuses.includes(taskStatus);
}

function isEmailValid(userEmail) {
    return isEmail(userEmail);
}

module.exports = {
    isTaskPriorityValueValid,
    isTaskStatusValueValid,
    isEmailValid
}