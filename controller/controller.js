const connection = require("../data/connection")

function index (req,res) {
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
    const sql = 'SELECT * FROM movies.movies WHERE id = ?';
  
    connection.query(sql, [currMovie], (error, results) => {
      if (error) {
        return res.status(500).send("errore nel server")
      }
  
      if (results.length === 0) {
        return res.status(404).send("film non trovato")
      }
  
      res.json(results[0]);
    });
}

module.exports = {index, show}