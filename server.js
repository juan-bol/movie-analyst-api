// Get our dependencies
var express = require('express');
var app = express();
var mariadb = require('mariadb/callback');
var connection = mariadb.createConnection({
 host     : process.env.DB_HOST || '192.168.100.13',
 user     : process.env.DB_USER || 'root',
 password : process.env.DB_PASS || 'holi',
 database : process.env.DB_NAME || 'movie_db'
});

connection.connect(err => {
  if (err) {
    console.log("Database conecction error due to " + err);
  } else {
    console.log("Database conecction succesfully");
  }
});

function testconnection(callback) {    
  connection.query("SELECT 1 as val",
      function (err, rows) {
          console.log(rows);
          callback(err, rows); 
      }
  );    
}

function getMovies(callback) {    
       connection.query("SELECT * FROM moviereview",
           function (err, rows) {
               console.log(rows);
               callback(err, rows); 
           }
       );    
}

function getReviewers(callback) {    
  connection.query("SELECT * FROM reviewer",
      function (err, rows) {
          console.log(rows);
          callback(err, rows); 
      }
  );    
}

function getPublications(callback) {    
  connection.query("SELECT * FROM publication",
      function (err, rows) {
          console.log(rows);
          callback(err, rows); 
      }
  );    
}

//Testing endpoint
app.get('/', function (req, res) {
  var response = [{ response: 'hello' }, { code: '200' }]
  res.json(response);
})

app.get('/test', function (req, res) {
  testconnection(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})

app.get('/movies', function (req, res) {
  getMovies(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})

app.get('/reviewers', function (req, res) {
  getReviewers(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})

app.get('/publications', function (req, res) {
  getPublications(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]
  res.json(pending);
})
console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
