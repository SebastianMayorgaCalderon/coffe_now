/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './EditDrinkControls.scss'
import '../SyrupList/SyrupList.scss'

const EditDrinkControls = ({
	usedSyrups,
	usdeMilk,
	syrups,
	milks,
	onAddSyrup,
	onChangeMilk,
}) => {
	const avaliableSyrups = syrups
		.filter(
			syrupsToSee =>
				!usedSyrups.find(syrupToCheck => syrupToCheck == syrupsToSee)
		)
		.map(syrup => (
			<div
				className="syrup-container__item avaliable"
				key={syrup}
				onClick={() => onAddSyrup(syrup)}
			>
				<p>{syrup}</p>
			</div>
		))

	const avaliableMilks = milks
		.filter(milk => milk != usdeMilk)
		.map(avaliableMilk => (
			<div
				className="syrup-container__item avaliable"
				key={avaliableMilk}
				onClick={() => onChangeMilk(avaliableMilk)}
			>
				<p>{avaliableMilk}</p>
			</div>
		))
	return (
		<div className="controls-containers">
			<div className="line-break" />
			<div className="syrup-container">
				<h3>Add Syrups</h3>
				<div className="dividor" />
				{avaliableSyrups}
				<div className="dividor" />
			</div>
			<div className="syrup-container">
				<h3>Select Milk</h3>
				<div className="dividor" />
				{avaliableMilks}
				<div className="dividor" />
			</div>
			<div className="line-break" />
		</div>
	)
}

EditDrinkControls.propTypes = {
	usedSyrups: PropTypes.array,
	usdeMilk: PropTypes.string,
	syrups: PropTypes.array,
	milks: PropTypes.array,
	onAddSyrup: PropTypes.any,
	onChangeMilk: PropTypes.any,
}
const mapStateToProps = ({ drinkReducer }) => ({
	syrups: drinkReducer.avaliableSyrups,
	milks: drinkReducer.avaliableMilkTypes,
})

export default connect(
	mapStateToProps,
	null
)(EditDrinkControls)
