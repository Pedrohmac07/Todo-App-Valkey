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

   {/* Sidebar controla a seleção e abre o modal */}
   <TaskSidebar
    onSelectTask={setSelectedTask}
    onOpenModal={() => setIsModalOpen(true)}
   />

   {/* Editor recebe a tarefa selecionada */}
   <TaskEditor
    selectedTask={selectedTask}
    onTaskUpdated={setSelectedTask} // Atualiza o "original" ao salvar
   />

   {/* Modal fica "flutuando" condicionalmente */}
   <CreateTaskModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
   />

  </div>
 )
}

export default Home
