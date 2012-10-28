// yr,mo,day,hr,min,s,ms
var target = Date.UTC(2014, 9, 18, 16, 0, 0),
    isRunning = false,
    onEnd = function(){},
    t, now, $s, $m, $h, $d;


//============================================================= Public Interface

/** 
 * start the timer
**/
exports.start = function(){
  update();
  return (isRunning = true);
}

/** 
 * stop the timer
 * if true is passed as an arguement the view will reset to zeros
**/
exports.stop = function(clear){
  clearTimeout(t);
  if(clear === true)
    exports.clear()
  return (isRunning = false);
}

/** 
 * play/pause view updates
**/
exports.toggle = function(){
  return isRunning ? exports.stop() : exports.start();
}

/** 
 * reset the timer view to zeros
**/
exports.clear = function(){
  $s.text(pad(0, 2));
  $m.text(pad(0, 2));
  $h.text(pad(0, 2));
  $d.text(pad(0, 3));
}

/** 
 * onEnd is run when a timer expires
**/
exports.onEnd = function(cb){
  if(typeof cb === "function")
    onEnd = cb;
}

/** 
 * set dom elements used in update
**/
exports.domElements = function(d, h, m, s){
  $d = d;
  $h = h;
  $m = m;
  $s = s;
}

/** 
 * get or set the "target-time"
 * @param t : Date() object
**/
exports.target = function(t){
  if(typeof t !== "undefined")
    target = t;
  return target;
}


//============================================================== Private Helpers

// pad a number by prepending up to ten zeros
var pad = function(input, size){
  var p = ['000000000', Math.floor(input)].join('');
  return p.substring(p.length - Math.min(size||2, 10));
};

// update the view's timer elements
var update = function(){
  now = (new Date()).getTime(), 
  ms  = Math.max(exports.target() - now, 0), 
  s   = ms / 1000, 
  m   =  s / 60, 
  h   =  m / 60, 
  d   =  h / 24;
  
  $s.text(pad(s % 60));
  $m.text(pad(m % 60));
  $h.text(pad(h % 24));
  $d.text(pad(d ,  3));
  
  if(ms < 1)
    onEnd(null, {now:now, target:exports.target(), ms:ms});
  else
    t = setTimeout(update, (ms % 1000) + 20); 
};
