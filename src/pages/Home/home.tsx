import { useProducts } from '../../hooks/useProducts';
import { Card } from '../../components/card/card';
import './home.css';
import { useLocation } from 'react-router-dom';

export const Home = () => {
    const products = useProducts();
    
    return (
        <div className='home-container'>
            {
                products.map(card => <Card key={card.id} {...card} />)
            }
        </div>
    )
};