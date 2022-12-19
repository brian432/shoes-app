import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from './useTypedSelector';
import { loginSwitch } from "../store/features/auth/login";
import { useNavigate } from "react-router-dom";
import { swalFalse } from '../utils/swal'

export const useLogin = () => {
    const { login } = useAppSelector(state => state.login);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const failure: string = 'Usuario y/o contraseña invalida';
    const textFailure: string = 'Por favor, ingrese un usuario y/o contraseña validos';

    useEffect(() => {
        if (login) {
            navigate('/', { replace: true });
        } else if (login === false) {
            dispatch(loginSwitch);
            swalFalse(failure, textFailure);
        }
    }, [login]);
};