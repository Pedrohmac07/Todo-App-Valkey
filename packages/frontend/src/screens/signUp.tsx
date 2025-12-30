import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'sonner';

import { Input } from '../components/Input'
import { Link } from 'react-router-dom';

export default function signUp() {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const { signUp } = useAuth();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
   await signUp(name, email, password);

   toast.success("Created Account");
  } catch (err: any) {

   const ErrorMessage = err.response?.data?.error || 'Failed to login';
   toast.error(ErrorMessage);
  }
 };

 return (
  <div className='grid grid-cols-1 gap-10'>
   <h2 className='p-10 text-4xl font-bold'>Sign Up</h2>
   <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-10'>
    <Input
     type="text"
     placeholder='Insert UserName'
     value={name}
     onChange={e => setName(e.target.value)}
    />
    <Input
     type="email"
     placeholder='Insert Email'
     value={email}
     onChange={e => setEmail(e.target.value)}
    />
    <Input
     type='password'
     placeholder='Insert Password'
     value={password}
     onChange={e => setPassword(e.target.value)}
    />
    <button type='submit' className='text-amber-50'>Create Account</button>
   </form>
   <p><Link to="/login">Already have an Account? Login.</Link></p>
  </div>
 )
}
