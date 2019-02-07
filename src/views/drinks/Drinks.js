/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { BASE_URL } from '../../constants'
import DrinkListItem from '../../components/DrinkListItem/DrinkListItem'
import Loader from '../../components/loader/loader'
import { addAllDrinks } from '../../store/actions/index'

import './Drinks.scss'
import '../order/Order.scss'

class Drinks extends Component {
	state = {
		loading: false,
		error: false,
	}

	componentDidMount() {
		this.setState({ loading: true })
		Axios.get(`${BASE_URL}/drinks`)
			.then(res => {
				// eslint-disable-next-line react/destructuring-assignment
				this.props.addAllDrinks(res.data)
				this.setState({
					loading: false,
				})
			})
			.catch(err => {
				this.setState({
					error: true,
				})
			})
	}

	toDrinkDetails = id => {
		const { history } = this.props
		history.push(`/${id}`)
	}

	render() {
		const { loading, error } = this.state
		const { drinks } = this.props
		const allDrinks = drinks.map((drink, i) => (
			<div key={i} className="order-item">
				<DrinkListItem
					drink={drink}
					toDrinkDetails={this.toDrinkDetails}
					history={this.props.history}
				/>
			</div>
		))
		return (
			<div className="drink-container__list">
				{!error ? (
					loading ? (
						<Loader />
					) : (
						allDrinks
					)
				) : (
					<h1>No drinks to order yet!</h1>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ drinkReducer }) => ({
	...drinkReducer,
})
const mapDispatchToProps = {
	addAllDrinks,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Drinks)
)
