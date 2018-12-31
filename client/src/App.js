import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { logoutUser, setCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import './App.css';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/edit-profile/EditProfile';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import store from './store';
import setAuthToken from './utils/setAuthToken';

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
						<Route component={Landing} exact path="/" />
						<div className="container">
							<Route component={Register} exact path="/register" />
							<Route component={Login} exact path="/login" />
							<Route component={Profiles} exact path="/profiles" />
							<Route component={Profile} exact path="/profile/:handle" />
							<Switch>
								<PrivateRoute
									component={Dashboard}
									exact
									path="/dashboard"
									redirectTo="/login"
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									component={CreateProfile}
									exact
									path="/create-profile"
									redirectTo="/login"
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									component={EditProfile}
									exact
									path="/edit-profile"
									redirectTo="/login"
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									component={AddExperience}
									exact
									path="/add-experience"
									redirectTo="/login"
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									component={AddEducation}
									exact
									path="/add-education"
									redirectTo="/login"
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									component={Posts}
									exact
									path="/feed"
									redirectTo="/login"
								/>
							</Switch>
							<Route component={NotFound} exact path="/not-found" />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
