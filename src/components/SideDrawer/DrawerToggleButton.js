import React from 'react'
import PropTypes from 'prop-types'
import './DrawerToggleButton.scss'

const DrawerToggleButton = ({ click }) => (
	<button type="button" className="toggle-button" onClick={click}>
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
	</button>
)

DrawerToggleButton.propTypes = {
	click: PropTypes.any,
}
export default DrawerToggleButton
