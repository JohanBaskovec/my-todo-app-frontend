import './App.css'
import TaskList from "./TaskList.tsx";
import type Task from "./Task.ts";

const tasks: Task[] = [{id: 1, name: 'Complete my portfolio',},
    {id: 2, name: 'Apply for jobs',}
];

function App() {
  return (
    <div className="App">
        <TaskList tasks={tasks} />
    </div>
  )
}

export default App
