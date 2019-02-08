/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Login.scss'
import Axios from 'axios'
import { connect } from 'react-redux'
import md5 from 'blueimp-md5'
import Noty from 'noty'
import Logo from '../../assets/images/logo_white.png'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Loader from '../../components/loader/loader'
import { login } from '../../store/actions/index'
import '../../../node_modules/noty/lib/noty.css'
import '../../../node_modules/noty/lib/themes/relax.css'
import '../../components/Button/Button.scss'
import { BASE_URL } from '../../constants'

class Login extends Component {
	state = {
		username: '',
		password: '',
		loading: false,
	}

	componentDidMount() {
		const { history, userName } = this.props
		if (userName) {
			history.replace({
				pathname: '/',
			})
		}
	}

	login = () => {
		const { username } = this.state
		Axios.get(`${BASE_URL}/users.json`).then(res => {
			const result = Object.values(res.data)
			const user = result.find(
				userToSearch => userToSearch.userName === username
			)
			if (!user) {
				this.errorMessage()
			} else {
				this.checkCredentials(user.password)
			}
		})
	}

	checkCredentials = pass => {
		const { password, username } = this.state
		const passwordToCheck = md5(password)
		if (pass === passwordToCheck) {
			this.props.login({ userName: username, token: 'depsues' })
			this.toHome()
		} else {
			this.errorMessage()
		}
	}

	errorMessage = () => {
		new Noty({
			type: 'error',
			theme: 'relax',
			layout: 'topRight',
			text: 'User name and password does not match',
			timeout: 3000,
		}).show()
		this.clearForm()
	}

	clearForm = () => {
		this.setState({ username: '', password: '' })
	}

	toSignUp = () => {
		const { history } = this.props
		history.replace({
			pathname: '/signup',
		})
	}

	toHome = () => {
		const { history } = this.props
		history.replace({
			pathname: '/',
		})
	}

	render() {
		const { username, password, loading } = this.state
		return (
			<div className="container-login">
				<Card padding transparent>
					<img src={Logo} alt="Coffe now Logo Dark" className="grow-efect" />
					<h1 className="title">Log in</h1>
					{loading ? (
						<Loader />
					) : (
						<div>
							<Input
								name="Username"
								label="User name"
								value={username}
								onChange={value => this.setState({ username: value })}
								valid={username !== ''}
							/>
							<Input
								name="Password"
								label="Password"
								value={password}
								type="password"
								onChange={value => this.setState({ password: value })}
								valid={password !== ''}
							/>
							<div className="login-form__controls">
								<Button text="SingUp" type="DANGER" onClick={this.toSignUp} />
								<Button text="Login" onClick={this.login} />
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
const mapDispatchToProps = {
	login,
}
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Login)
)
