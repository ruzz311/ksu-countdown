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
    ss.rpc('events.getSchedule', {}, cb)
  }
  
  exports.updateOpponentTmpl = function(data){
    $kill
      .hide()
      .html(ss.tmpl['schedule-opponent'].render({game:data}))
      .stop().fadeTo(800, 1)
    /*
    ss.rpc('logos.getLogo', data, function(){
      $kill.html( ss.tmpl['schedule-opponent'].render({game:data}) )
    });
    */
  }
  
  exports.cleanSummary = function(sum){
    if (sum.substring(0, 2) === "at"){
      sum = $.trim( sum.substring(2, sum.length) )
    }
    return sum
  }


//========================================================================= INIT
  
  // setup module with domelemnts to update
  emawtime.domElements($timer.d, $timer.h, $timer.m, $timer.s);
  
  emawtime.onEnd(function(){ window.location.reload(); });
  
  // fetch schedule, find the next game, and start the timer
  // update the opponent info so we know who's blood makes the grass grow.
  exports.getSchedule(function(data){
    var nextGame = _.find(schedule = data.games, function(item){
      return (new Date(item.start)).getTime() - now > 0;
    });
    
    emawtime.target(new Date(nextGame.start));
    emawtime.start();
    
    //Detect home or away and display / update opponent-view
    nextGame.summary = exports.cleanSummary(nextGame.summary)
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
        
    $schedule.hide();
    emawtime.target( new Date(game.start) );
    
    game.summary = exports.cleanSummary(game.summary)
    exports.updateOpponentTmpl(game);
  });
