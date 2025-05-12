import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Movies } from './pages/Movies'
import { MovieDetail } from './pages/MovieDetail'
import { Profile } from './pages/Profile'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { FunctionDetail } from './pages/FunctionDetail'
import { Checkout } from './pages/Checkout'
import { AdminHome } from './pages/admin/AdminHome'
import { AdminMovies } from './pages/admin/movies/AdminMovies'
import { AdminFunctions } from './pages/admin/functions/AdminFunctions'
import { Navigate } from 'react-router-dom'
import { PrivateRoute } from './components/routes/PrivateRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />}/>
        <Route path="/movies/:movieId/function/:functionId/checkout" element={<Checkout/>}/>
        <Route path="/movies/:movieId/function/:functionId" element={<FunctionDetail/>}/>  
        <Route path="/movies/:movieId" element={<MovieDetail/>}/>
        <Route path="/profile" element={
          <ProtectedRoute> 
            <Profile />
          </ProtectedRoute>  
        }/>
        <Route path="/admin" element={
          <PrivateRoute rolesAllowed={['ADMIN']}> 
            <AdminHome />
          </PrivateRoute>  
        }/>
         <Route path="/admin/movies" element={
          <PrivateRoute rolesAllowed={['ADMIN']}> 
            <AdminMovies />
          </PrivateRoute>  
        }/>
        <Route path="/admin/functions" element={
          <PrivateRoute rolesAllowed={['ADMIN']}> 
            <AdminFunctions />
          </PrivateRoute>  
        }/>
        <Route path="*" element={<Navigate to="/movies" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
