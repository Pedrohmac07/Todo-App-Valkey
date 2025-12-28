import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home'
import Login from './screens/login'
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path='/' />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
