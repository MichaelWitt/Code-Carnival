var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "cosmo120",
  database: "fortunes_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllFortunes();
});

function queryAllFortunes() {
    connection.query("SELECT * FROM fortunes", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      }
      console.log("-----------------------------------");
    });
  }

  function queryRandomFortune() {
      connection.query("SELECT * FROM fortunes ORDER BY RAND() LIMIT 1;", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        }
      })
  }

  //add event listener to query the random function when the button is pressed
  document.getElementById("myBtn").addEventListener("click", function() {
    document.getElementById("demo").innerHTML = queryRandomFortune
  });