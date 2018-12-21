import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';

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
							<Switch>
								<PrivateRoute
									exact
									path="/dashboard"
									redirectTo="/login"
									component={Dashboard}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/create-profile"
									redirectTo="/login"
									component={CreateProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/edit-profile"
									redirectTo="/login"
									component={EditProfile}
								/>
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
