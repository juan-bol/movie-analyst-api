// Get our dependencies
var express = require('express');
var app = express();
const execSync = require('child_process').execSync;
var mariadb = require('mariadb/callback');

const fs = require('fs');
let fileContent = fs.readFileSync('.secrets', 'utf-8');
console.log(fileContent);


var connection = mariadb.createConnection({
 host     : process.env.DB_HOST || '192.168.100.13',
 user     : process.env.DB_USER || 'root',
 password : process.env.DB_PASS || fileContent,
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

function getPendings(callback) {    
  connection.query("SELECT * FROM pending",
      function (err, rows) {
          console.log(rows);
          callback(err, rows); 
      }
  );    
}

function getIp() {   
  stdout = execSync("ifconfig eth1 | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*'", { encoding: 'utf-8' });  // the default is 'buffer'
  return stdout.split('\n')[0].split(' ')[1];

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

app.get('/pendings', function(req, res){
  getPendings(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})


app.get('/ip', function (req, res) {
  var response = [{ ip: getIp() }]
  res.json(response);
})

console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
