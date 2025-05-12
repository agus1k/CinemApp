import { useState } from 'react';
import Header from '../../../components/Header';

export const FunctionTable = ({functions, handleFunctionSelect, handleFunctionDelete}) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [functionToDelete, setFunctionToDelete] = useState(null);
    
    const confirmDelete = (funcId) => {
        setFunctionToDelete(funcId);
        setShowDeleteConfirm(true);
    };
    
    const executeDelete = () => {
        handleFunctionDelete(functionToDelete);
        setShowDeleteConfirm(false);
        setFunctionToDelete(null);
    };
    
    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setFunctionToDelete(null);
    };
    
    return (
        <>
            <Header />
            <div className="bg-black text-white min-h-screen p-6 md:p-10">
                <h2 className="text-3xl font-light mb-8">Funciones</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-4 px-4 text-white/80 font-light">Fecha</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Película</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Sala</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Precio</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {functions.map((func) => (
                                <tr 
                                    key={func.id} 
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <td className="py-4 px-4 text-white/90">{func.date}</td>
                                    <td className="py-4 px-4 text-white/90">{func.movieId}</td>
                                    <td className="py-4 px-4 text-white/70">{func.auditoriumId}</td>
                                    <td className="py-4 px-4 text-white/70">${func.price}</td>
                                    <td className="py-4 px-4 flex space-x-2">
                                        <button 
                                            onClick={() => handleFunctionSelect(func)}
                                            className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded hover:bg-white/20 transition-colors cursor-pointer"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => confirmDelete(func.id)}
                                            className="bg-red-900/30 border border-red-700/50 text-red-100 px-3 py-2 rounded hover:bg-red-800/40 transition-colors cursor-pointer"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {functions.length === 0 && (
                        <div className="text-center text-white/60 italic py-10">
                            No hay funciones registradas
                        </div>
                    )}
                </div>
                
                {/* Modal de confirmación */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-zinc-900 border border-white/10 rounded-lg p-6 max-w-md w-full">
                            <h3 className="text-xl font-light mb-4">Confirmar eliminación</h3>
                            <p className="text-white/80 mb-6">¿Estás seguro que deseas eliminar esta función? Esta acción no se puede deshacer.</p>
                            <div className="flex justify-end space-x-3">
                                <button 
                                    onClick={cancelDelete}
                                    className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={executeDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}