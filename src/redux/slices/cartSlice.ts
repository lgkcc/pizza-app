import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type CartItem = {
    id: string
    cartId: string
    title: string
    price: number
    imageUrl: string
    size: number
    type: string
    count: number
}

type ManipulationItem = {
    cartId: string,
    price: number
}

interface CartSliceState {
    totalPrice: number
    items: CartItem[]
}

const initialState:CartSliceState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {


            const findItem = state.items.find(item => item.cartId === action.payload.cartId)
            // findItem.count++
            if (findItem) {
                state.items = state.items.map(item => {
                    if (item.cartId === action.payload.cartId) {
                        return {...item, count: item.count + 1}
                    }
                    return item
                })
            } else {
                state.items.push({
                    ...action.payload
                })
            }
            state.totalPrice += action.payload.price
        },
        removeAllItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        removeItem(state, action:PayloadAction<ManipulationItem>) {
            state.totalPrice -= action.payload.price
            state.items = state.items.filter(item => item.cartId !== action.payload.cartId)
        },
        incrementItem(state, action:PayloadAction<ManipulationItem>) {
            const findItem = state.items.find(item => item.cartId === action.payload.cartId)
            if (findItem) {
                findItem.count++
                state.totalPrice += action.payload.price
            }
        },
        decrementItem(state, action:PayloadAction<ManipulationItem>) {
            const findItem = state.items.find(item => item.cartId === action.payload.cartId)
            if(findItem) {
                if(findItem.count > 1) {
                    findItem.count -= 1
                }else{
                    state.items = state.items.filter(item => item.cartId !== action.payload.cartId)
                }
                state.totalPrice -= action.payload.price
            }
        }
    }
})

export const selectCart = (state:RootState) => state.cart

export const {addItem, removeItem, removeAllItems, incrementItem, decrementItem} = cartSlice.actions

export default cartSlice.reducer
