import React, { ReactNode, createContext, useEffect, useReducer } from 'react'

export enum CartOption {
    UPDATE_CART = "update_Cart",
    DELETE_ITEM = "delete_Item",
    RESET_CART = "reset_Cart"
}

interface IAction {
    type:CartOption,
    payload:IContextType["cartItems"];
}

// this interface is the actual parameters you are holding in state
interface IState {
    gtin:string;
    name:string;
    photo:string;
    price:number;
    quantity:number;
}

type IContextType = {
    cartItems:IState[],
    dispatch:React.Dispatch<IAction>
}

// localStorage.getItem() can return either a string or null.
// JSON.parse() requires a string.
let cartStorage:string | null = localStorage.getItem("cartItems");

// The initialState's type must be the same as the state's type 
// and return value in the reducer function.
// If it fails then falls back to never.
const INIT_STATE:IState[] = (cartStorage && JSON.parse(cartStorage)) || [];

export const CartContext = createContext<IContextType>
({
    cartItems:INIT_STATE,
    dispatch: () => {},
});

const CartReducer = (state:IState[], action:IAction):IState[] => {
    const {type, payload} = action;
    let [{gtin, name, photo, price, quantity}] = payload;

    switch (type) {
        case CartOption.UPDATE_CART:
            const foundOne:IState | undefined = state.find(item => item.gtin === gtin);
            if (state.length === 0 || !foundOne) {
                state.push({gtin, name, photo, price, quantity});
            } else if (foundOne) {
                foundOne.quantity = quantity;
            }
            localStorage.setItem("cartItems", JSON.stringify(state));
            return state;
        case CartOption.DELETE_ITEM:
            return state.filter(item => item.gtin !== gtin);
        case CartOption.RESET_CART:
            cartStorage = null;
            return INIT_STATE;
        default:
            return state;
    }
}

/**
 * React useContext Hooks
 * 
 * @returns 
 * 
 */
export const CartContextProvider = (props:{children:ReactNode}) => {
    const [state, dispatch] = useReducer(CartReducer, INIT_STATE);
    // This useEffect only work when a item removed from cart
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(state));
    },[state, dispatch]);
    console.log(state);

    return (
        <CartContext.Provider value=
            {{
                cartItems:state,
                dispatch: dispatch
            }}>
            {props.children}
        </CartContext.Provider>
    )
}