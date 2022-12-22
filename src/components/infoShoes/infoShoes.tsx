import { FC, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createCartCard } from '../../services/cartFetch';
import { useLogged } from "../../hooks/useLogged";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { CardProps } from "../../types/types"
import './infoShoes.css';

export const InfoShoes: FC<CardProps> = ({
    product: {
        title, price, size, id
    },
    imgActive: {
        imgPath,
        colorShoes
    }
}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [sizeSelected, setSizeSelected] = useState<string>("40");
    const logged = useLogged();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleQuantity = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const button: HTMLButtonElement = e.currentTarget;

        if (button.id === "-" && quantity > 1) setQuantity(quantity - 1);
        else if (button.id === "+") setQuantity(quantity + 1);
    };

    const handleCart = () => {
        if (logged) dispatch(createCartCard({ title, price: price * quantity, size: sizeSelected, productId: id, img: imgPath, color: colorShoes, quantity }));
        else navigate('/login')
    };

    const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSizeSelected(e.currentTarget.value)
    };

    return (
        <div className='infoShoes'>
            <h1>{title}</h1>
            <div className='cardShopp'>
                <h2>${price}</h2>
                <div className="quantity">
                    <button
                        className="clickActive"
                        id="-"
                        onClick={handleQuantity}
                        style={{
                            border: `2px solid ${colorShoes}`
                        }}
                    >
                        -
                    </button>
                    <div>{quantity}</div>
                    <button
                        className="clickActive"
                        id="+"
                        onClick={handleQuantity}
                        style={{
                            border: `2px solid ${colorShoes}`
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="buttons">
                    <div
                        className="select-div"
                        style={{
                            border: `2px solid ${colorShoes}`
                        }}
                    >
                        <p>Talles</p>
                        <select onChange={handleSize}>
                            {
                                size?.map(size =>
                                    <option key={`${size}`}>{size}</option>
                                )
                            }
                        </select>
                    </div>
                    <button
                        className="clickActive"
                        style={{
                            background: colorShoes
                        }}
                        onClick={handleCart}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
            <p
                className="data-shoes"
                style={{
                    background: `${colorShoes}`,
                    color: `${colorShoes === "black" ? "white" : "black"}`
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