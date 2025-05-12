import Header from "../../components/Header"

export const AdminHome = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Encabezado */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light tracking-tight mb-4">Panel de Administración</h1>
            <p className="text-xl text-white/80 mb-2">Bienvenido al centro de control</p>
            <p className="text-white/60">Desde aquí puedes gestionar todo el contenido del cine</p>
          </div>

          {/* Tarjetas de opciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta Películas */}
            <div 
              onClick={() => window.location.href = '/admin/movies'}
              className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-200 cursor-pointer backdrop-blur-sm"
            >
              <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-light mb-3 text-center">Películas</h2>
              <p className="text-white/60 text-center">Gestiona el catálogo de películas disponibles</p>
            </div>

            {/* Tarjeta Funciones */}
            <div 
              onClick={() => window.location.href = '/admin/functions'}
              className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-200 cursor-pointer backdrop-blur-sm"
            >
              <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-light mb-3 text-center">Funciones</h2>
              <p className="text-white/60 text-center">Administra las funciones programadas</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-white/10 text-center text-white/40 text-sm">
            Panel de administración - Acceso restringido
          </div>
        </div>
      </div>
    </>
  )
}