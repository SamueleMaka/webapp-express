const connection = require("../data/connection")

function index(req,res) {
    const sql = "SELECT * FROM movies.movies";

    connection.query(sql, (error, results)=>{
        if(error){
            return res.status(500)
        }
        res.json(results)
    })
}

function show(req, res) {
    const currMovie = req.params.id;
    const sqlMovie = 'SELECT * FROM movies.movies WHERE id = ?';
    const sqlReview = 'SELECT * FROM movies.reviews WHERE movie_id = ?';
    let movieDetails
    connection.query(sqlMovie, [currMovie], (error, movieResults) => {
      if (error) {
        return res.status(500).send("errore nel server")
      }
      if (movieResults.length === 0) {
        return res.status(404).send("film non trovato")
      }
      movieDetails = movieResults[0]

      connection.query(sqlReview, [currMovie], (error, revResults) =>{
        if(error) {
          return res.status(500).send("errore nel server")
        }
  
        const movieReview = {
          id: movieDetails.id,
          title: movieDetails.title,
          director: movieDetails.director,
          image: movieDetails.image,
          abstract: movieDetails.abstract,
          reviews: revResults
        }
        res.json(movieReview)
      })
    });

    
}

function store(req, res){
  const currRev = req.params
  const {movie_id , name, vote, text} = req.body
  const sqlUserRev = 'INSERT INTO movies.reviews (movie_id , name, vote, text) VALUES (?, ?, ?, ?)'

  connection.execute(sqlUserRev, [movie_id , name, vote, text], (error, result) => {
    if(error){
      return (
        res.status(500).send("errore nel server")
      )
    }
    res.status(201).json({ message: "Recensione aggiunta", id: result.insertId });
  })
  
}

module.exports = {index, show, store} 