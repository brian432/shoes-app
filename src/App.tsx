import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/header/header';
import { Register } from './pages/auth/register';
import { Login } from './pages/auth/login';
import { Home } from './pages/Home/home';
import { Product } from './pages/product/product';
import './index.css';

export const App: FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/product/:id' element={<Product />} />
            </Routes>
        </>

    )
};