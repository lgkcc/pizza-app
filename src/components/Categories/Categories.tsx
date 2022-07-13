import React from 'react';
import {useSelector} from "react-redux";
import {setCategory, setSearch} from "../../redux/slices/filterSlice";
import {RootState, useAppDispatch} from "../../redux/store";

type CategoriesProps = {
    categoriesName:string[]
}

const Categories: React.FC<CategoriesProps> = ({categoriesName}) => {
    const activeCategory = useSelector((state:RootState) => state.filter.category)
    const dispatch = useAppDispatch()

    const changeCategory = (index:number) => {
        dispatch(setCategory(index))
        dispatch(setSearch(''))
    }

    return (
        <div className="categories">
            <ul>
                {/*Если список статичный, то в качестве key можно спокойно передавать index*/}
                {
                    categoriesName.map((category:string, index:number) => <li className={activeCategory === index ? 'active' : ''} onClick={() => changeCategory(index)} key={index}>{category}</li>)
                }
            </ul>
        </div>
    )
}

export default Categories;
