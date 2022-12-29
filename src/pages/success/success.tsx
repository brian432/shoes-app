import { FC } from "react";
import { Link } from "react-router-dom";
import { useSuccess } from '../../hooks/useSuccess';
import './success.css';

export const Success: FC = () => {
    const orderId = useSuccess();
    return (
        <div className="success-container">
            <div className="order-success">
                <h1>El pedido se ha creado con éxito</h1>
                <h3>Su codigo de pedido es: <strong>{orderId}</strong></h3>
                <p>Puede encontrar todas sus ordenes de compra aqui: <Link to="/orders">Orders</Link></p>
                <p>Muchas gracias por su compra</p>
                <Link to="/" className="button">Continue comprando</Link>
            </div>
        </div>
    )
};