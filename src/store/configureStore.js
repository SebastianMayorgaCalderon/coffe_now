import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import drinkReducer from './reducers/DrinksReducer'
import userReducer from './reducers/UserReducer'

const rootReducer = combineReducers({
	drinkReducer,
	userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () =>
	createStore(rootReducer, composeEnhancers(applyMiddleware()))

export default configureStore
