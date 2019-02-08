import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import './Toolbar.scss'
import { connect } from 'react-redux'
import Logo from '../../assets/images/logo_white.png'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import Button from '../Button/Button'
import { logout } from '../../store/actions/index'

const Toolbar = props => (
	<header className="toolbar">
		<nav className="toolbar__navigation">
			<div>
				<DrawerToggleButton click={() => props.drawerClickHandler()} />
			</div>
			<div className="toolbar__logo">
				<a href="/">
					<img src={Logo} alt="coffe now logo" />
				</a>
			</div>
			<div className="spacer" />
			<div className="toolbar__navigation-items">
				<ul>
					<li className="side-drawer-navigation__item">
						<Link to="/">Drinks</Link>
					</li>
					<li className="side-drawer-navigation__item">
						<Link to="/order">Order</Link>
					</li>
					<li>
						<Button
							text="Logout"
							type="DANGER"
							onClick={() => {
								props.logout()
								props.history.push(`/login`)
							}}
						/>
					</li>
				</ul>
			</div>
		</nav>
	</header>
)

Toolbar.propTypes = {
	drawerClickHandler: PropTypes.any,
	logout: PropTypes.any,
	history: PropTypes.any,
}

const mapDispatchToProps = {
	logout,
}

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(Toolbar)
)
