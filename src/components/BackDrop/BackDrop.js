/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import './BackDrop.sass'

const BackDrop = ({ click }) => <div className="back-drop" onClick={click} />

BackDrop.propTypes = {
	click: PropTypes.any,
}

export default BackDrop
