import { useState, useEffect } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { useTasks } from '../context/taskContext'
import { type Task } from '../interfaces/taskInterface'

interface TaskEditorProps {
 selectedTask: Task | null;
 onTaskUpdated: (task: Task | null) => void;
}

export function TaskEditor({ selectedTask, onTaskUpdated }: TaskEditorProps) {
 const { updateTask, removeTask } = useTasks();
 const [draftTask, setDraftTask] = useState<Task | null>(null);

 useEffect(() => {
  if (selectedTask) {
   setDraftTask({ ...selectedTask });
  } else {
   setDraftTask(null);
  }
 }, [selectedTask]);

 useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
   if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    if (draftTask) {
     handleSaveEdit();
    }
   }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => {
   window.removeEventListener('keydown', handleKeyDown);
  };
 }, [draftTask]);

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

 async function handleDelete() {
  if (!draftTask) return;

  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
   await removeTask(draftTask.id);
   onTaskUpdated(null);
  }
 }

 return (
  <main className='main content-center items-center flex flex-col p-4 w-full overflow-hidden'>
   <div className="w-full h-full flex flex-col gap-4">

    <div className="flex items-center gap-4 border-b-2 pb-4 border-gray-300 w-full">

     <div
      className={`w-6 h-6 border-2 border-black cursor-pointer flex items-center justify-center shrink-0 ${draftTask.completed ? 'bg-green-200' : 'bg-transparent'}`}
      onClick={() => setDraftTask({ ...draftTask, completed: !draftTask.completed })}
     >
      {draftTask.completed && <Check className="w-4 h-4 text-black" />}
     </div>

     <input
      type="text"
      className="text-2xl font-bold bg-transparent outline-none flex-1 min-w-0 truncate"
      value={draftTask.title}
      onChange={(e) => setDraftTask({ ...draftTask, title: e.target.value })}
     />

     <div className="flex gap-2 shrink-0">
      {hasChanges && (
       <button
        onClick={handleSaveEdit}
        className="bg-transparent! p-1!"
        title="Save (Ctrl+S)"
       >
        <div className="bg-green-500 rounded-full p-1 shadow-md hover:scale-110 transition-transform">
         <Check className="text-white w-6 h-6" strokeWidth={3} />
        </div>
       </button>
      )}

      <button
       onClick={handleDelete}
       className="bg-transparent! p-1!"
       title="Delete Task"
      >
       <div className="bg-red-500 rounded-full p-1 shadow-md hover:scale-110 transition-transform">
        <Trash2 className="text-white w-6 h-6" strokeWidth={2} />
       </div>
      </button>
     </div>

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
