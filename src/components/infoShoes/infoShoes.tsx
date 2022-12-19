import { FC } from "react"
import { CardProps } from "../../types/types"
import './infoShoes.css';

export const InfoShoes: FC<CardProps> = ({
    details: {
        title, price, size, desc
    },
    imgActive: {
        imgPath,
        colorShoes
    }
}) => {
    return (
        <div className='infoShoes'>
            <h1>{title}</h1>
            <div className='cardShopp'>
                <h2>${price}</h2>
                <div className="buttons">
                    <div
                        className="select-div"
                        style={{
                            border: `2px solid ${colorShoes}`
                        }}
                    >
                        <p>Talles</p>
                        <select>
                            {
                                size?.map(size =>
                                    <option key={`${size}`}>{size}</option>
                                )
                            }
                        </select>
                    </div>
                    <button
                        style={{
                            background: colorShoes
                        }}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
            <p
                className="data-shoes"
                style={{
                    background: `${colorShoes}`,
                    color:`${colorShoes === "black" ? "white":"black"}`
                }}
            >
                "Aca va la descripcion"
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Qui velit dignissimos aliquid nihil consectetur assumenda,
                iure cupiditate libero suscipit quis consequuntur totam re
            </p>
        </div>
    )
}