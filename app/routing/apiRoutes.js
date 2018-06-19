
var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var userData = req.body;
    var bestMatch = {friendDifference: 100};

    for (i in friends) {
      var totalDifference = 0;
      console.log(friends[i]);

      for (j in friends[i].scores) {
        totalDifference += Math.abs(userData.scores[j] - friends[i].scores[j]);
      }

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData);
    res.json(bestMatch);
  });

  app.post("/api/clear", function() {

    friends = [];
  });
};