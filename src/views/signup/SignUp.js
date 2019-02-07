/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import './SignUp.sass'
import md5 from 'blueimp-md5'
import { connect } from 'react-redux'
import Axios from 'axios'
import Noty from 'noty'
import { withRouter } from 'react-router-dom'
import Logo from '../../assets/images/logo_white.png'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Loader from '../../components/loader/loader'
import '../../components/Button/Button.scss'
import '../../../node_modules/noty/lib/noty.css'
import '../../../node_modules/noty/lib/themes/relax.css'
import { BASE_URL } from '../../constants'

class SignUp extends Component {
	state = {
		username: 'sebas',
		password: 'kiko',
		confirmPassword: 'kiko',
		loading: false,
		email: 'sebas@sebas.com',
	}

	componentDidMount() {
		const { history, userName } = this.props
		if (userName) {
			history.replace({
				pathname: '/',
			})
		}
	}

	validForm = () => {
		const { username, password, confirmPassword, email } = this.state
		return (
			username === '' ||
			password === '' ||
			confirmPassword === '' ||
			email === '' ||
			confirmPassword !== password ||
			!this.validateEmail(email)
		)
	}

	validateEmail = email => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(email).toLowerCase())
	}

	toLogin = () => {
		const { history } = this.props
		history.replace({
			pathname: '/login',
		})
	}

	onSignUp = () => {
		const { email, username } = this.state
		Axios.get(`${BASE_URL}/users?email=${email}&&userName=${username}`).then(
			res => {
				if (res.data.length === 0) {
					this.register()
				} else {
					this.resetForm()
					new Noty({
						type: 'error',
						theme: 'relax',
						layout: 'topRight',
						text: 'Looks like that email or user name  is already in use',
						timeout: 3000,
					}).show()
				}
			}
		)
	}

	resetForm = () => {
		this.setState({
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		})
	}

	register = () => {
		this.setState(prev => ({
			loading: !prev.loading,
		}))
		const { username, password, email } = this.state
		const user = {
			userName: username,
			email,
			password: md5(password),
		}
		Axios.post(`${BASE_URL}/users`, user)
			.then(res => {
				new Noty({
					type: 'success',
					theme: 'relax',
					layout: 'topRight',
					text: 'Your account was created!',
					timeout: 3000,
				}).show()
				this.toLogin()
			})
			.catch(err => {
				new Noty({
					type: 'error',
					theme: 'relax',
					layout: 'topRight',
					text: 'Something went wrong',
					timeout: 3000,
				}).show()
			})
	}

	render() {
		const { username, password, loading, confirmPassword, email } = this.state

		return (
			<div className="container-signup">
				<Card padding transparent>
					<img src={Logo} alt="Coffe now Logo Dark" className="grow-efect" />
					<h1>Sing up</h1>
					{loading ? (
						<Loader />
					) : (
						<div>
							<Input
								name="Username"
								label="*User name*"
								value={username}
								onChange={value => this.setState({ username: value })}
							/>
							<Input
								name="Email"
								label="*Email*"
								value={email}
								type="text"
								onChange={value => this.setState({ email: value })}
							/>
							<Input
								name="Password"
								label="*Password*"
								value={password}
								type="password"
								onChange={value => this.setState({ password: value })}
							/>
							<Input
								name="ConfirmPassword"
								label="*Confirm Password*"
								value={confirmPassword}
								type="password"
								onChange={value => this.setState({ confirmPassword: value })}
							/>
							<div className="login-form__controls">
								<Button text="Log in" type="DANGER" onClick={this.toLogin} />

								<Button
									text="Create account"
									disable={this.validForm()}
									onClick={this.onSignUp}
								/>
							</div>
						</div>
					)}
				</Card>
			</div>
		)
	}
}
const mapStateToProps = ({ userReducer }) => ({
	userName: userReducer.userName,
	token: userReducer.token,
})
export default withRouter(
	connect(
		mapStateToProps,
		null
	)(SignUp)
)
