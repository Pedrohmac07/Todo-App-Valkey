import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { useTasks } from '../context/taskContext'

interface CreateTaskModalProps {
 isOpen: boolean;
 onClose: () => void;
}

export function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
 const { addTask } = useTasks();
 const [newTitle, setNewTitle] = useState('');
 const [newContent, setNewContent] = useState('');
 const [newIsCompleted, setNewIsCompleted] = useState(false);

 async function handleAddNew() {
  if (newTitle.trim() === '') return;

  await addTask(newTitle, newContent);

  setNewTitle('');
  setNewContent('');
  setNewIsCompleted(false);
  onClose();
 }

 if (!isOpen) return null;

 return (
  <div className='z-50 border-2 absolute w-screen h-screen content-center bg-black/60 top-0 left-0 fixed'>
   <div className='z-50 w-2/3 h-2/3 m-auto bg-amber-50 rounded-4xl flex flex-col gap-5 p-4 relative'>

    <button onClick={onClose} className='absolute top-6 right-6 font-bold text-gray-600'>
     <X className="w-8 h-8" />
    </button>

    <h1 className='font-bold p-4 text-center text-xl'>Create Task</h1>

    <input
     type='text'
     placeholder='Task Title'
     value={newTitle}
     onChange={(e) => setNewTitle(e.target.value)}
     className='border-2 border-gray-600 w-2/3 h-10 ml-auto mr-auto pl-2'
    />

    <textarea
     placeholder='Task Content'
     value={newContent}
     onChange={(e) => setNewContent(e.target.value)}
     className='border-2 border-gray-600 w-2/3 h-20 ml-auto mr-auto p-2 resize-none'
    />

    <div className='w-2/3 ml-auto mr-auto flex items-center gap-2'>
     <div
      onClick={() => setNewIsCompleted(!newIsCompleted)}
      className='w-6 h-6 border-2 border-gray-600 cursor-pointer flex items-center justify-center bg-white'
     >
      {newIsCompleted && <Check className="w-4 h-4 text-black" />}
     </div>
     <span className='font-bold'>Is Complete?</span>
    </div>

    <button onClick={handleAddNew} className='w-1/3! m-auto text-amber-50! font-bold! bg-black p-2 rounded'>
     Submit
    </button>
   </div>
  </div>
 )
}
