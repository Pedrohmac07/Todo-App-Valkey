import { useAuth } from "../context/authContext";
import { toast } from "sonner";
import { HomeIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function Profile() {
 const { user, logout, deleteAccount } = useAuth();

 const navigate = useNavigate();

 const handleLogout = async () => {
  await logout();
  toast.success("Success on Logout")
 };

 const handleDelete = async () => {
  const confirm = window.confirm("Are you sure? This action cannot be reverted.");

  if (confirm) {
   try {
    await deleteAccount();
    toast.success("Account deleted with success");
   } catch (error) {
    toast.error("Delete account error");
   }
  }
 };

 const handleHomeButton = () => {
  navigate("/")
 }

 if (!user) return null;

 return (
  <div className="w-screen h-screen">
   <div className="w-full p-2 border-b-2 mb-3.5 flex" >
    <button className="bg-transparent! p-0!" onClick={handleHomeButton}>
     <HomeIcon className="w-10 h-10" strokeWidth={1.5} />
    </button>
    <h2 className="text-2xl m-auto font-bold">Your Profile Page</h2>
   </div>
   <div className="flex flex-col gap-10">
    <div className="m-auto">
     <div className="w-46 h-46 bg-gray-400 rounded-full flex items-center justify-center text-4xl font-bold text-white">
      <h1 >{user.name.charAt(0).toUpperCase()}</h1>
     </div>
    </div>

    <div className="grid justify-center content-center">
     <h2 className="text-2xl">{user.name}</h2>
     <p>{user.email}</p>
    </div>

    <div className="grid col-end-2 gap-1" >
     <button className="text-white w-2/3 m-auto" onClick={handleLogout}>Logout</button>
     <button className="text-red-600 w-2/3 m-auto" onClick={handleDelete}>Delete Account</button>
    </div>
   </div>
  </div>
 );
}
