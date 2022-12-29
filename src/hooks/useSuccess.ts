import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from './useTypedSelector';
import { useNavigate } from "react-router-dom";
import { createOrderCard } from '../services/orderFetch';
import { delAllCartCards } from "../services/cartFetch";
import { delStripeCard } from "../features/stripeSlice";

export const useSuccess = () => {
    const { data, cards } = useAppSelector(state => state.stripe);
    const { orderId } = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const products = cards?.map(({ title, productId, color, img, size, quantity }) => ({ title, productId, color, img, size, quantity }));
    const productsIds = cards?.map(({ id }) => id);

    useEffect(() => {
        if (products.length) {
            dispatch(delAllCartCards(productsIds)); //Al generarse la orden, eliminamos las cards del carrito en la base de datos. 
            dispatch(delStripeCard()); //Eliminamos las cards del state.stripe para que si el usuario aprieta en el boton del carrito no se vuelva a generar otra orden. Si miramos el useStripe entenderemos mejor este dispatch
            dispatch(createOrderCard({ products, amount: data.amount, address: data.billing_details?.address }));//Creamos la orden en la base de datos
        }
        else navigate('/', { replace: true })
    }, []);
    return orderId
};