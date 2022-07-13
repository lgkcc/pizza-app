import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {fetchPizzaById} from "../../redux/slices/itemsSlice";
import {RootState, useAppDispatch} from "../../redux/store";

const FullPizza: React.FC = () => {
    const dispatch = useAppDispatch()
    const {id: currentId} = useParams()
    console.log(typeof currentId)
    useEffect(() => {
        dispatch(fetchPizzaById(currentId || ''))
    }, [currentId, dispatch])
    const {itemById, isLoading} = useSelector((state:RootState) => state.pizzas)
    return (
        <>
            {
                isLoading === 'loading' ?
                    'Загрузка'
                    :
                    isLoading === 'success'
                        ?
                        <div>
                            {
                                itemById &&
                                <>
                                    <img src={itemById.imageUrl} alt='pizza'/>
                                    <span>Название пиццы {itemById.title}</span>
                                </>
                            }
                        </div>
                        : 'Ошибка'
            }
        </>
    );
};

export default FullPizza;



