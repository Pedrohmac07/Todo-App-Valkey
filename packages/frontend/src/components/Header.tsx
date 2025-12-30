import { UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Header() {
 const navigate = useNavigate()

 return (
  <header className="header w-full p-2 border-b-2 flex">
   <button className="bg-transparent! p-2!" onClick={() => navigate('/profile')}>
    <UserRound className="w-10 h-10" strokeWidth={1.5} />
   </button>
   <h2 className="text-2xl m-auto font-bold">Your Home Page</h2>
  </header>
 )
}
