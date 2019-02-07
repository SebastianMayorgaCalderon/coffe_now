/* eslint-disable indent */
import {
	ADD_ALL_AVALIABLE_MILK_TYPES,
	ADD_ALL_AVALIABLE_SYRUPS,
	ADD_ALL_DRINKS,
	SELECT_DRINK,
	DESELECT_DRINK,
} from '../actions/Drinks/DrinksActionTypes'

const initialState = {
	drinks: [],
	avaliableSyrups: [],
	avaliableMilkTypes: [],
	selectedDrink: null,
}

const drinkReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ALL_AVALIABLE_MILK_TYPES:
			return {
				...state,
				avaliableMilkTypes: action.payload,
			}
		case ADD_ALL_AVALIABLE_SYRUPS:
			return {
				...state,
				avaliableSyrups: [...action.payload],
			}
		case ADD_ALL_DRINKS:
			return {
				...state,
				drinks: action.payload,
			}
		case SELECT_DRINK:
			return {
				...state,
				selectedDrink: state.drinks.find(drink => drink.id === action.payload),
			}
		case DESELECT_DRINK:
			return {
				...state,
				selectedDrink: null,
			}
		default:
			return state
	}
}

export default drinkReducer
