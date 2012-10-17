// Server-side Code
var ical = require('ical'),
    _    = require('underscore')


// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  var calUrl = {
      "2012-13K-StateFootball": "http://www.ahearnfund.com/ical/2012-13K-StateFootball.ics"
    },
    url = calUrl['2012-13K-StateFootball'],
    events = [];

  return {

    getSchedule: function() {
      // grab calendar info
      ical.fromURL(url, {}, function(err, data) {
        for (var k in data){
          if (data.hasOwnProperty(k) && data[k].type === "VEVENT") {
            events.push(data[k])
          }
        }
        console.log('done caching events')
        res({"games": events})
      });
    },
    
    getNext: function(){
      //@todo: obtain future game closest to today
      // grab calendar info
      var evnt = null;
      var now = (new Date()).getTime();
      ical.fromURL(url, {}, function(err, data) {
        for (var k in data){
          if (data.hasOwnProperty(k) && data[k].type === "VEVENT") {
            if( evnt === null ){
              evnt = data[k];
            } else {
              var tmp      = data[k]
              var tmpDiff  = (new Date(tmp.start)).getTime() - now
              var evntDiff = (new Date(evnt.start)).getTime() - now
              console.log( data[k].uid, evntDiff, tmpDiff,  ((tmpDiff < evntDiff || eventDiff < -1) && tmpDiff > -1))
              //ensure the date is in the future
              //ensure this date is closer to "now"
              if((tmpDiff < evntDiff || eventDiff < -1) && tmpDiff > -1)
                evnt = data[k]
            }
          }
        }
        console.log(evnt.uid, evnt.summary);
        res({"game": evnt});
      });
    }

  };

};