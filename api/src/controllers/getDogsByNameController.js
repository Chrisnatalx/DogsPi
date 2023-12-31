require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Dog } = require('../db');
const { Op } = require('sequelize');

const getDogsByNameController = async (name) => {
	const dogsApi = (
		await axios.get(
			`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`
		)
	).data;

	const mappedDogsApi = dogsApi.map((dog) => {
		if (dog.id !== 15 && dog.id !== 212 && dog.id !== 125 && dog.id !== 66) {
			return {
				id: dog.id,
				name: dog.name,
				image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
				temperament: dog.temperament,
				weight: dog.weight.metric,
			};
		} else {
			return {
				id: dog.id,
				name: dog.name,
				image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.png`,
				temperament: dog.temperament,
				weight: dog.weight.metric,
			};
		}
	});
	const dogsDB = await Dog.findAll({
		where: {
			name: {
				[Op.iLike]: `%${name}%`,
			},
		},
	});
	const mappedDogsDb = dogsDB.map((dog) => {
		return {
			id: dog.id,
			name: dog.name,
			temperament: dog.temperament,
			image: dog.image,
			height: dog.height,
			weight: dog.weight,
		};
	});

	const dogs = [...mappedDogsDb, ...mappedDogsApi];
	return dogs;
};
module.exports = getDogsByNameController;
