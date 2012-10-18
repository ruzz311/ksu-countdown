$(function() {
  var target = Date.UTC(2012, 9, 17, 16, 0, 0)
    , $d = $('#d'), $h = $('#h'), $m = $('#m'), $s = $('#s')
    , $r = $('#schedule tr');

  function f(input) {
    var padded = ('0' + Math.floor(input));
    return padded.substring(padded.length - 2);
  }

  function updateDisplay() {
    var n = (new Date()).getTime()
      , ms = Math.max(target - (n), 0)
      , s = ms/1000, m = s/60, h = m/60, d = h/24;

    $s.text(f(s % 60));
    $m.text(f(m % 60));
    $h.text(f(h % 24));
    $d.text(f(d));

    if (s < 1 && $('body').hasClass('countdown')) {
      // reload within the next 3 - 10 seconds
      setTimeout(function () {
        window.location.reload();
      }, Math.floor(3000 + (Math.random() * 7000)));

      return;
    }

    $('#arrow').remove();

    for (var i = $r.length - 1; i >= 0; i--) {
      var self = $r.eq(i)
        , prev = $r.eq(i-1)
        , min;

      if (i === 0 || n > prev.attr('data-time')) {
        min = Math.ceil((self.attr('data-time') - n) / 1000 / 60);

        if (min < 120) {
          self.find('td:first span').append(
            $('<div id="arrow">Starting in ' + min + ' minutes</div>'));
        }

        break;
      }
    }

    setTimeout(updateDisplay, (ms % 1000) + 20);
  }

  updateDisplay();
});
