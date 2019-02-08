/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'
import './DrinkListItem.scss'
import Button from '../Button/Button';

const DrinkListItem = ({ drink , history}) => (
	<Card>
		<div className="drink-container">
			<img src = {drink.image} alt = "Drink"/>
			<div className = "drink-title-contianer">
			        <h3>{drink.name}</h3>
				<div className="spacer" />
				<Button text="Details" onClick = {()=>{
					history.push(`/${drink.id}`)
				}}/>
			</div>

			{/* <div className="drink-milk">
				<h3>Milk</h3>
				<p>{drink.milk}</p>
				<br />
			</div>
			{drink.syrups? <SyrupList syrupList = {drink.syrups}/>: null} */}
			
		</div>
	</Card>
)

DrinkListItem.propTypes = {
	drink: PropTypes.any,
	history: PropTypes.any,
	canEdit: PropTypes.bool
}
export default DrinkListItem
