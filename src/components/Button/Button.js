/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const getModifier = type => {
	switch (type) {
	case 'DANGER':
		        return 'button-danger'
	default:
		return null
	}
}
const Button = ({ onClick, text, type, disable }) => (
	<button
		className={`button ${getModifier(type)}  ${disable? 'disabled': 'grow-efect'}`}
		type="button"
		onClick={onClick}
		disabled = {disable}
	>
		{text}
	</button>
)

Button.propTypes = {
	onClick: PropTypes.any,
	text: PropTypes.string,
	type: PropTypes.string,
	disable: PropTypes.bool
}

export default Button
