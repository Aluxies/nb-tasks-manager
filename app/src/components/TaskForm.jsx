import {useCreateTask} from "../hooks/useTasks.js";
import {useState} from "react";

function TaskForm() {
    const createTaskMutation = useCreateTask();

    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    });

    function onTaskChange(field, value) {
        const updated = {...newTask};
        updated[field] = value;
        setNewTask(updated);
    }

    function onAddTask(e) {
        e.preventDefault();
        createTaskMutation.mutate(newTask);
        setNewTask({
            title: "",
            description: ""
        });
    }

    return (
        <div className="w-1/3 flex-col mt-12">
            <h1 className="text-2xl text-center mb-6">Add a task</h1>
            <form className="Form flex justify-evenly items-center p-6 border-2 rounded-md border-gray-500" onSubmit={onAddTask}>
                <div className="flex-col">
                    <h1 className="text-xl text-center mb-6">Title</h1>
                    <input required placeholder="Title" value={newTask.title} onChange={(e) => onTaskChange("title", e.target.value)} className="border rounded-sm px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 outline-none" type="text"/>
                </div>
                <div className="flex-col">
                    <h1 className="text-xl text-center mb-6">Description</h1>
                    <input placeholder="Description" value={newTask.description} onChange={(e) => onTaskChange("description", e.target.value)} className="border rounded-sm px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 outline-none" type="text"/>
                </div>
                <button type="submit" className="text-xl border rounded-md border-gray-600 h-1/2 py-2 px-4 hover:cursor-pointer hover:bg-gray-600 hover:text-white">Add</button>
            </form>
        </div>
    );
}

export default TaskForm;
