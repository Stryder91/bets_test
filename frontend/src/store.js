import { createStore } from 'redux';

const initState = {
	titleHome: "Welcome to Best Bets",
	account: null,
	networkId : null,
	chainId: null,
	eventId: 4866,
}

const Store = (state = initState, action) => {
	if (action.type === 'SET_ACCOUNT') {
		return {
			...state,
			account: action.address
		};
	}
	if (action.type === 'SET_NETWORK') {
		return {
			...state,
			networkId: action.id
		};
	}
	if (action.type === 'SET_CHAIN') {
		return {
			...state,
			chainId: action.id
		};
	}
	if (action.type === 'SET_EVENT') {
		return {
			...state,
			eventId: action.id
		};
	}
	return state
};

const store = createStore(Store);

store.subscribe(() => console.log("state updated", store.getState()));

export default store;