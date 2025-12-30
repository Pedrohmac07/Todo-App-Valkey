import { useState } from 'react'
import './home.css'

import { Header } from '../components/Header'
import { TaskSidebar } from '../components/TaskSideBar'
import { TaskEditor } from '../components/TaskEditor'
import { CreateTaskModal } from '../components/CreateTaskModal'
import { type Task } from '../interfaces/taskInterface'

function Home() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedTask, setSelectedTask] = useState<Task | null>(null);

 return (
  <div className="home-screen w-screen h-screen relative">

   <Header />

   <TaskSidebar
    onSelectTask={setSelectedTask}
    onOpenModal={() => setIsModalOpen(true)}
   />

   <TaskEditor
    selectedTask={selectedTask}
    onTaskUpdated={(task) => setSelectedTask(task)}
   />

   <CreateTaskModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
   />

  </div>
 )
}

export default Home
