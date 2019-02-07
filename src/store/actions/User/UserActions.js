import {
	ADD_ALL_HISTORY_DRINKS,
	LOGIN,
	LOGOUT,
	REMOVE_DRINK_FROM_ORDER,
	ADD_DRINK_TO_ORDER,
	ADD_DRINK_TO_HISTORY,
	UPDATE_DRINK_FROM_ORDER,
} from './UserActionTypes'

export const addAllDrinksToHistory = drinks => ({
	type: ADD_ALL_HISTORY_DRINKS,
	payload: drinks,
})
export const login = credentials => ({
	type: LOGIN,
	payload: credentials,
})
export const logout = () => ({
	type: LOGOUT,
})
export const addDrinkToOrder = drink => ({
	type: ADD_DRINK_TO_ORDER,
	payload: drink,
})
export const addDrinkToHistory = drink => ({
	type: ADD_DRINK_TO_HISTORY,
	payload: drink,
})
export const removeDrinkFromOrder = id => ({
	type: REMOVE_DRINK_FROM_ORDER,
	payload: id,
})
export const updateDrinkFromOrder = drink => ({
	type: UPDATE_DRINK_FROM_ORDER,
	payload: drink,
})
