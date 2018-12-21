const ObjectMapper = (sourceType, destinationType) => {
	const destinationTypeOutput = {};
	Object.entries(sourceType).forEach(([key, value]) => {
		if (destinationType.hasOwnProperty(key)) {
			if (value) {
				destinationTypeOutput[key] = value;
			}
		}
	});
	return destinationTypeOutput;
};

export default ObjectMapper;
