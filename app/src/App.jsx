import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KanbanBoard from "./components/KanbanBoard.jsx";

const queryClient = new QueryClient();

function App() {
    return (
      <QueryClientProvider client={queryClient}>
          <div className="App flex flex-col w-screen h-screen justify-center items-center">
              <KanbanBoard/>
          </div>
      </QueryClientProvider>
    );
}

export default App;
