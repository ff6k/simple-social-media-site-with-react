import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProfileGithub extends Component {
	state = {
		clientId: process.env.REACTAPP_GITHUB_API_KEY,
		clientSecret: process.env.REACTAPP_GITHUB_API_SECRET,
		count: 5,
		repos: [],
		sort: 'created: desc'
	};

	updateState = (key, value) =>
		this.setState((prevState, props) => (prevState[key] = value));

	componentDidMount() {
		const { username } = this.props;
		const { clientId, clientSecret, count, sort } = this.state;

		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => res.json())
			.then(data => {
				if (this.refs.myRef) {
					this.updateState('repos', data);
				}
			})
			.catch(err => console.log(err));
	}

	render() {
		const { repos } = this.state;

		const repoItems = repos.map(repo => (
			<div className="card card-body mb-2" key={repo.id}>
				<div className="row">
					<div className="col-md-9">
						<h4>
							<a
								className="text-info"
								href={repo.html_url}
								rel="noopener noreferrer"
								target="_blank"
							>
								{repo.name}
							</a>
						</h4>
						<p>{repo.description}</p>
					</div>
					<div className="col-md-3">
						<span className="badge badge-info mr-1">
							Stars: {repo.stargazers_count}
						</span>
						<span className="badge badge-secondary mr-1">
							Watchers: {repo.watchers_count}
						</span>
						<span className="badge badge-success">
							Forks: {repo.forks_count}
						</span>
					</div>
				</div>
			</div>
		));
		return (
			<div ref="myRef">
				<hr />
				<h3 className="mb-4">Latest Github Repos</h3>
				{repoItems}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileGithub;
