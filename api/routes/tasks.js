const express = require('express');
const router = express.Router();

const {createOneTask, readAllTasks, updateOneTask, deleteOneTask} = require('../dal/taskService');

/* GET tasks listing */
router.get('/', async (req, res, next) => {
    const tasks = await readAllTasks();
    return res.json(tasks);
});

/* POST add a new task */
router.post('/', async (req, res, next) => {
    const {title, description} = req.body;

    if (!title) {
        return res.status(401).send("Missing 'title' in json body");
    }

    const createdTask = await createOneTask(title, description);
    if (!createdTask) {
      return res.status(401).send("An error occured while creating the task");
    }

    return res.status(201).json(createdTask);
});

/* PUT update a task */
router.put('/:id', async (req, res, next) => {
  const {id} = req.params;
  const {title, description} = req.body;

  if (!id) {
    return res.status(401).send("Missing 'id' in params");
  }

  if (!title || !description) {
    return res.status(401).send("Missing 'title' or 'description' in json body");
  }

  const updatedTask = await updateOneTask(id, title, description);
  if (!updatedTask) {
    return res.status(404).send("Task not found");
  }

  return res.status(200).json(updatedTask);
});

/* DELETE delete a task */
router.delete('/:id', async (req, res, next) => {
  const {id} = req.params;

  if (!id) {
    return res.status(401).send("Missing 'id' in params");
  }

  await deleteOneTask(id);

  return res.status(200).send();
});

module.exports = router;
