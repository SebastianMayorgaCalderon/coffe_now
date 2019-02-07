import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

const Card = ({ children, white, padding, transparent }) => (
	<div
		className={`card ${white ? 'white' : null} ${padding ? 'padding' : null} ${
			!transparent ? 'no-transparent' : null
		}`}
	>
		{children}
	</div>
)

Card.propTypes = {
	children: PropTypes.any,
	white: PropTypes.bool,
	padding: PropTypes.bool,
	transparent: PropTypes.bool,
}

export default Card
