import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


type Order = 'asc' | 'desc'

interface FilterSliceState {
    page: number
    category: number
    sort: number
    order: Order
    search: string
}
export type FiltersUrl = {
    activeCategory?: string
    activeSort?: string
    activeOrder?: Order
    activeSearch?: string
    activePage?: string
}

const initialState:FilterSliceState = {
    page: 1,
    category: 0,
    sort: 0,
    order: 'asc',
    search: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action:PayloadAction<number>) => {
            state.category = action.payload
        },
        setSort: (state, action:PayloadAction<number>) => {
            state.sort = action.payload
        },
        setOrder: (state, action:PayloadAction<Order>) => {
            state.order = action.payload
        },
        setSearch: (state, action:PayloadAction<string>) => {
            state.search = action.payload
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.page = action.payload
        },
        setFilters: (state, action:PayloadAction<FiltersUrl>) => {
            state.category = action.payload.activeCategory ? Number(action.payload.activeCategory) : state.category
            state.sort = action.payload.activeSort ? Number(action.payload.activeSort) : state.sort
            state.order = action.payload.activeOrder ? action.payload.activeOrder : state.order
            state.search = action.payload.activeSearch ? action.payload.activeSearch : state.search
            state.page = action.payload.activePage ? Number(action.payload.activePage) : state.page
        },
        setDefault: (state) => {
            state.category = 0
            state.page = 1
            state.sort = 0
            state.order = 'asc'
            state.search = ''
        }
    },
})

export const selectFilter = (state:RootState) => state.filter

export const {setCategory, setSort, setOrder, setSearch, setPage, setFilters, setDefault} = filterSlice.actions

export default filterSlice.reducer




