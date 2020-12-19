var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "s0djs424aadzszp0",

  // Your password
  password: "t7i829g5fdl608kr",
  database: "ecz2fnash4nww330"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryRandomFortune
});

  function queryRandomFortune() {
      connection.query("SELECT * FROM fortunes ORDER BY RAND() LIMIT 1;", function(err, res) {
        console.log("select random", res)
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        }
      })
  }

  module.exports = queryRandomFortune;

