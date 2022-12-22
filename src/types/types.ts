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
    category: string,
    img: string[],
    size: string[],
    color: string[],
    price: number,
    inStock: boolean,
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
    product: ProductsTypes,
    imgActive: StateImg
}

//types for cart state

export type ProductCart = {
    title: string
    price: number
    productId: string
    img: string
    color: string
    quantity: number
    size: string
    id?: string
}

export interface CartState {
    loading: boolean
    cards: ProductCart[]
    quantity: number
    total: number
    error: null | string
};

export type PropToUpdateCard = {
    quantity: number
    price: number
    id: string | undefined
}