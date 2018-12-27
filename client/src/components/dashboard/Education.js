import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
	onDeleteClick(id) {
		if (window.confirm('Are you sure you would like to delete?')) {
			this.props.deleteEducation(id);
		}
	}

	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>
					{edu.degree} {edu.fieldofstudy}
				</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
					{edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : 'Now'}
				</td>
				<td>
					<button
						className="btn btn-danger"
						onClick={this.onDeleteClick.bind(this, edu._id)}
					>
						Delete
					</button>
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-4">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}

Education.propType = {
	deleteEducation: PropTypes.func.isRequired
};

export default connect(
	null,
	{ deleteEducation }
)(Education);
