import {useTasks} from "../hooks/useTasks.js";
import TASK_STATUSES from "../../constants/taskStatuses.js";
import HeaderCell from "./HeaderCell.jsx";
import TaskCell from "./TaskCell.jsx";
import TaskFormCell from "./TaskFormCell.jsx";

const PRIORITY_ORDER = {
    high: 0,
    medium: 1,
    low: 2,
};

function KanbanBoard() {
    const {data: tasks, isLoading, error} = useTasks();

    if (isLoading) return <p>Chargement</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div className="w-11/12 h-screen flex-col">
            <h1 className="text-4xl text-gray-600 font-bold my-8 text-center">Kanban board</h1>
            <div className="flex-col w-full h-3/4 border rounded-md border-gray-200 mb-12">
                <div className="flex h-1/12">
                    {TASK_STATUSES.map((statusEntry, i) => (
                        <div
                            key={"header-col-"+i}
                            className={`min-w-1/4 flex-col flex-1 ${i !== TASK_STATUSES.length - 1 && "border-r border-gray-200"}`}>
                            <HeaderCell name={statusEntry.label}/>
                        </div>
                    ))}
                </div>

                <div className="flex h-11/12">
                    {TASK_STATUSES.map((statusEntry, i) => (
                        <div
                            className={`min-w-1/4 flex-col py-3 flex-1 ${i !== TASK_STATUSES.length - 1 && "border-r border-gray-200"}`} key={"cell-coll-"+i}>
                            {tasks
                                .filter(task => task.status === statusEntry.value)
                                .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
                                .map(task => (
                                    <TaskCell task={task} key={"task-"+task.id}/>
                                ))}
                            {statusEntry.value === "new" && (
                                <TaskFormCell/>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default KanbanBoard;
