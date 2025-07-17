const { User } = require('./mongoClient');
const { validationErrorHandler } = require('../utils/errorHandlers');

// Allows to create an user in the database
async function createOneUser(name, email) {

    const newUser = new User({
        name,
        email
    });

    try {
        return await newUser.save();
    } catch (err) {
        validationErrorHandler(err);
        return null;
    }
}

// Allows to create an user in the database
async function readAllUsers() {
    return await User.find();
}

// Allows to update an user in the database
async function updateOneUser(userId, dataToUpdate) {
    try {
        return await User.findByIdAndUpdate(userId, dataToUpdate, { new: true, runValidators: true });
    } catch (err) {
        validationErrorHandler(err);
        return null;
    }
}

// Allows to delete an user in the database
async function deleteOneUser(userId) {
    await User.findByIdAndDelete(userId);
}

module.exports = {
    createOneUser,
    readAllUsers,
    updateOneUser,
    deleteOneUser
}