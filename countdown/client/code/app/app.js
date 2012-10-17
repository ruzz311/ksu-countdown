/* QUICK CHAT DEMO */

var $schedule = $('#schedule');
    window.schedule = [];
// Listen out for newMessage events coming from the server
ss.event.on('newMessage', function(message) {

  // Example of using the Hogan Template in client/templates/chat/message.jade to generate HTML for each message
  var html = ss.tmpl['chat-message'].render({
    message: message,
    time: function() { return timestamp(); }
  });

  // Append it to the #chatlog div and show effect
  return $(html).hide().appendTo('#chatlog').slideDown();
});


// show the schedule when clicking on the title
$('h1').on('click', function(){
  $schedule.toggle();
  if( $schedule.children().length < 1 ){
    exports.getSchedule(getScheduleCallback);
  }
});

$schedule.on('click', function(){
  $schedule.hide();
})


exports.getSchedule = function(cb){
  ss.rpc('events.getSchedule', {}, cb);
}

exports.getNextGame = function(cb){
  ss.rpc('events.getNextGame', {}, cb);
}


// Private functions

var getScheduleCallback = function(data){
  var html = ss.tmpl['schedule-event'].render(data);
  window.schedule = data.games;
  return $('#schedule').html(html)
};

var timestamp = function() {
  var d = new Date();
  return d.getHours() + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
};

var pad2 = function(number) {
  return (number < 10 ? '0' : '') + number;
};

var valid = function(text) {
  return text && text.length > 0;
};