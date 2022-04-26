const knex = require("../../db/connection");
const reduceProperties = require("../../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
	runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
	title: ["movies", null, "title"],
	rating: ["movies", null, "rating"],
});

function list() {
	return knex("theaters as t")
		.join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
		.join("movies as m", "m.movie_id", "mt.movie_id")
		.select("t.*", "m.rating", "m.runtime_in_minutes", "m.title")
		.where({ "mt.is_showing": true })
		.then(reduceMovies);
}

module.exports = {
	list,
};
