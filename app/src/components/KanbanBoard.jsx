import {useDeleteTask, useTasks} from "../hooks/useTasks.js";

function KanbanBoard() {
    const {data: tasks, isLoading, error} = useTasks();
    const deleteTaskMutation = useDeleteTask();

    if (isLoading) return <p>Chargement</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    function onTaskDelete(id) {
        deleteTaskMutation.mutate(id);
    }

    return (
        <div className="w-3/4 flex-col">
            <h1 className="text-2xl text-center mb-6">Task list</h1>
            <div className="border-2 text-center border-gray-600 rounded-xl p-6">
                <div className="flex text-gray-900 pb-2 px-4 mb-6 border-b border-gray-400">
                    <p className="text-xl flex-3">Title</p>
                    <p className="text-xl flex-3">Description</p>
                    <p className="text-xl ml-4 flex-1">Action</p>
                </div>
                {tasks.map(task => (
                    <div className="flex text-gray-800 text-center border border py-2 px-4 my-2 border-gray-300 rounded-2xl hover:bg-gray-100 hover:border-white hover:text-gray-500" key={task.id}>
                        <p className="flex-3">{task.title}</p>
                        <p className="flex-3">{task.description}</p>
                        <button
                            onClick={() => onTaskDelete(task.id)}
                                className="flex-1 ml-4 text-sm border h-6 rounded-md border-gray-600 hover:cursor-pointer hover:bg-gray-600 hover:text-white">Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default KanbanBoard;
