import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { useTasks } from '../context/taskContext'
import { type Task } from '../interfaces/taskInterface'

interface TaskEditorProps {
 selectedTask: Task | null;
 onTaskUpdated: (task: Task) => void; // Callback para avisar a Home que salvou
}

export function TaskEditor({ selectedTask, onTaskUpdated }: TaskEditorProps) {
 const { updateTask } = useTasks();
 const [draftTask, setDraftTask] = useState<Task | null>(null);

 // Sempre que a tarefa selecionada mudar (clique na sidebar), atualiza o rascunho
 useEffect(() => {
  if (selectedTask) {
   setDraftTask({ ...selectedTask });
  } else {
   setDraftTask(null);
  }
 }, [selectedTask]);

 if (!selectedTask || !draftTask) {
  return (
   <main className='main content-center items-center flex flex-col p-4'>
    <h2>Select a Task in the sidebar to view it here!</h2>
   </main>
  )
 }

 const hasChanges = JSON.stringify(selectedTask) !== JSON.stringify(draftTask);

 async function handleSaveEdit() {
  if (!draftTask) return;

  await updateTask(draftTask.id, {
   title: draftTask.title,
   content: draftTask.content,
   completed: draftTask.completed
  });

  onTaskUpdated(draftTask);
 }

 return (
  <main className='main content-center items-center flex flex-col p-4'>
   <div className="w-full h-full flex flex-col gap-4">

    <div className="flex items-center gap-4 border-b-2 pb-4 border-gray-300">

     <div
      className={`w-6 h-6 border-2 border-black cursor-pointer flex items-center justify-center ${draftTask.completed ? 'bg-green-200' : 'bg-transparent'}`}
      onClick={() => setDraftTask({ ...draftTask, completed: !draftTask.completed })}
     >
      {draftTask.completed && <Check className="w-4 h-4 text-black" />}
     </div>

     <input
      type="text"
      className="text-2xl font-bold bg-transparent outline-none flex-1"
      value={draftTask.title}
      onChange={(e) => setDraftTask({ ...draftTask, title: e.target.value })}
     />

     {hasChanges && (
      <button onClick={handleSaveEdit} className="bg-transparent! p-1!">
       <div className="bg-green-500 rounded-full p-1 shadow-md hover:scale-110 transition-transform">
        <Check className="text-white w-6 h-6" strokeWidth={3} />
       </div>
      </button>
     )}
    </div>

    <textarea
     className="w-full h-full bg-transparent resize-none outline-none p-2 text-lg"
     value={draftTask.content || ''}
     placeholder="No content..."
     onChange={(e) => setDraftTask({ ...draftTask, content: e.target.value })}
    />
   </div>
  </main>
 )
}
