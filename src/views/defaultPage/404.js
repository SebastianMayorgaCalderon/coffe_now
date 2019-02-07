/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import './404.scss'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'

class DefaultPage extends Component {
	goBackHandler = () => {
		// eslint-disable-next-line react/prop-types
		this.props.history.goBack()
	}

	render() {
		return (
			<div className="container-404">
				<Card>
					<h1>404</h1>
					<h2>Theres nothing here Boss</h2>
					<Button text="Go Back" onClick={this.goBackHandler} />
				</Card>
			</div>
		)
	}
}

export default DefaultPage
