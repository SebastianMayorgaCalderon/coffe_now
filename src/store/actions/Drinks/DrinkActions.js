import {
	ADD_ALL_AVALIABLE_MILK_TYPES,
	ADD_ALL_AVALIABLE_SYRUPS,
	ADD_ALL_DRINKS,
	SELECT_DRINK,
	DESELECT_DRINK,
} from './DrinksActionTypes'

export const addAllAvaliableMiltTypes = milks => ({
	type: ADD_ALL_AVALIABLE_MILK_TYPES,
	payload: milks,
})

export const addAvaliableSyrups = syrups => ({
	type: ADD_ALL_AVALIABLE_SYRUPS,
	payload: syrups,
})
export const addAllDrinks = drinks => ({
	type: ADD_ALL_DRINKS,
	payload: drinks,
})
export const selectDrink = id => ({
	type: SELECT_DRINK,
	payload: id,
})
export const deselectDrink = () => ({
	type: DESELECT_DRINK,
})
