import Header from "../../../components/Header";

export const MovieForm = ({form, handleInputChange, handleSubmit, successMessage, errorMessage}) => {
    return (
        <>
        <Header />
            <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
                <form 
                    className="w-full max-w-md space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <h2 className="text-3xl font-light text-center mb-8">
                        {form.id > 0 ? 'Actualizar Película' : 'Crear Nueva Película'}
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <label htmlFor="name" className="inline -top-6 left-4 text-white/70 text-sm">
                                Nombre
                            </label>
                            <input 
                                type="text" 
                                id="name"
                                placeholder="Nombre de la película" 
                                name="name"
                                value={form.name} 
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                onChange={handleInputChange} 
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="genreId" className="inline -top-6 left-4 text-white/70 text-sm">
                                Género
                            </label>
                            <select 
                                id="genreId"
                                name="genreId" 
                                value={form.genreId} 
                                onChange={handleInputChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                            >
                                <option value='0' className="text-black">Selecciona un género</option>
                                <option value='1' className="text-black">Sci-Fi</option>
                                <option value='2' className="text-black">Acción</option>
                                <option value='3' className="text-black">Romance</option>
                                <option value='4' className="text-black">Terror</option>
                                <option value='5' className="text-black">Cyberpunk</option>
                                <option value='6' className="text-black">Comedia</option>
                                <option value='7' className="text-black">Thriller</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label htmlFor="description" className="inline -top-6 left-4 text-white/70 text-sm">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                placeholder="Descripción de la película" 
                                name="description" 
                                value={form.description} 
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all min-h-[100px]"
                                onChange={handleInputChange} 
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="imageUrl" className="inline -top-6 left-4 text-white/70 text-sm">
                                URL de Imagen
                            </label>
                            <input 
                                type="text" 
                                id="imageUrl"
                                placeholder="URL de la imagen de la película"
                                name="imageUrl" 
                                value={form.imageUrl}  
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    >
                        {form.id > 0 ? 'Actualizar' : 'Crear'}
                    </button>

                    {successMessage && (
                        <div className="bg-green-900/30 border border-green-700/50 text-green-100 px-4 py-3 rounded-lg mt-4 text-center">
                            {successMessage}
                        </div>
                    )}
                    
                    {errorMessage && (
                        <div className="bg-red-900/30 border border-red-700/50 text-red-100 px-4 py-3 rounded-lg mt-4 text-center">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}