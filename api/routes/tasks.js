const express = require('express');
const router = express.Router();

const {addTask, getTasks, editTask, removeTask} = require("../business/tasks");

/* GET tasks listing */
router.get('/', async (req, res, next) => {
    const businessResponse = await getTasks();
    return res.status(businessResponse.status).json(businessResponse.data);
});

/* POST add a new task */
router.post('/', async (req, res, next) => {
    const {title, description, priority} = req.body;

    if (!title) {
        return res.status(401).send("Missing 'title' in json body");
    }

    const businessResponse = await addTask(title, description, priority);

    if (businessResponse.hasError) {
        return res.status(businessResponse.status).send(businessResponse.message);
    }

    return res.status(businessResponse.status).json(businessResponse.data);
});

/* PUT update a task */
router.put('/:id', async (req, res, next) => {
  const {id} = req.params;
  const {title, description, priority, status} = req.body;

  if (!id) {
    return res.status(401).send("Missing 'id' in params");
  }

  if (!title && !description && !priority && !status) {
    return res.status(401).send("At least one field must be provided. Missing 'title' or 'description' or 'priority' or 'status' in json body");
  }

  const dataToUpdate = {
      title,
      description,
      priority,
      status
  };

  const businessResponse = await editTask(id, dataToUpdate);

  if (businessResponse.hasError) {
      return res.status(businessResponse.status).send(businessResponse.message);
  }

  return res.status(businessResponse.status).json(businessResponse.data);
});

/* DELETE delete a task */
router.delete('/:id', async (req, res, next) => {
  const {id} = req.params;

  if (!id) {
    return res.status(401).send("Missing 'id' in params");
  }

  const businessResponse = await removeTask(id);

  return res.status(businessResponse.status).send(businessResponse.message);
});

module.exports = router;
