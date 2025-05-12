import { useState, useEffect } from "react";
import { FunctionForm } from "./FunctionForm";
import { createFunction, deleteFunction, getAllFunctions, updateFunction } from "../../../services/FunctionService";
import { FunctionTable } from "./FunctionTable";

const initDataForm = {
    id: null,
    date: "",
    movieId: "",
    auditoriumId:"",
    price:""
}

export const AdminFunctions = () => {

    // ======== HOOKS ==========

    const [form,setForm] = useState(initDataForm)

    const [functions,setFunctions] = useState([]);
    
    const[errorMessage,setErrorMessage] = useState('');
    const[successMessage,setSuccessMessage] = useState('');

    const [functionSelected,setFunctionSelected] = useState({
        id: null,
        date: "",
        movieId: "",
        auditoriumId:"",
        price:""
    });

    useEffect(() => {
        const fetchFunctions = async () => {
            try {
                const response = await getAllFunctions();
                setFunctions(response.data)
            } catch (error) {
               console.error(error);
            }
        }
        fetchFunctions();
    },[])

    useEffect(() => {
        setForm(functionSelected)
    },[functionSelected])

    // ======== HANDLERS ==========

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
    }

    const handleFunctionSelect = (func) => {
        setFunctionSelected({...func});
    }

    const handleSubmit = async () => {
        setErrorMessage('')
        setSuccessMessage('')
        if (form.auditoriumId < 1 || form.auditoriumId > 10) {
            setErrorMessage('El número de sala debe estar entre 1 y 10.')
            return;
        }
        try {
            if (form.id === null) {
                const response = await createFunction({
                    ...form,
                    movieId:parseInt(form.movieId),
                    auditoriumId:parseInt(form.auditoriumId),
                    price:parseInt(form.price)
                });
                setFunctions([...functions,response.data])
                setSuccessMessage('Funcion creada con éxito!')
            } else {
                await updateFunction(form.id,form);
                setFunctions(functions.map(func => {
                    if (form.id === func.id) {
                        return form;
                    } else return func
                }));
                setSuccessMessage('Funcion actualizada con éxito!')
            }
        } catch (error) {
            console.error('Error'+error);
            setErrorMessage('Algo salió mal, intenta nuevamente')
        }
    }

    const handleFunctionDelete = async (id) => {
        setErrorMessage('')
        setSuccessMessage('')
        try {
            deleteFunction(id)
        } catch (error) {
            console.error(error);
            setErrorMessage('Algo salió mal, intenta nuevamente')
        }
        setFunctions(functions.filter(func => func.id !== id))
    }

    // ======== VISTA ========

    return (
        <>
        <Header />
        <FunctionForm form={form} handleInputChange={handleInputChange} handleSubmit={handleSubmit} errorMessage={errorMessage} successMessage={successMessage} />
        <FunctionTable functions={functions} handleFunctionSelect={handleFunctionSelect} handleFunctionDelete={handleFunctionDelete} />

        </>
    );
}