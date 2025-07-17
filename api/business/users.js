const {createOneUser, readAllUsers, updateOneUser, deleteOneUser} = require('../dal/userService');

const {isEmailValid} = require("../utils/validators");
const {buildBusinessResponse} = require("../utils/businessResponseBuilder");

async function getUsers() {
    const users = await readAllUsers();
    return buildBusinessResponse(users, 200, "Ok");
}

async function addUser(name, email) {
    if (typeof name !== "string") {
        return buildBusinessResponse(null, 403, "'name' is not of 'string' type", true);
    }

    if (typeof email !== "string") {
        return buildBusinessResponse(null, 403, "'email' is not of 'string' type", true);
    }

    if (!isEmailValid(email)) {
        return buildBusinessResponse(null, 403, "'email' value is not valid", true);
    }

    const createdUser = await createOneUser(name, email);
    if (!createdUser) {
        return buildBusinessResponse(null, 403, "An error occured while creating the user", true);
    }
    return buildBusinessResponse(createdUser, 201, "Ok");
}

async function editUser(userId, dataToUpdate) {

    if (dataToUpdate.name !== undefined && typeof dataToUpdate.name !== "string") {
        return buildBusinessResponse(null, 403, "'name' is not of 'string' type", true);
    }

    if (dataToUpdate.email !== undefined ) {
        if (typeof dataToUpdate.email !== "string") {
            return buildBusinessResponse(null, 403, "'email' is not of 'string' type", true);
        }
        if (!isEmailValid(dataToUpdate.email)) {
            return buildBusinessResponse(null, 403, "'email' value is not valid", true);
        }
    }

    const updatedUser = await updateOneUser(userId, dataToUpdate);

    if (!updatedUser) {
        return buildBusinessResponse(null, 404, "User not found");
    }
    return buildBusinessResponse(updatedUser, 200, "Updated");
}

async function removeUser(userId) {
    await deleteOneUser(userId);
    return buildBusinessResponse(null, 200, "Deleted");
}

module.exports = {
    addUser,
    getUsers,
    editUser,
    removeUser
}