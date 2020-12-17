var Fortune = require("../models/fortunecontroller.js");

// =============================================================
module.exports = function(app) {
    // Get all Fortunes
    app.get("/api/all", function(req, res) {
      Fortune.findAll({}).then(function(results) {
        res.json(results);
      });
    });