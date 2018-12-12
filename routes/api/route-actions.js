module.exports = routeAction = {
	addToArray: (Schema, query, field, objectToAdd, response) => {
		return Schema.findOne(query).then(model => {
			model[field].unshift(objectToAdd);
			model.save().then(model => response.json(model));
		});
	},
	deleteFromArrayByUser: (Schema, query, field, modelId, response) => {
		return Schema.findOne(query).then(model => {
			//Get remove index
			const removeIndex = model[field].map(item => item.id).indexOf(modelId);

			//Splice out of array
			model[field].splice(removeIndex, 1);
			model.save().then(model => response.json(model));
		});
	},
	findProfile: (query, response) => {
		Profile.find(query)
			.populate('user', ['name', 'avatar'])
			.then(profile => {
				if (!profile) {
					return response.status(404).json({ error: 'There are no profiles' });
				}
				response.json(profile);
			})
			.catch(err => {
				response.status(404).json({ error: 'There are no profiles' });
			});
	}
};
