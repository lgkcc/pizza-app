import React, {useEffect, useRef} from 'react';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import Skeleton from "../../components/PizzaBlock/Skeleton";
import PizzaBlock from "../../components/PizzaBlock";
import Pagination from "../../components/Pagination/Pagination";
import {useSelector} from "react-redux";
import {fetchPizza, selectPizzaData} from "../../redux/slices/itemsSlice";
import qs from 'qs';
import {useNavigate} from "react-router-dom";
import {FiltersUrl, selectFilter, setFilters} from "../../redux/slices/filterSlice";
import {useAppDispatch} from "../../redux/store";

const Home: React.FC = () => {

    const {items, isLoading} = useSelector(selectPizzaData)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isFirstLoad = useRef(false)

    const {
        category: activeCategory,
        sort: activeSort,
        order: activeOrder,
        search: activeSearch,
        page: activePage
    } = useSelector(selectFilter)

    const caterogy = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

    const getPizzas = () => {
        const sort = ['rating', 'price', 'title']
        const caterogyFetch = activeCategory > 0 ? `category=${activeCategory}` : ''
        const sortFetch = `&sortBy=${sort[activeSort]}`
        const orderFetch = `&order=${activeOrder}`
        const searchFetch = activeSearch ? `&title=${activeSearch}` : ''

        dispatch(fetchPizza({activePage, searchFetch, sortFetch, caterogyFetch, orderFetch}))
        window.scrollTo(0, 0)

    }

    useEffect(() => {
        if (isFirstLoad.current || !window.location.search) { //ЕСЛИ ПЕРВАЯ ЗАГРУЗКА ПРОШЛА УСПЕШНО ИЛИ ПАРАМЕТР SEARCH В URL пустой
            getPizzas()
        }
    }, [activeSort, activeOrder, activeSearch, activePage, activeCategory])

    useEffect(() => {
        if (isFirstLoad.current) {
            const param = {
                activeSort: activeSort > 0 ? activeSort : null,
                activeOrder: activeOrder === 'asc' ? null : activeOrder,
                activeSearch: activeSearch ? activeSearch : null,
                activePage: activePage === 1 ? null : activePage,
                activeCategory: activeCategory > 0 ? activeCategory : null
            }
            const urlStringify = qs.stringify(param, {skipNulls: true})
            navigate(`/?${urlStringify}`)
        }
    }, [activeSort, activeOrder, activeSearch, activePage, activeCategory])

    useEffect(() => {
        if (window.location.search) {
            const params:FiltersUrl = qs.parse(window.location.search.substring(1))
            dispatch(setFilters(params))
        }
        isFirstLoad.current = true
    }, [])


    const skeleton = [...new Array(8)].map((_, i) => <Skeleton key={i}/>)
    const pizzaItem = items.map(pizza => <PizzaBlock {...pizza} key={pizza.id}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories categoriesName={caterogy}/>
                <Sort/>
            </div>
            <h2 className="content__title">{caterogy[activeCategory]} пиццы</h2>
            <div className="content__items">
                {
                    isLoading === 'loading'
                        ?
                        skeleton
                        :
                        isLoading === 'success'
                            ?
                            pizzaItem
                            :
                            <span>Error</span>
                }
            </div>
            {/*<Pagination/>*/}
        </div>
    )
}
export default Home;


