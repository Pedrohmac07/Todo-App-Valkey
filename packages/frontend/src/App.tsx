import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './screens/home'
import Login from './screens/login'
import { Profile } from './screens/profile';

import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoutes from './utils/PublicRoutes'
import { AuthProvider } from './context/authContext';
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster richColors position='top-left' />

        <Routes>
          <Route element={<PublicRoutes />} >
            <Route element={<Login />} path='/login' />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route element={<Home />} path='/' />
            <Route element={<Profile />} path='/profile' />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
