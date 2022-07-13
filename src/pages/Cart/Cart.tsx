import React from 'react';
import {useSelector} from "react-redux";
import EmptyCart from "../../components/carts/EmptyCart";
import NotEmptyCart from "../../components/carts/NotEmptyCart";
import {selectCart} from "../../redux/slices/cartSlice";

const Cart: React.FC = () => {

    const {items} = useSelector(selectCart)
    const countItems = items.reduce((acc:number, current:{count:number}) => acc + current.count, 0)
    return (
        <div className="container container--cart">
            {
                countItems
                    ?
                    <NotEmptyCart countItems={countItems} />
                    :
                    <EmptyCart/>
            }
        </div>

    );
};

export default Cart;
