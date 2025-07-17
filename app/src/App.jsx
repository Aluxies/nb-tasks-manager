import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KanbanBoard from "./components/KanbanBoard.jsx";
import TaskForm from "./components/TaskForm.jsx";

const queryClient = new QueryClient();

function App() {
    return (
      <QueryClientProvider client={queryClient}>
          <div className="App flex flex-col w-full h-full justify-center items-center">
              <KanbanBoard/>
              <TaskForm/>
          </div>
      </QueryClientProvider>
    );
}

export default App;
