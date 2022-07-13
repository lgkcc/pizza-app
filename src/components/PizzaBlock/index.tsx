import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {addItem, CartItem} from "../../redux/slices/cartSlice";
import {selectCountPizza} from "../../redux/slices/itemsSlice";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";

type PizzaBlockProps = {
    id:string,
    title:string,
    price:number[],
    imageUrl:string,
    sizes:number[],
    types:number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({id, title, price, imageUrl, sizes, types}) => {

    const dispatch = useAppDispatch()

    const [sizePizza, setSizePizza] = useState<number>(0)
    const changeSize = (index:number) => setSizePizza(index)
    const [typePizza, setTypePizza] = useState<number>(0)
    const changeType = (index:number) => setTypePizza(index)
    const typeArr = ['Тонкое', 'Традиционное']
    const handleClickAdd = () => {
        const pizza:CartItem = {
            id,
            cartId: `${id}${sizePizza}${typePizza}`,
            title,
            price: price[sizePizza],
            imageUrl,
            size: sizes[sizePizza],
            type: typeArr[typePizza],
            count: 1
        }
        dispatch(addItem(pizza))
    }

    const addedPizza = useSelector(selectCountPizza(id))

    return (
        <div className="pizza-block">
            <div className="pizza-block__inner">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </Link>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map((type, index) => <li className={index === typePizza ? 'active' : ''} key={type}
                                                           onClick={() => changeType(index)}>{typeArr[type]}</li>)
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map((size, index) => <li className={index === sizePizza ? 'active' : ''} key={size}
                                                           onClick={() => changeSize(index)}>{size} см</li>)
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{price[sizePizza]}₽</div>
                    <button onClick={handleClickAdd} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {
                            !!addedPizza && <i>{addedPizza}</i>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock;
