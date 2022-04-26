const service = require("./movies.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
	const movie = await service.read(req.params.movieId);
	if (movie) {
		res.locals.movie = movie;
		return next();
	}
	next({ status: 404, message: "Movie cannot be found." });
}

function read(req, res) {
	const data = res.locals.movie;
	res.json({ data });
}

async function list(req, res) {
	if (req.query.is_showing) {
		const data = await service.listMoviesIsShowing();
		return res.json({ data });
	}
	const data = await service.list();
	res.json({ data });
}

async function readMovieInTheaters(req, res) {
	const data = await service.readMovieInTheaters(req.params.movieId);
	res.json({ data });
}
async function readReviewsForMovie(req, res) {
	const data = await service.readReviewsForMovie(req.params.movieId);
	res.json({ data });
}

module.exports = {
	list: [asyncErrorBoundary(list)],
	read: [asyncErrorBoundary(movieExists), read],
	readMovieInTheaters: asyncErrorBoundary(readMovieInTheaters),
	readReviewsForMovie: asyncErrorBoundary(readReviewsForMovie),
};
