/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import './SyrupList.scss'

const SyrupList = ({ syrupList, onRemoveSyrup, canRemove }) => (
	<div className="syrup-container">
		<h3>Syrups</h3>
		<div className="dividor" />
		{syrupList.map((syrup, i) => (
			<div key={i}>
				<div
					className="syrup-container__item"
					onClick={() => (canRemove ? onRemoveSyrup(syrup) : null)}
				>
					<p>{syrup}</p>
				</div>
			</div>
		))}
	</div>
)

SyrupList.propTypes = {
	syrupList: PropTypes.array,
	onRemoveSyrup: PropTypes.any,
	canRemove: PropTypes.any,
}
export default SyrupList
