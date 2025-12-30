import { BookPlus } from 'lucide-react'
import { useTasks } from '../context/taskContext'
import { type Task } from '../interfaces/taskInterface'

interface TaskSidebarProps {
 onSelectTask: (task: Task) => void;
 // onOpenModal foi removido, não precisamos mais dele
}

export function TaskSidebar({ onSelectTask }: TaskSidebarProps) {
 // Pegamos o addTask daqui agora
 const { tasks, addTask } = useTasks();

 async function handleCreateNew() {
  // Cria uma task com título padrão. 
  // O usuário vai clicar nela e mudar o título no editor depois.
  await addTask("Nova Task", "");
 }

 return (
  <section className='left-sidebar border-r-2'>
   <div className='flex w-full border-b-2 justify-between'>
    <p className='mb-auto mt-auto ml-0.5 font-bold'>Your Tasks</p>

    {/* Agora chama o handleCreateNew direto */}
    <button className='bg-transparent!' onClick={handleCreateNew}>
     <BookPlus className='h-7 w-7' />
    </button>
   </div>
   <ol>
    {tasks.map((item) => (
     <li
      key={item.id}
      className='text-black cursor-pointer hover:bg-gray-200 transition-colors p-2 border-b border-gray-100'
      onClick={() => onSelectTask(item)}
     >
      {item.title}
     </li>
    ))}
   </ol>
  </section>
 )
}
