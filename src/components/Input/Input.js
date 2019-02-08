/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import ProprTypes from 'prop-types'
import './Input.scss'

const Input = ({ onChange, value, type, label, name, valid }) => (
	<div className="input-container">
		<label className="input-container__label" htmlFor={name}>
			{label}
		</label>
		<input
			name={name}
			className={`input ${!valid ? 'invalid' : null}`}
			onChange={ev => onChange(ev.target.value)}
			value={value}
			type={type}
		/>
	</div>
)

Input.propTypes = {
	onChange: ProprTypes.any,
	value: ProprTypes.any,
	type: ProprTypes.string,
	label: ProprTypes.string,
	name: ProprTypes.string,
	valid: ProprTypes.bool,
}
export default Input
