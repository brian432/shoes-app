import { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { useCarts } from '../../hooks/useCarts';
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { delCartCard, updateCartCard } from "../../services/cartFetch";
import { createStripeCard } from '../../services/stripeFetch';
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useStripe } from '../../hooks/useStripe';
import './cart.css';

export const Cart: FC = () => {
    const { cards, total } = useCarts();
    const dispatch = useAppDispatch();
    useStripe();

    //desplazamiento al elemento totalCart
    const totalCartRef = useRef<HTMLDivElement>(null); //Creamos una referencia al elemento dentro el componente al cual nos vamos a desplazar
    const handleScrollToTotalCart = () => {
        totalCartRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleUpdateCartCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number, price: number, id: string | undefined) => {
        const button: HTMLButtonElement = e.currentTarget;

        if (button.id === "-" && quantity > 1) dispatch(updateCartCard({ quantity: quantity - 1, price: price - price / quantity, id })); //1)
        else if (button.id === "+") dispatch(updateCartCard({ quantity: quantity + 1, price: price + price / quantity, id }));
    };

    const handleDeleteCartCard = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string | undefined) => {
        dispatch(delCartCard(id))
    };

    const handleToken = (token: Token) => {
        dispatch(createStripeCard({ tokenId: token.id, amount: total * 100, cards }))
    };

    return (
        <div className="cart-container">
            <h1>{total >= 1 ? "Tu Carrito" : "Su carrito está vacío"}</h1>
            <div className="buttons">
                <Link to="/" className="clickActive">Continúe comprando</Link    >
                <button className="button-checkout clickActive" onClick={handleScrollToTotalCart}>Termine su compra</button>
            </div>
            <div className="products-cart">
                {
                    cards?.map(({ title, color, size, quantity, price, id, productId }) =>
                        <div className="product" key={id}>
                            <Link to={`/product/${productId}`} className="productWrapper">
                                <div className="div-img">
                                    <img src="images/uno.png" alt="hoola" />
                                </div>
                                <div className="detailsWrapper">
                                    <h3>Product: {title}</h3>
                                    <h3>ID: {id}</h3>
                                    <h3>Color: {color}</h3>
                                    <h3>Talle: {size}</h3>
                                </div>
                            </Link>
                            <div className="price">
                                <span onClick={e => handleDeleteCartCard(e, id)} className="material-symbols-outlined clickActive">
                                    delete
                                </span>
                                <div className="quantity">
                                    <button id="-" className="clickActive" onClick={e => handleUpdateCartCard(e, quantity, price, id)}> - </button>
                                    <div>{quantity}</div>
                                    <button id="+" className="clickActive" onClick={e => handleUpdateCartCard(e, quantity, price, id)}> + </button>
                                </div>
                                <h2>${price}</h2>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="totalCart" ref={totalCartRef}>
                <h1>Resumen del pedido</h1>
                <h3>Subtotal: <span>${total}</span></h3>
                <h3>Envio: <span>$0</span></h3>
                <h3>Descuento: <span>$-0</span></h3>
                <h2><strong>Total:</strong> <span>${total}</span></h2>
                {
                    total >= 1 &&
                    <StripeCheckout
                        stripeKey="pk_test_51MIG3MAQYKqaVMKETFqjPshbszaDUaEysBAqUFtzkqK9IXQwJo85KRtsihOsNcTcJa9sHMOzJIHw1U6VD1VwAuh900HUXtD8iV"
                        token={handleToken}
                        amount={total * 100}
                        billingAddress
                        shippingAddress
                        description={`El total de su compra es ${total}`}
                        currency="USD"
                        ComponentClass="div"
                        label="Realizar pago"
                    />
                }
            </div>
        </div>
    )
}

/*1) La propiedad esperada es quantity, al enviar quantity + 1 la propiedad no es la esperada por eso la renombramos (quantity: quantity - 1). 
    Con el precio hacemos la siguiente ecuacion, si sumamos un producto el precio va a ser el precio actual, 
    mas el precio origianl: a al precio original lo obtenemos de dividir el precio actual por la cantidad de productos actuales

*/