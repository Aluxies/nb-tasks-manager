const express = require('express');
const router = express.Router();
const {getUsers, addUser, editUser, removeUser} = require('../business/users');

/* GET users listing */
router.get('/', async (req, res, next) => {
    const businessResponse = await getUsers();
    return res.status(businessResponse.status).json(businessResponse.data);
});

/* POST add a new user */
router.post('/', async (req, res, next) => {
    const {name, email} = req.body;

    if (!name) {
        return res.status(401).send("Missing 'name' in json body");
    }

    if (!email) {
        return res.status(401).send("Missing 'email' in json body");
    }

    const businessResponse = await addUser(name, email);

    if (businessResponse.hasError) {
        return res.status(businessResponse.status).send(businessResponse.message);
    }

    return res.status(businessResponse.status).json(businessResponse.data);
});

/* PUT update an user */
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {name, email} = req.body;

    if (!id) {
        return res.status(401).send("Missing 'id' in params");
    }

    if (!name && !email) {
        return res.status(401).send("At least one field must be provided. Missing 'name' or 'email' in json body");
    }

    const dataToUpdate = {
        name,
        email
    };

    const businessResponse = await editUser(id, dataToUpdate);

    if (businessResponse.hasError) {
        return res.status(businessResponse.status).send(businessResponse.message);
    }

    return res.status(businessResponse.status).json(businessResponse.data);
});

/* DELETE delete an user */
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;

    if (!id) {
        return res.status(401).send("Missing 'id' in params");
    }

    const businessResponse = await removeUser(id);

    return res.status(businessResponse.status).send(businessResponse.message);
});

module.exports = router;
