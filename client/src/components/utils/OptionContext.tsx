import React, { ReactNode, createContext, useEffect, useReducer } from 'react'

export enum OptionType {
    NEW_OPTION = "new_Option",
    RESET_OPTION = "reset_Option"
}

interface IAction {
    type: OptionType,
    payload: IState;
}

// this interface is the actual parameters you are holding in state
interface IState {
    category:string,
    keyword:string
}

type IContextType = {
    category: IState["category"],
    keyword: IState["keyword"],
    dispatch:React.Dispatch<IAction>
}

// localStorage.getItem() can return either a string or null.
// JSON.parse() requires a string.
const itemCTG:string | null = (localStorage.getItem("category"));
const itemKeyWord:string | null = (localStorage.getItem("keyword"));

// The initialState's type must be the same as the state's type 
// and return value in the reducer function.
// If it fails then falls back to never.
const INIT_STATE:IState = {
    category: (itemCTG && JSON.parse(itemCTG)) || "All",
    // empty string will lead to error:"JSON.parse XXX data XXX"
    keyword: (itemKeyWord && JSON.parse(itemKeyWord)) || " ",
}

export const OptionContext = createContext<IContextType>
({
    category: INIT_STATE.category,
    keyword: INIT_STATE.keyword,
    dispatch: () => {},
});

const OptionReducer = (state:IState, action:IAction):IState => {
    const {type, payload} = action;

    switch (type) {
        case OptionType.NEW_OPTION:
            return payload;
        case OptionType.RESET_OPTION:
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
export const OptionContextProvider = (props:{children:ReactNode}) => {
    const [state, dispatch] = useReducer(OptionReducer, INIT_STATE);
    useEffect(()=>{ // Update localStorage sync
        localStorage.setItem("category", JSON.stringify(state.category));
        localStorage.setItem("keyword", JSON.stringify(state.keyword));
    },[state])

    return (
        <OptionContext.Provider value=
        {{
            category: state.category,
            keyword: state.keyword,
            dispatch: dispatch
        }}>
            {props.children}
        </OptionContext.Provider>
    )
}