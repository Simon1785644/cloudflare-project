import { ReactNode, createContext, useEffect, useReducer } from "react";

// An enum with all the types of actions to use in reducer
export enum ActionType {
    START_LOGIN = 'start_login',
    LOGIN_SUCCESS = 'login_success',
    LOGIN_FAILURE = 'login_failure',
    LOGIN_OUT = 'logout'
}

interface IAction {
    type: ActionType;
    payload?: unknown | null;
}

// this interface is the actual parameters you are holding in state
interface IState {
    user: any | null,
    loading: boolean,
    error: number | null,
}

type IContextType = {
    user: IState["user"],
    loading: IState["loading"],
    error: IState["error"],
    dispatch:React.Dispatch<IAction>
}

// localStorage.getItem() can return either a string or null.
// JSON.parse() requires a string.
const item:string | null = localStorage.getItem("user");

// The initialState's type must be the same as the state's type 
// and return value in the reducer function.
// If it fails then falls back to never.
const INIT_STATE:IState = {
    user: (item ? JSON.parse(item) : null),
    loading: false,
    error: null
}

export const LoginContext = createContext<IContextType>
    ({
        user: INIT_STATE.user,
        loading: INIT_STATE.loading,
        error: INIT_STATE.error,
        dispatch: () => {},
    });

// Login reducer function that uses a switch statement 
// to handle actions
const LoginReducer = (state:IState, action:IAction):IState => {
    let { type, payload } = action;

    switch (type) {
        case ActionType.START_LOGIN:
            return {
                user: null,
                loading: true,
                error: null
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                user: payload,
                loading: false,
                error: null
            };
        case ActionType.LOGIN_FAILURE:
            let err:number | null = null;
            if (typeof payload == 'number') {
                err = payload;
            }
            return {
                user: null,
                loading: false,
                error: err
            };
        case ActionType.LOGIN_OUT:
            return {
                user: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

// type ReactNode - any props that come into the component
export const LoginContextProvider = (props:{children:ReactNode}) => {
    const [state, dispatch] = useReducer(LoginReducer, INIT_STATE);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user]);

    return (
        <LoginContext.Provider 
            value = {{
                user:state.user, 
                loading:state.loading, 
                error:state.error, 
                dispatch 
            }}>
            {props.children}
        </LoginContext.Provider>
    )
}

