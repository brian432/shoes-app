import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useLogged } from '../../hooks/useLogged';
import './header.css';
import { Logo } from '../logo/logo';
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { loginSwitch } from "../../features/auth/loginSlice";

export const Header: FC = () => {
    const [menu, setMenu] = useState<string>("");
    const logged = useLogged();

    const dispatch = useAppDispatch();
    const { quantity } = useAppSelector(state => state.cart);

    const handleMenu = (param: string) => {
        if (!param) menu === ""
            ? setMenu("activo")
            : setMenu("")
        else setMenu("")
    };

    const handleLogout = () => {
        dispatch(loginSwitch);
    };

    return (
        <header>
            <Link to="/" className="headerLeft" onClick={() => handleMenu("desactive")}>
                <Logo />
            </Link>
            <div className="headerCenter">
                <Link to="/men">Hombre</Link>
                <Link to="/women">Mujer</Link>
            </div>
            <div className="headerRight">
                <div className="auth-header">
                    <section className={menu === "activo" ? "menu-active" : "menu-disable section-auth"}>
                        <Link to="/men" className="movilLink" onClick={() => handleMenu("desactive")}>Hombre</Link>
                        <Link to="/women" className="movilLink" onClick={() => handleMenu("desactive")}>Mujer</Link>
                        {
                            !logged
                                ? <>
                                    <Link to="/login" onClick={() => handleMenu("desactive")}>Inciar Sesión</Link>
                                    <Link to="/register" onClick={() => handleMenu("desactive")}>Registrarse</Link>
                                </>
                                : <>
                                    <Link to="/fav" className="icons">
                                        <span className="material-symbols-outlined">
                                            favorite
                                        </span>
                                    </Link>
                                    <Link to={logged ? "/cart" : "/login"} className="icons">
                                        <span className="material-symbols-outlined">
                                            shopping_cart
                                        </span>
                                        {quantity > 0 && <span className="quantity">{quantity}</span>}

                                    </Link>
                                    <Link to="/" onClick={handleLogout}>Cerrar Sesión</Link>
                                </>

                        }
                    </section>
                    <div id="hamburguesa" onClick={() => handleMenu("")}>
                        <div className={menu === "" ? "" : "linea1"}></div>
                        <div className={menu === "" ? "" : "linea2"}></div>
                        <div className={menu === "" ? "" : "linea3"}></div>
                    </div>
                </div>
            </div>

        </header>
    )
}