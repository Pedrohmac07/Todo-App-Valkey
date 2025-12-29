import { UserRound, Logs } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './home.css'

function Home() {

 const navigate = useNavigate()

 const handleProfileButton = () => {
  navigate('/profile')
 }

 return (
  <div className="home-screen w-screen h-screen">
   <header className="header w-full p-2 border-b-2 flex" >
    <button className='bg-transparent! p-2! border-2! border-gray-600!'>
     <Logs className='w-10 h-10' strokeWidth={1.5} />
    </button>
    <h2 className="text-2xl m-auto font-bold">Your Profile Page</h2>
    <button className="bg-transparent! p-2!" onClick={handleProfileButton}>
     <UserRound className="w-10 h-10" strokeWidth={1.5} />
    </button>
   </header>

   <section className='left-sidebar border-r-2 '>
    <ol>
     <li>Teste</li>
    </ol>
   </section>

   <main className='main content-center items-center'>
    <h2>Select a Task in the sidebar to view it here!</h2>
   </main>
  </div>
 )
}

export default Home
