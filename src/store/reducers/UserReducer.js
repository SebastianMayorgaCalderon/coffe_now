/* eslint-disable indent */
/* eslint-disable no-case-declarations */

import {
	ADD_ALL_HISTORY_DRINKS,
	ADD_DRINK_TO_HISTORY,
	ADD_DRINK_TO_ORDER,
	LOGIN,
	LOGOUT,
	REMOVE_DRINK_FROM_ORDER,
	UPDATE_DRINK_FROM_ORDER,
} from '../actions/User/UserActionTypes'

const initialState = {
	orderHistory: [],
	order: [],
	userName: null,
	token: null,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			sessionStorage.setItem(
				'loggedUser',
				JSON.stringify({
					username: action.payload.userName,
					token: action.payload.token,
				})
			)
			return {
				...state,
				userName: action.payload.userName,
				token: action.payload.token,
			}
		case LOGOUT:
			sessionStorage.clear()
			return initialState
		case ADD_ALL_HISTORY_DRINKS:
			return { ...state, orderHistory: action.payload }
		case ADD_DRINK_TO_HISTORY:
			return { ...state, orderHistory: [...state.orderHistory, action.payload] }
		case ADD_DRINK_TO_ORDER:
			return { ...state, order: [...state.order, action.payload] }
		case REMOVE_DRINK_FROM_ORDER:
			return {
				...state,
				order: state.order.filter(drink => drink.id !== action.payload),
			}
		case UPDATE_DRINK_FROM_ORDER:
			const newOrder = [...state.order]
			const editedDrink = newOrder.find(drink => drink.id === action.payload.id)
			const indextoChange = newOrder.indexOf(editedDrink)
			newOrder[indextoChange] = action.payload
			newOrder[indextoChange].syrups = [...action.payload.syrups]
			return {
				...state,
				order: newOrder,
			}
		default:
			let userName
			let token
			if (sessionStorage.getItem('loggedUser')) {
				userName = JSON.parse(sessionStorage.getItem('loggedUser')).username
				// eslint-disable-next-line prefer-destructuring
				token = JSON.parse(sessionStorage.getItem('loggedUser')).token
				return {
					...state,
					userName,
					token,
				}
			}
			return {
				...state,
			}
	}
}

export default userReducer
