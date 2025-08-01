import './App.css'
import TaskList from "./TaskList.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="isolate text-gray-950 ">
                <div className="mx-auto px-3 py-2 sm:px-5 sm:max-w-9/10">
                    <TaskList/>
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
