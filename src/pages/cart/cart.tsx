import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedSelector";
import './cart.css';

export const Cart: FC = () => {
    const { products, total } = useAppSelector(state => state.cart);

    return (
        <div className="cart-container">
            <h1>Tu Carrito</h1>
            <div className="buttons">
                <Link to="/">Continúe comprando</Link    >
                <Link to="/" className="checkout">Termine su compra</Link >
            </div>
            <div className="products-cart">
                {
                    products.map(({ title, id, color, size, price, quantity, category }) =>
                        <div className="product">
                            <div className="productWrapper">
                                <div className="div-img">
                                    <img src="images/uno.png" alt="hoola" />
                                </div>
                                <div className="detailsWrapper">
                                    <h3>Product: {title}</h3>
                                    <h3>Cat: {category}</h3>
                                    <h3>Color: {color}</h3>
                                    <h3>Size: {size}</h3>
                                </div>
                            </div>
                            <div className="price">
                                <div className="quantity">
                                    <button id="-"> - </button>
                                    <div>{quantity}</div>
                                    <button id="+"> + </button>
                                </div>
                                <h2>${price}</h2>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="totalCart">
                <h1>Resumen del pedido</h1>
                <h3>Subtotal: <span>${total}</span></h3>
                <h3>Envio: <span>$0</span></h3>
                <h3>Descuento: <span>$-0</span></h3>
                <h2><strong>Total:</strong> <span>${total}</span></h2>
                <Link to="/">Termine su compra</Link >
            </div>
        </div>
    )
}