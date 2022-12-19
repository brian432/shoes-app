import { useEffect } from "react";
import { getProducts, getProductsId } from "../services/productsFetch";
import { ProductsTypes } from "../types/types";
import { useAppDispatch, useAppSelector } from './useTypedSelector';

export const useProducts = (): ProductsTypes[] => {
    const { products } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, []);

    return products
};

export const useProductsId = (id: string): ProductsTypes => {
    const { productId } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProductsId(id))
    }, [id]);

    return productId
};