/* eslint-disable indent */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import Loader from '../../components/loader/loader'
import {
	selectDrink,
	addAllDrinks,
	addDrinkToOrder,
	removeDrinkFromOrder,
	updateDrinkFromOrder,
} from '../../store/actions/index'
import SyrupList from '../../components/SyrupList/SyrupList'
import Button from '../../components/Button/Button'
import { BASE_URL } from '../../constants'

import './DrinkDetails.scss'
import EditDrinkControls from '../../components/EditDrinkControls/EditDrinkControls'
import Card from '../../components/Card/Card'

class DrinkDetails extends Component {
	constructor(props) {
		super(props)
		this.onAddSyrupHandler = this.onAddSyrupHandler.bind(this)
	}

	componentDidMount() {
		this.getAllDrinks()
	}

	getAllDrinks = () => {
		Axios.get(`${BASE_URL}/drinks`).then(res => {
			this.props.addAllDrinks(res.data)
			const { drinks, match } = this.props
			if (
				this.props.order.find(drinkToFind => drinkToFind.id === match.params.id)
			) {
				const drinkFromOrder = this.props.order.find(
					drinkToFind => drinkToFind.id === match.params.id
				)
				this.setState({ ...drinkFromOrder })
			} else {
				const currentDrink = drinks.find(drink => drink.id === match.params.id)
				this.setState({ ...currentDrink })
			}
		})
	}

	goBackHandler = () => {
		// eslint-disable-next-line react/prop-types
		this.props.history.goBack()
	}

	addToOrder = () => {
		this.props.addDrinkToOrder({ ...this.state })
		this.getAllDrinks()
	}

	removeFromOrder = () => {
		this.props.removeDrinkFromOrder(this.state.id)
		const { drinks, match } = this.props
		const currentDrink = drinks.find(drink => drink.id === match.params.id)
		this.setState({ ...currentDrink })
	}

	onAddSyrupHandler = syrup => {
		const newSyrupAdded = { ...this.state }
		newSyrupAdded.syrups.push(syrup)
		this.props.updateDrinkFromOrder({ ...newSyrupAdded })
	}

	onChangeMilk = milk => {
		const drinkWidthNewMilk = { ...this.state }
		drinkWidthNewMilk.milk = milk
		this.props.updateDrinkFromOrder(drinkWidthNewMilk)
		this.setState({ ...drinkWidthNewMilk })
	}

	onRemoveSyrup = syrup => {
		const drinkWithSyrupRemoved = { ...this.state }
		drinkWithSyrupRemoved.syrups = drinkWithSyrupRemoved.syrups.filter(
			syrupToRemove => syrupToRemove !== syrup
		)
		this.props.updateDrinkFromOrder(drinkWithSyrupRemoved)
		this.setState({ ...drinkWithSyrupRemoved })
	}

	render() {
		const drink = { ...this.state }
		return (
			<div className="drink-details">
				<Card>
					{drink.id ? (
						<div className="drink-details-container">
							<img src={drink.image} alt="Drink" />
							<h2>{drink.name}</h2>
							<p className="description">{drink.description}</p>
							<div className="line-break" />
							<h3>Milk</h3>
							<p>{drink.milk}</p>
							<div className="line-break" />
							{drink.syrups ? (
								<SyrupList
									syrupList={drink.syrups}
									canRemove={this.props.order.find(
										drinkToFind => drinkToFind.id === drink.id
									)}
									onRemoveSyrup={this.onRemoveSyrup}
								/>
							) : null}
							{this.props.order.find(
								drinkToFind => drinkToFind.id === drink.id
							) ? (
								<EditDrinkControls
									usdeMilk={drink.milk}
									usedSyrups={drink.syrups}
									onAddSyrup={this.onAddSyrupHandler}
									onChangeMilk={this.onChangeMilk}
								/>
							) : null}

							<div className="drink-controls">
								<Button
									text="Go back"
									type="DANGER"
									onClick={this.goBackHandler}
								/>

								<Button
									text={
										this.props.order.find(
											drinkToFind => drinkToFind.id === drink.id
										)
											? 'Remove from order'
											: 'Add to order'
									}
									onClick={
										this.props.order.find(
											drinkToFind => drinkToFind.id === drink.id
										)
											? this.removeFromOrder
											: this.addToOrder
									}
								/>
							</div>
						</div>
					) : (
						<Loader />
					)}
				</Card>
			</div>
		)
	}
}

const mapDispatchToProps = {
	selectDrink,
	addAllDrinks,
	addDrinkToOrder,
	removeDrinkFromOrder,
	updateDrinkFromOrder,
}
const mapStateToProps = ({ drinkReducer, userReducer }) => ({
	...drinkReducer,
	order: userReducer.order,
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(DrinkDetails)
)
