import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts, getProductsId } from "../services/productsFetch";
import { ProductsTypes } from "../types/types";
import { useAppDispatch, useAppSelector } from './useTypedSelector';

export const useProducts = (): ProductsTypes[] => {
    const { products } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    const category = useLocation().pathname.split("/")[1];

    useEffect(() => {
        dispatch(getProducts())
    }, []);

    if (category) return products.filter(product => product.category === category);
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