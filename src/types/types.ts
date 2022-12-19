import * as yup from 'yup'
import { userSchema } from '../utils/yup'

//Types for register
export type UserSchema = yup.InferType<typeof userSchema>;

export type RegisterType = {
    username: string,
    email: string,
    password: string
};

export type RegisterState = {
    loading: boolean,
    register: boolean | null,
    error: string | null | object
};


//types for login

export type LoginType = Omit<RegisterType, "email">;

type User = {
    token: string,
    username: string,
    email: string,
    id: string
}

export type LoginState = {
    loading: boolean,
    login: boolean | null,
    user: User | null,
    error: string | null | object
}


//types for products

export interface ProductsTypes {
    title: string,
    desc: string,
    img: string[],
    size: string[],
    color: string[],
    price: number,
    id: string,
    createdAt: string,
    updatedAt: string,
};

export type ProductsState = {
    loading: boolean,
    products: ProductsTypes[],
    productId: ProductsTypes,
    error: any
}

//types for product state component

export type StateImg = {
    imgPath: string,
    colorShoes: string
}

export interface CardProps {
    details: ProductsTypes,
    imgActive: StateImg
}