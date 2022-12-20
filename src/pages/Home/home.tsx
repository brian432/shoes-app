import { useProducts } from '../../hooks/useProducts';
import { Card } from '../../components/card/card';
import './home.css';

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