import { useState } from "react"
import { login } from "../services/UserService"
import { useNavigate } from "react-router-dom"

export const Login = () => {

    //Manejo de estado del formulario
    const [form,setForm] = useState(
            {
                "username":"",
                "password": ""
            }
        )
    
    const [errorMessage,setErrorMessage] = useState('');
        
    const navigate = useNavigate(); //Manejo de rutas

    const [loading,setLoading] = useState(false);
    
    //Handlers para el form
    const handleUsernameChange = (e) => {
        setForm({
            ...form,
            username: e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        setForm({
            ...form,
            password: e.target.value
        })
    }

    //Hanlder para el submit del formulario
    const handleUserLogin = async () => {
        //Manejo de excepciones que vienen del service con try/catch
        try {
            //Comienza la peticion
            setLoading(true)

            const response = await login(form);
            console.log(response);
            setErrorMessage('');

            //Termina
            setLoading(false)
            //Redireccionamos a la pagina principal
            setTimeout(() => {
                navigate("/movies",{replace:true});
            },1000)

        } catch (error) {
            console.error(error);
            if(error.message.includes('usuario o contraseña incorrectos')) {
                setErrorMessage('Usuario o contraseña incorrectos')
            } else {
                setErrorMessage('Ocurrió un error inesperado. Intentálo nuevamente.')
            }
        } finally {
            setLoading(false)
        }
    } 

    //Codigo de la pagina
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-light mb-8 tracking-tight">Iniciar sesión</h1>
    
        <div className="w-full max-w-md bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 p-8">
        <form 
                onSubmit={(e) => {
                e.preventDefault();
                handleUserLogin();
                }}
                className="space-y-6"
            >
            <div>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={form.username}
                onChange={handleUsernameChange}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent placeholder-white/40"
            />
            </div>
            
            <div>
            <input 
                type="password" 
                placeholder="Password" 
                name="password"
                value={form.password}
                onChange={handlePasswordChange}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent placeholder-white/40"
            />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 rounded-md border border-white/20 transition-all cursor-pointer ${loading ? 'bg-white/10 opacity-70' : 'bg-white/5 hover:bg-white/10 hover:border-white/30'}`}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : 'Iniciar sesión'}
        </button>
      </form>

      {errorMessage && (
        <div className="mt-6 p-3 bg-red-900/30 border border-red-700/50 rounded-md text-red-100 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  </div>
);      
}       
