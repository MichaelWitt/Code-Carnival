//just need a .get function
var fortune = require("../models/fortune.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  fortune.all(function(data) {
  });
});