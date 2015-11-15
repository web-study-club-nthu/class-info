// Cookie Reader --------------------

var testMode = false;

function cookieRead(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Button Enable Setting --------------------

function buttonSetting(){
    if(cookieRead("Q11")=="true"){
        document.getElementById("Q21").removeAttribute("disabled");
    }
    if(cookieRead("Q21")=="true"){
        document.getElementById("Q31").removeAttribute("disabled");
        document.getElementById("Q32").removeAttribute("disabled");
    }
    if(cookieRead("Q31")=="true" || cookieRead("Q32")=="true"){
        document.getElementById("Q41").removeAttribute("disabled");
        document.getElementById("Q42").removeAttribute("disabled");
        document.getElementById("Q43").removeAttribute("disabled");
        document.getElementById("Q44").removeAttribute("disabled");
    }
    if(cookieRead("Q11")){document.getElementById("gQ11").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ11").className += " glyphicon-question-sign";}
    if(cookieRead("Q21")){document.getElementById("gQ21").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ21").className += " glyphicon-question-sign";}
    if(cookieRead("Q31")){document.getElementById("gQ31").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ31").className += " glyphicon-question-sign";}
    if(cookieRead("Q32")){document.getElementById("gQ32").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ32").className += " glyphicon-question-sign";}
    if(cookieRead("Q41")){document.getElementById("gQ41").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ41").className += " glyphicon-question-sign";}
    if(cookieRead("Q42")){document.getElementById("gQ42").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ42").className += " glyphicon-question-sign";}
    if(cookieRead("Q43")){document.getElementById("gQ43").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ43").className += " glyphicon-question-sign";}
    if(cookieRead("Q44")){document.getElementById("gQ44").className += " glyphicon-ok-sign";}
    else{document.getElementById("gQ44").className += " glyphicon-question-sign";}
}

// Fetch JSON Data --------------------

var ajax_stick;
var data;

function createAJAX_stick() {
    if (window.ActiveXObject) {
    　　try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                return null;
            }
    　　}
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        return null;
    }
}

function onRcvData_stick () {
    if (ajax_stick.readyState == 4) {
        if (ajax_stick.status == 200) {
            data = JSON.parse(ajax_stick.responseText);
        } else {
            alert ("Err_XMLHttpRequest_Recieve_"+ajax_stick.status);
        }
    } 
}

function getSticks(){
    ajax_stick = createAJAX_stick() ;
    if (!ajax_stick) {
        alert ('Err_XMLHttpRequest_Unavailable');
        return 0;
    }

    ajax_stick.onreadystatechange = onRcvData_stick;
    ajax_stick.open("GET","sticks.json",true);
    ajax_stick.send("");
}

// Code Online Judge --------------------

var ajax_judge;

function createAJAX_judge() {
    if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                return null;
            }
        }
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest({ anon: true, system: true });
    } else {
        return null;
    }
}

function onRcvData_judge () {
    if (ajax_judge.readyState == 4) {
        if(ajax_judge.responseText=="true"){
            alert("恭喜你答對了！");
            document.cookie=document.getElementById("form-submit-ID").value+"=true; expires=Fri, 21 Aug 2015 04:00:00 UTC";
        }
        else{
            alert("不對喔，再試試看吧！");
        }
        location.reload();
    }
    else{
        if(testMode){
            alert("Err_XMLHttpRequest_SendCode_Recieve_"+ajax_judge.status);
        }
    }
}

function sendCode(){
    ajax_judge = createAJAX_judge() ;

    //var url = "curl.php";
    //var params = "qid="+encodeURIComponent(document.getElementById("form-submit-ID").value)+"&code="+encodeURIComponent(document.getElementById("form-submit-code").value);

    if (!ajax_judge) {
        alert ('Err_XMLHttpRequest_Unavailable');
        return 0;
    }

    ajax_judge.onreadystatechange = onRcvData_judge;
    ajax_judge.open("POST",url,true);
    ajax_judge.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax_judge.setRequestHeader("Content-length", params.length);
    ajax_judge.setRequestHeader("Connection", "close");
    ajax_judge.send(params);
}

// Onload Setting --------------------

function pageLoad(){
    buttonSetting();
    getSticks();
}

// Timer --------------------

var end = new Date('11/1/2015 8:30 PM');

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
            document.getElementById('countdown').innerHTML = '時間到囉！！！';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countdown').innerHTML = '時間還剩下 ';
        //document.getElementById('countdown').innerHTML += days + '天 ';
        document.getElementById('countdown').innerHTML += hours + ' 小時 ';
        document.getElementById('countdown').innerHTML += minutes + ' 分 ';
        document.getElementById('countdown').innerHTML += seconds + ' 秒！';
    }

    timer = setInterval(showRemaining, 1000);