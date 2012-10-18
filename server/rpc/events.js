var ical = require('ical');


// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  var calUrl = {
      "2012-13K-StateFootball": "http://www.ahearnfund.com/ical/2012-13K-StateFootball.ics"
    },
    url = calUrl['2012-13K-StateFootball'],
    events = [], actions;
    
    
  return {

    getSchedule: function() {
      // grab calendar info
      ical.fromURL(url, {}, function(err, data) {
        for (var k in data){
          if (data.hasOwnProperty(k) && data[k].type === "VEVENT") {
            events.push(data[k])
          }
        }
        res({ "games": events });
      });
    }
    
  };
};