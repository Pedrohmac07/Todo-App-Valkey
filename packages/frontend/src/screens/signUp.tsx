import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'sonner';

import { Input } from '../components/Input'

export default function SignUp() {

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const { login } = useAuth();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
   await login(email, password);
  } catch (err: any) {

   const ErrorMessage = err.response?.data?.error || 'Failed to login';
   toast.error(ErrorMessage);
  }
 };

 return (
  <div className='grid grid-cols-1 gap-10'>
   <h2 className='p-10 text-4xl font-bold'>Login</h2>
   <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-10'>
    <Input
     type="email"
     placeholder='Email'
     value={email}
     onChange={e => setEmail(e.target.value)}
    />
    <Input
     type='password'
     placeholder='Password'
     value={password}
     onChange={e => setPassword(e.target.value)}
    />
    <button type='submit' className='text-amber-50'>Sign In</button>
   </form>
  </div>
 )
}
