import {useEffect, useState} from "react";
import {useDeleteTask, useUpdateTask} from "../hooks/useTasks.js";
import PriorityDropdown from "./PriorityDropdown.jsx";
import TASK_STATUSES from "../../constants/taskStatuses.js";
import {findStatusIndex} from "../../utils/findStatusIndex.js";

const priorityClasses = [
    {
        priority: "low",
        class: "text-gray-500"
    },
    {
        priority: "medium",
        class: "font-semibold text-gray-700"
    },
    {
        priority: "high",
        class: "font-bold text-gray-900"
    }
];

function TaskCell({task}) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [status] = useState(task.status);

    const [isUpdated, setIsUpdated] = useState(false);

    const updateTaskMutation = useUpdateTask();
    const deleteTaskMutation = useDeleteTask();

    useEffect(() => {
        if (!isUpdated) setIsUpdated(true);
    }, [title, description, priority, status]);

    function toggleEditing() {
        setIsEditing(prev => !prev);
    }

    function editTask() {
        const data = {
            id: task.id,
            title,
            description,
            priority
        };

        setIsEditing(false);

        if (!isUpdated) return;

        updateTaskMutation.mutate(data);
        setIsUpdated(false);
    }

    function onTaskDelete() {
        deleteTaskMutation.mutate(task.id);
    }

    function onTitleChange(newTitle) {
        setTitle(newTitle);
    }

    function onDescriptionChange(newDescription) {
        setDescription(newDescription);
    }

    function onPriorityChange(newPriority) {
        setPriority(newPriority);
    }

    function onMoveLeft() {
        const leftStatus = TASK_STATUSES[findStatusIndex(task.status) - 1].value;
        const data = {
            id: task.id,
            status: leftStatus
        };
        updateTaskMutation.mutate(data);
    }

    function onMoveRight() {
        const rightStatus = TASK_STATUSES[findStatusIndex(task.status) + 1].value;
        const data = {
            id: task.id,
            status: rightStatus
        };
        updateTaskMutation.mutate(data);
    }

    return (
        <div className="flex-col my-2 mx-3 border-1 rounded-xl border-gray-500 hover:border-gray-300">
            <div className="flex justify-between px-4 py-1 bg-gray-200 rounded-t-xl">
                {isEditing ? (
                    <input placeholder="Title" value={title}
                           onChange={(e) => onTitleChange(e.target.value)}
                           className="flex-4 border border-gray-400 rounded-lg px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 outline-none"
                           type="text"/>
                ) : (
                    <p className="flex-4 text-lg font-semibold text-gray-700">{task.title}</p>
                )}
                <div className="ml-2 flex flex-2 items-center justify-between">
                    {!isEditing && (
                        <p className={`text-md ${priorityClasses.find(priorityClass => priorityClass.priority === task.priority).class}`}>{task.priority}</p>
                    )}
                    {isEditing ? (
                        <>
                            <PriorityDropdown value={priority} onChange={onPriorityChange}/>
                            <button onClick={editTask}
                                    className="rounded-lg p-1 bg-gray-400 hover:cursor-pointer hover:bg-gray-500">✅
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={toggleEditing}
                                    className="rounded-lg p-1 bg-gray-500 hover:cursor-pointer hover:bg-gray-400">✏️
                            </button>
                            <button onClick={onTaskDelete} className="rounded-lg p-1 bg-gray-700 hover:cursor-pointer hover:bg-gray-600">🗑️
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex my-1 px-4">
                {isEditing ? (
                    <textarea placeholder="Description" value={description} onChange={(e) => onDescriptionChange(e.target.value)} className="h-18 w-full border border-gray-400 rounded-lg px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 outline-none resize-none"/>
                ) : (
                    <p className="text-md text-gray-500">{task.description ? task.description : "No description"}</p>
                )}
            </div>

            <div className="flex justify-between gap-2 mt-3 px-4 pb-2">
                {task.status !== 'new' ? (
                    <button onClick={() => onMoveLeft(task)}
                            className="rounded-lg p-1 bg-gray-700 hover:cursor-pointer hover:bg-gray-600">⬅️
                    </button>
                ) : (
                    <div></div>
                )}
            {task.status !== 'done' ? (
                <button onClick={() => onMoveRight(task)}
                        className="rounded-lg p-1 bg-gray-700 hover:cursor-pointer hover:bg-gray-600">➡️
                </button>
            ) : (
                <div></div>
            )}
        </div>
</div>
)
    ;
}

export default TaskCell;
