import { useState } from 'react'
import './home.css'

import { Header } from '../components/Header'
import { TaskSidebar } from '../components/TaskSideBar'
import { TaskEditor } from '../components/TaskEditor'
import { type Task } from '../interfaces/taskInterface'

function Home() {
 const [selectedTask, setSelectedTask] = useState<Task | null>(null);

 return (
  <div className="home-screen w-screen h-screen relative">

   <Header />

   <TaskSidebar
    onSelectTask={setSelectedTask}
   />

   <TaskEditor
    selectedTask={selectedTask}
    onTaskUpdated={(task) => setSelectedTask(task)}
   />
  </div>
 )
}

export default Home
