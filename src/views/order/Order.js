/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import QRCode from 'qrcode.react'
import domtoimage from 'dom-to-image'
import {
	selectDrink,
	addAllDrinks,
	addDrinkToOrder,
	removeDrinkFromOrder,
} from '../../store/actions/index'
import Loader from '../../components/loader/loader'
import DrinkListItem from '../../components/DrinkListItem/DrinkListItem'
import Button from '../../components/Button/Button'
import './Order.scss'
import Card from '../../components/Card/Card'

class Order extends Component {
	state = {
		loading: false,
		showQrCode: false,
		width: null,
		height: null,
	}

	componentDidMount() {
		this.updateWindowDimensions()
		window.addEventListener('resize', this.updateWindowDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions)
	}

	getOrderSummary = () => {
		let orderSummary = `Client: ${
			this.props.userName
		} \n ------------------- \n`
		this.props.order.forEach(drink => {
			orderSummary = `${orderSummary} Drink: ${drink.name}\n Syrups: ${
				drink.syrups
			}\n Milk: ${drink.milk}\n ------------------- \n`
		})
		return orderSummary
	}

	downloadImage = () => {
		domtoimage
			.toJpeg(document.getElementById('qrCode'), { quality: 0.95 })
			.then(dataUrl => {
				const link = document.createElement('a')
				link.download = 'order.jpeg'
				link.href = dataUrl
				link.click()
			})
	}

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight })
	}

	getQrCodeSize = () => {
		if (this.state.width <= 450) {
			return 200
		}
		if (this.state.width <= 800) {
			return 400
		}
		if (this.state.width >= 1300) {
			return 750
		}

		return this.state.width / 2
	}

	render() {
		const { loading } = this.state
		const { order } = this.props
		const allDrinks = order.map((drink, i) => (
			<div key={i} className="order-item">
				<DrinkListItem
					drink={drink}
					toDrinkDetails={this.toDrinkDetails}
					history={this.props.history}
					canEdit
				/>
			</div>
		))
		return (
			<div className="order-drinks">
				{order.length !== 0 ? (
					<Button
						text={this.state.showQrCode ? 'Show Order' : 'Generate QR Code'}
						onClick={() =>
							this.setState({ showQrCode: !this.state.showQrCode })
						}
					/>
				) : null}
				<div
					className={`order-drinks__container ${
						this.state.showQrCode ? 'cenet-y' : null
					}`}
				>
					{order.length !== 0 ? (
						loading ? (
							<Loader />
						) : !this.state.showQrCode ? (
							allDrinks
						) : (
							<Card transparent padding>
								<div className="qr-code-container">
									<div id="qrCode">
										<QRCode
											className="qrcode"
											value={this.getOrderSummary()}
											fgColor="#000"
											size={this.getQrCodeSize()}
										/>
									</div>
									<Button
										text="Download as image"
										onClick={() => this.downloadImage()}
									/>
								</div>
							</Card>
						)
					) : (
						<h1>No drinks to order yet!</h1>
					)}
				</div>
			</div>
		)
	}
}
const mapDispatchToProps = {
	selectDrink,
	addAllDrinks,
	addDrinkToOrder,
	removeDrinkFromOrder,
}
const mapStateToProps = ({ drinkReducer, userReducer }) => ({
	...drinkReducer,
	...userReducer,
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Order)
)
