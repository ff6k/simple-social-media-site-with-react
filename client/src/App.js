import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';

const authTokenExpired = expireDate => {
	const currentTime = Date.now() / 1000;
	return currentTime > expireDate;
};

//check for token
if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;

	//set auth token header auth
	setAuthToken(token);

	//decode token and get user info and expiration
	const decodedToken = jwt_decode(token);

	//set user and isAuthenticated
	store.dispatch(setCurrentUser(decodedToken));

	// redirect if user has expired token
	if (authTokenExpired(decodedToken.exp)) {
		//logout user
		store.dispatch(logoutUser());

		//clear current profile
		store.dispatch(clearCurrentProfile());

		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/dashboard" component={Dashboard} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
