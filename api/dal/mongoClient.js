const mongoose= require('mongoose');

// MongoDB connexion url
const DB_URL = process.env.DB_URL;

// Try to connect to the MongoDB database with Mongoose
mongoose.connect(DB_URL)
    .then(() => console.log("Connected to MongoDB with Mongoose"))
    .catch((err) => console.error("Connexion error :", err));

// Creating a schema to represent a task
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['new', 'todo', 'in progress', 'done'],
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    }
});

// Delete __v and transform _id to id in JSON
taskSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        const id = ret._id;
        delete ret._id;
        return {
            ...ret,
            id
        }
    }
});

// Linking the schema to a model
const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task
};