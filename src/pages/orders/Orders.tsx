import { FC } from "react";
import { useOrders } from '../../hooks/useOrders';
export const Orders: FC = () => {
    const orders = useOrders();

    return (
        <div>
            Orders!
        </div>
    )
}