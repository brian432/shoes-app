import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductsTypes } from "../../types/types";
import './card.css';

export const Card: FC<ProductsTypes> = ({
        id,
        title,
        color,
        price
    
}) => {
    return (
        <Link to={`/product/${id}`} className="card-container">
            <div className="div-img">
                <img src='/images/dos.png' alt={title} />
            </div>
            <h4>{title}</h4>
            <div className="colors">
                Colores:
                {color.map((color: string) =>
                    <span
                        key={color}
                        style={{
                            background: color
                        }}
                    />
                )}
            </div>
            <p><strong>${price}</strong></p>
        </Link>
    )
}