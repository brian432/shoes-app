import { FC } from "react";
import { Navigate } from "react-router-dom";
type Props = {
    children: JSX.Element
}

export const Logged: FC<Props> = ({ children }) => {
    if (localStorage.getItem("tokenAuth")) {
        return <Navigate to="/" replace={true} />
    }
    return children
}