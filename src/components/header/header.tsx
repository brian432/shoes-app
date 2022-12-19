import { FC, useState } from "react";
import { Link } from "react-router-dom";
import './header.css';

import { Logo } from '../logo/logo';

export const Header: FC = () => {
    const [menu, setMenu] = useState<string>("");

    const handleMenu = (param: string) => {
        if (!param) menu === ""
            ? setMenu("activo")
            : setMenu("")
        else setMenu("")
    };

    return (
        <header>
            <Link to="/" className="headerLeft" onClick={() => handleMenu("desactive")}>
                <Logo />
            </Link>
            <div className="headerRight">
                <div className="auth-header">
                    <section className={menu === "activo" ? "menu-active" : "menu-disable section-auth"}>
                        <Link to="/login" onClick={() => handleMenu("desactive")}>Inciar Sesion</Link>
                        <Link to="/register" onClick={() => handleMenu("desactive")}>Registrarse</Link>
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