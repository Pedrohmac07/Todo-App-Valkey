import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './screens/home'
import Login from './screens/login'
import { Profile } from './screens/profile';

import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoutes from './utils/PublicRoutes'
import { Toaster } from 'sonner'

import { AuthProvider } from './context/authContext';
import { TaskProvider } from './context/taskContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>

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
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
