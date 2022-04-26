const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");

function list() {
	return knex("movies").select("*");
}

function listMoviesIsShowing() {
	return knex("movies as m")
		.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
		.select("m.*")
		.where({ is_showing: true })
		.groupBy("m.movie_id")
		.orderBy("m.movie_id");
}

function read(movie_id) {
	return knex("movies").select("*").where({ movie_id }).first();
}

function readMovieInTheaters(movie_id) {
	return knex("movies as m")
		.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
		.join("theaters as t", "t.theater_id", "mt.theater_id")
		.select("t.*", "mt.is_showing", "m.movie_id")
		.where({ "m.movie_id": movie_id })
		.groupBy("t.theater_id", "mt.is_showing", "m.movie_id")
		.orderBy("m.movie_id");
}

const addCritic = mapProperties({
	critic_id: "critic.critic_id",
	preferred_name: "critic.preferred_name",
	surname: "critic.surname",
	organization_name: "critic.organization_name",
	created_at: "critic.created_at",
	updated_at: "critic.updated_at",
});

function readReviewsForMovie(movie_id) {
	return knex("movies as m")
		.join("reviews as r", "r.movie_id", "m.movie_id")
		.join("critics as c", "c.critic_id", "r.critic_id")
		.select("r.*", "c.*")
		.where({ "m.movie_id": movie_id })
		.then((reviews) => reviews.map((review) => addCritic(review)));
}

module.exports = {
	list,
	listMoviesIsShowing,
	read,
	readMovieInTheaters,
	readReviewsForMovie,
};
