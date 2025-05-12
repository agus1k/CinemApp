import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
   const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si es admin

  const navigate = useNavigate();
  //Verificamos si el user esta autenticado
  const authenticated = localStorage.getItem('authToken') ? true : false; 

    useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const roles = decoded.roles || []; 

        // Verifica si el rol ADMIN está presente
        setIsAdmin(roles.includes("ADMIN")); 
      } catch (e) {
        console.error("Error decoding token", e);
      }
    }
  }, []); 

  //Si esta autenticado lo redirigimos a su perfil, si no lo redirigimos a la pagina de login  
  const handleProfileClick = () => {
    if (authenticated) {
        navigate('/profile'); 
    } else {
        navigate('/login');
    }
  };
  
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-black shadow-md">
      <button className="text-2xl font-semibold tracking-wide text-white select-none cursor-pointer" onClick={() => navigate('/movies')}>
        Cinemapp
      </button>

      <div className="flex gap-4">
        {isAdmin && <button
          onClick={() => navigate('/admin')}
          className="text-sm px-4 py-2 border border-white text-white rounded-full transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
        >
          Admin
        </button>}

        <button
          onClick={handleProfileClick}
          className="text-sm px-4 py-2 border border-white text-white rounded-full transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
        >
          {authenticated ? 'Perfil' : 'Iniciar sesión'}
        </button>
      </div>
    </header>
  );
};

export default Header;
