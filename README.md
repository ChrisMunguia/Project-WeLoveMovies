# Project-WeLoveMovies-API

How to use API
- The URL must contain a valid path for data to be shown.

Routes/Paths
- List all theaters and the movies they are currently showing
  - /theaters
- List all movies
  - /movies
- List all movies that are currently showing
  - /movies?is_showing=true
- Return a single movie by id
  - /movies/:movieid
- Return a list of theaters where movie is currently showing based on id
  - /movies/:movieid/theaters
- Return a list of reviews for a movie based on id
  - /movies/:movieid/reviews
- User can update a review based on id with a PUT request
  - /reviews/:reviewid
- User can delete a review based on id with a DELETE request
  - /reviews/:reviewid
