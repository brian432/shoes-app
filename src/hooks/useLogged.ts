import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { getCartCards } from "../services/cartFetch";

export const useLogged = () => {
    const [logged, setLogged] = useState<Boolean | null>(false);
    const { login } = useAppSelector(state => state.login);
    const dispatch = useAppDispatch();  

    useEffect(() => {
        if (localStorage.getItem("tokenAuth")){
            setLogged(true);
            dispatch(getCartCards()); //para que al iniciar sesion el carrito este cargado con las compras del usuario y no esperar hasta que el usuario vaya al componente carrito
        }else{
            setLogged(login)
        }           
    }, [login])

    return logged
}