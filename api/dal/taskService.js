const {Task} = require('./mongoClient');

// Allows to create a task in the database
async function createOneTask(title, description) {
    const newTask = new Task({
        title,
        description
    });

    try {
        const createdTask = await newTask.save();
        console.log("The task was successfully created !");
        return createdTask;
    } catch (err) {
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
        return null;
    }
}

// Allows to create a task in the database
async function readAllTasks() {
    return await Task.find();
}

async function updateOneTask(taskId, title, description) {
    const data = {
        title,
        description
    };
    const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true, runValidators: true });
    return updatedTask;
}

async function deleteOneTask(taskId) {
    await Task.findByIdAndDelete(taskId);
}

module.exports = {
    createOneTask,
    readAllTasks,
    updateOneTask,
    deleteOneTask
}