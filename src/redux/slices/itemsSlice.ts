import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";


export type FetchPizzasArgs = {
    activePage: number
    caterogyFetch: string
    sortFetch: string
    orderFetch: string
    searchFetch: string
}

type PizzaItem = {
    id: string
    title: string
    price: number[]
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
    category: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface ItemSliceState {
    items: PizzaItem[]
    itemById: PizzaItem | null
    isLoading: Status
}

const initialState: ItemSliceState = {
    items: [],
    itemById: null,
    isLoading: Status.LOADING
}

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async ({activePage, caterogyFetch, sortFetch, orderFetch, searchFetch }:FetchPizzasArgs) => {
        const { data } = await axios.get(`https://628dd5ac368687f3e70a00d0.mockapi.io/items?${caterogyFetch}${sortFetch}${orderFetch}${searchFetch}`)
        return data as PizzaItem[]
    }
)

export const fetchPizzaById = createAsyncThunk('pizzaById/fetchPizzaById', async (id:string) => {
    const { data } = await axios.get(`https://628dd5ac368687f3e70a00d0.mockapi.io/items/${id}`)
    return data as PizzaItem
})


const itemsSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.isLoading = Status.LOADING
            state.items = []
        })

        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = Status.SUCCESS
        })

        builder.addCase(fetchPizza.rejected, (state) => {
            state.isLoading = Status.ERROR
            state.items = []
        })

        builder.addCase(fetchPizzaById.pending, (state) => {
            state.isLoading = Status.LOADING
            state.itemById = null
        })

        builder.addCase(fetchPizzaById.fulfilled, (state, action) => {
            state.itemById = action.payload
            state.isLoading = Status.SUCCESS
        })

        builder.addCase(fetchPizzaById.rejected, (state) => {
            state.isLoading = Status.ERROR
            state.itemById = null
        })
    }
})

export const selectPizzaData = (state:RootState) => state.pizzas
export const selectCountPizza = (id:string) => (state:RootState) => (state.cart.items).filter(item => item.id === id).reduce((acc, current) => acc + current.count, 0)

export default itemsSlice.reducer
