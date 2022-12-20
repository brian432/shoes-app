import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsId } from "../../hooks/useProducts";
import './product.css';

import { InfoShoes } from '../../components/infoShoes/infoShoes';
import { StateImg } from "../../types/types";

export const Product: FC = () => {
    const [imgActive, setImgActive] = useState<StateImg>({
        imgPath: "",
        colorShoes: ""
    });

    const { id } = useParams();
    const product = useProductsId(id as string);

    const handleClick = (img: string, color: string) => {
        setImgActive({
            imgPath: img,
            colorShoes: color
        });
    };

    return (
        <div className="container-cards">
            {
                product.img?.map((img, index) =>
                    <div
                        className={`cards ${imgActive.colorShoes? imgActive.colorShoes === product.color[index] ? "cardOn" : "cardOff": ""}`}
                        key={img}
                        style={{
                            background: product.color[index]
                        }}
                        onClick={() => handleClick(img, product.color[index])}
                    >
                        <div className='div-img'>
                            <img src="/images/uno.png" alt={product.title} />
                        </div>
                        <h3>{product.title}</h3>
                    </div>
                )
            }
            {
                imgActive.imgPath &&
                <>
                    <InfoShoes details={product} imgActive={imgActive} />
                    {/*<Carousel />*/}
                </>
            }
        </div>
    )
}
