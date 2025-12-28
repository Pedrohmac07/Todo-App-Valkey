import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home'
import Login from './screens/login'
import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoutes from './utils/PublicRoutes'
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position='top-left' />

      <Routes>
        <Route element={<PublicRoutes />} >
          <Route element={<Login />} path='/login' />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path='/' />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
