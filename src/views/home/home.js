/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import Axios from 'axios'
import Toolbar from '../../components/Toolbar/Toolbar'
import SideDrawer from '../../components/SideDrawer/SideDrawer'
import BackDrop from '../../components/BackDrop/BackDrop'
import Drinks from '../drinks/Drinks'
import './home.css'
import DrinkDetails from '../drinkDetails/DrinkDetails'
import Order from '../order/Order'
import {
	addAllAvaliableMiltTypes,
	addAvaliableSyrups,
	logout,
} from '../../store/actions'

import { BASE_URL } from '../../constants'

class Home extends Component {
	state = {
		sideDrawerOpen: false,
	}

	componentDidMount() {
		const { history, userName } = this.props
		if (!userName) {
			history.replace({
				pathname: '/login',
			})
		} else {
			Axios.get(`${BASE_URL}/avaliableSyrups`).then(res => {
				this.props.addAvaliableSyrups(res.data)
			})
			Axios.get(`${BASE_URL}/avaliableMilks`).then(res => {
				this.props.addAllAvaliableMiltTypes(res.data)
			})
		}
	}

	onLogoutHandler = () => {
		const { history } = this.props
		this.props.logout()
		history.replace({
			pathname: '/login',
		})
	}

	drawerToggleClickHandler = () => {
		this.setState(prevState => ({ sideDrawerOpen: !prevState.sideDrawerOpen }))
	}

	backdropClickHandler = () => {
		this.setState({ sideDrawerOpen: false })
	}

	render() {
		let backdrop
		const { sideDrawerOpen } = this.state
		if (sideDrawerOpen) {
			backdrop = <BackDrop click={this.backdropClickHandler} />
		}
		return (
			<div className="home_contianer">
				<div className="img-background" />
				<Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
				<SideDrawer
					show={sideDrawerOpen}
					onLogoutHandler={this.onLogoutHandler}
				/>
				{backdrop}
				<div className="content-page">
					<Switch>
						<Route path={`${this.props.match.path}`} exact component={Drinks} />
						<Route path={`${this.props.match.path}order`} component={Order} />
						<Route
							path={`${this.props.match.path}:id`}
							component={DrinkDetails}
						/>
					</Switch>
				</div>
			</div>
		)
	}
}
const mapStateToProps = ({ userReducer }) => ({
	userName: userReducer.userName,
	token: userReducer.token,
})

const mapDispatchToProps = {
	addAllAvaliableMiltTypes,
	addAvaliableSyrups,
	logout,
}
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
)
