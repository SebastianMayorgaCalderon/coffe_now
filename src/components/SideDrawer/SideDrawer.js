/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './SideDrawer.scss'

const SideDrawer = ({ show, onLogoutHandler }) => {
	let drawerClasses = 'side-drawer'
	if (show) {
		drawerClasses = 'side-drawer open'
	}
	return (
		<div className={drawerClasses}>
			<img src={logo} alt="coffe now logo" />
			<nav>
				<ul>
					<li className="side-drawer-navigation__item">
						<Link to="/">Drinks</Link>
					</li>
					<li className="side-drawer-navigation__item">
						<Link to="/order">Order</Link>
					</li>
					<div className="spacer" />

					<li
						className="side-drawer-navigation__item bottom"
						onClick={() => onLogoutHandler()}
					>
						<Link to="/">LogOut</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

SideDrawer.propTypes = {
	show: PropTypes.bool,
	onLogoutHandler: PropTypes.any,
}

export default SideDrawer
