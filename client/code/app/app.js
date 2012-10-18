var $countdown = $('#countdown'),
    $schedule = $('#schedule'),
    $kill = $('#killkillkill'),
    $timer = {
      d : $( '.day',  $countdown),
      h : $( '.hour', $countdown),
      m : $( '.min',  $countdown),
      s : $( '.sec',  $countdown)
    },
    emawtime = require('/timer'),
    now = (new Date()).getTime(),
    schedule = [];


//============================================================= Public interface

  exports.getSchedule = function(cb){
    ss.rpc('events.getSchedule', {}, cb);
  }
  
  exports.updateOpponentTmpl = function(data){
    $kill.html( ss.tmpl['schedule-opponent'].render({game:data}) );
  }


//========================================================================= INIT
  
  // init & setup modules
  emawtime.domElements($timer.d, $timer.h, $timer.m, $timer.s);
  
  // fetch schedule, find the next game, and start the timer
  // update the opponent info so we know who's blood makes the grass grow.
  exports.getSchedule(function(data){
    var nextGame = _.find(schedule = data.games, function(item){
      return (new Date(item.start)).getTime() - now > 0;
    });
    
    emawtime.target(new Date(nextGame.start));
    emawtime.start();
    
    exports.updateOpponentTmpl(nextGame);
  });


//============================================================= User interaction


  // show the schedule when clicking on the title
  $('h1').on('click', function(){
    $schedule.toggle();
    
    if($schedule.children().length > 1)
      return false
    
    exports.getSchedule(function(data){
      schedule = data.games;
      return $schedule.html( ss.tmpl['schedule-event'].render(data) )
    });
  });

  // on schedule item click, load an event into the timer
  $schedule.on('click', 'li', function(){
    var id = this.id,
        game = _.find(schedule, function(item){ return item.uid === id });
        
    $schedule.addClass('fadeOut').hide();
    emawtime.target( new Date(game.start) );
    
    exports.updateOpponentTmpl(game);
  });
