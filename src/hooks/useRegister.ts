import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from './useTypedSelector';
import { registerSwitch } from "../store/features/auth/register";
import { useNavigate } from "react-router-dom";
import { swalTrue, swalFalse } from '../utils/swal'

export const useRegister = () => {
    const { register } = useAppSelector(state => state.register);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const success: string = "Usuario creado correctamente";
    const failure: string = "El usuario ya esta en uso";

    useEffect(() => {
        if (register) {
            navigate('/login', { replace: true });
            swalTrue(success);
            dispatch(registerSwitch)
        } else if (register === false) {
            dispatch(registerSwitch);
            swalFalse(failure);
        }
    }, [register]);
};