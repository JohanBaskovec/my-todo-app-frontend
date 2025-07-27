import './App.css'
import TaskList from "./TaskList.tsx";


function App() {
  return (
    <div className="isolate text-gray-950 ">
        <div className="mx-auto px-3 py-2 sm:px-5 sm:max-w-9/10">
            <TaskList />
        </div>
    </div>
  )
}

export default App
