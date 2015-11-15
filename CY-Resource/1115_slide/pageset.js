// Timer --------------------

var end = new Date('11/15/2015 9:00 PM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'Time up!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        //document.getElementById('countdown').innerHTML = '時間還剩下 ';
        //document.getElementById('countdown').innerHTML += days + '天 ';
        document.getElementById('countdown').innerHTML = hours + ' Hr ';
        document.getElementById('countdown').innerHTML += minutes + ' Min ';
        document.getElementById('countdown').innerHTML += seconds + ' Sec';
    }

    timer = setInterval(showRemaining, 1000);