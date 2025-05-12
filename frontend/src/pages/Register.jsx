import { useState } from "react"
import { register } from "../services/UserService"
import { useNavigate } from "react-router-dom"

export const Register = () => {

    //Estado para manejar el formulario
    const [form,setForm] = useState(
        {
            "username":"",
            "email":"",
            "password": ""
        }
    )

    //Estados que manejan errores
    const [successMessage,setSuccessMessage] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    //Estado para redireccionar
    const navigate = useNavigate();

    //Handlers para el formulario

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    //Handler para el submit del formulario
    const handleUserRegister = async () => {

        //Validaciones para la entrada del usuario
        if(!form.username||!form.password) {
            setErrorMessage("Por favor, completa ambos campos.");
            return;
        }
        if(form.password.length < 8 || form.password.length > 16) {
            setErrorMessage("La contrasena debe tener entre 8 y 16 caracteres")
            return;
        }
        if(form.username.length < 4 || form.username.length > 10) {
            setErrorMessage("El usuario debe tener entre 4 y 10 caracteres")
            return;
        }

        //Try/Catch para capturar las excepciones que vienen del response (del service)
        try {
            //Llamamos al servicio de registro, pasandole el form (con los datos actuales) como parametro
            const response = await register(form);
            console.log(response);

            //Si la respuesta es correcta, mostramos un mensaje de exito y redireccionamos al login
            setSuccessMessage("Te registraste correctamente!")
            setErrorMessage("")
            
            //Redireccionamos al login
            setTimeout(() => {
                navigate("/login",{replace:true});
            },1000)

        } catch (error) {
            setSuccessMessage("")
            console.log(form.email)
            if (error.message.includes("Ingrese otro nombre de usuario")) {
                setErrorMessage("El nombre de usuario ya existe.")
            } else if (error.message.includes("Ya hay un usuario con ese mail")) {
                setErrorMessage("El mail ya se encuentra registrado, utilice otro o inicie sesión.")
            }
             else if (error.message.includes("La contrasena debe tener")) {
                setErrorMessage("La contasena debe tener entre 8 y 16 caracteres")
            }
             else {
                setErrorMessage("Hubo un error al registrarte, por favor intentalo nuevamente.")
            }
 
            console.error(error);
        }
        
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm p-8 shadow-2xl">
            {/* Título cambiado a "Registrarse" */}
            <h1 className="text-3xl font-light mb-6 text-center tracking-tight">Registrarse</h1>
            
            {/* Formulario */}
            <form 
                onSubmit={(e) => {
                e.preventDefault();
                handleUserRegister();
                }}
                className="space-y-4"
            >
                {/* Campos del formulario (se mantienen igual) */}
                <div>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/40"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                />
                </div>
                
                <div>
                <input
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/40"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                />
                </div>
                
                <div>
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/40"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                />
                </div>
                
                <button 
                type="submit" 
                className="w-full py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 mt-6"
                >
                Registrarse
                </button>
            </form>

            {/* Mensajes de estado */}
            {successMessage && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-700/50 rounded-lg text-green-100 text-sm text-center">
                {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-100 text-sm text-center">
                {errorMessage}
                </div>
            )}

            {/* Nuevo botón "¿Ya tienes cuenta?" */}
            <div className="mt-6 text-center">
                <button 
                onClick={() => navigate('/login')} // Asume que tienes acceso a navigate
                className="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                ¿Ya tienes una cuenta? <span className="underline">Inicia sesión</span>
                </button>
            </div>
            </div>
        </div>
    );
}