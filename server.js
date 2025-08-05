const express = require("express"); 
const app = express()
const port = 3000
const connection = require("./data/connection");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get("/api/movies", (req,res)=>{
    const sql = "SELECT * FROM movies.movies";

    connection.query(sql, (error, results)=>{
        if(error){
            return res.status(500)
        }

        res.json(results)
    })
})


app.get('/api/movies/:id', (req, res) => {
    const currMovie = req.params.id;
    const sql = 'SELECT * FROM movies.movies WHERE id = ?';
  
    connection.query(sql, [currMovie], (error, results) => {
      if (error) {
        return res.status(500)
      }
  
      if (results.length === 0) {
        return res.status(404)
      }
  
      res.json(results[0]);
    });
  });