import {useState} from "react";
import {useCreateTask} from "../hooks/useTasks.js";
import PriorityDropdown from "./PriorityDropdown.jsx";

function TaskFormCell() {
    const createTaskMutation = useCreateTask();
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: "low"
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
            description: "",
            priority: "low"
        });
    }

    return (
        <form className="group flex-col my-2 mx-3 border-1 rounded-xl border-gray-500 hover:border-gray-300 focus-within:border-gray-300" onSubmit={onAddTask}>
            <div className="flex justify-between px-4 py-1 bg-gray-200 rounded-t-xl">
                <input required placeholder="Title" value={newTask.title}
                       onChange={(e) => onTaskChange("title", e.target.value)}
                       className="border border-gray-400 rounded-lg px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 outline-none"
                       type="text"/>
                <div>
                    <PriorityDropdown value={newTask.priority} onChange={(value) => onTaskChange("priority", value)}/>
                    <button type="submit"
                            className="rounded-lg py-1 px-2 bg-gray-400 hover:cursor-pointer hover:bg-gray-500">✚
                    </button>
                </div>
            </div>

            <div className="flex my-1 px-4 rounded-b-xl">
                <textarea placeholder="Description" value={newTask.description} onChange={(e) => onTaskChange("description", e.target.value)} className="h-18 w-full border border-gray-400 rounded-lg px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 outline-none resize-none"/>
            </div>
        </form>
    );
}

export default TaskFormCell;
