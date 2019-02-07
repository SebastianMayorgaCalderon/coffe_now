import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './views/home/home'
import Login from './views/login/Login'
import SignUp from './views/signup/SignUp'

class App extends Component {
	render() {
		return (
			<div style={{ height: '100%' }}>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<Route path="/" component={Home} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(connect()(App))
