import { createStore } from 'redux';

const initState = {
    titleHome: "Welcome to Best Bets",
    account: null,
    chainId: null
}

const Store = (state = initState, action) => {
    if (action.type === 'SET_CHAIN') {
        return {
            ...state,
            chainId: action.id
        };
    }
    if (action.type === 'SET_ACCOUNT') {
        return {
            ...state,
            account: action.address
        };
    }
    return state
};

const store = createStore(Store);

store.subscribe(() => console.log("state updated", store.getState()));

export default store;