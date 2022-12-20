import { useState, useEffect } from "react";
import { useAppSelector } from '../hooks/useTypedSelector';

export const useLogged = () => {
    const [logged, setLogged] = useState<Boolean | null>(false);
    const { login } = useAppSelector(state => state.login);
    
    useEffect(() => {
        localStorage.getItem("tokenAuth")
            ? setLogged(true) :
            setLogged(login)
    }, [login])

    return logged
}