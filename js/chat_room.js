$(() => {
    var addr = 'https://jc-chatroom-test.herokuapp.com/';
    var count = 0;
    
    var last_ra;
    var last_tm;
    var user_name;

    function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    };

    function parseCookie() {
        var cookieObj = {};
        var cookieAry = document.cookie.split(';');
        var cookie;
        
        for (var i=0, l=cookieAry.length; i<l; ++i) {
            cookie = jQuery.trim(cookieAry[i]);
            cookie = cookie.split('=');
            cookieObj[cookie[0]] = cookie[1];
        }
        
        return cookieObj;
    }
    
    function getCookieByName(name) {
        var value = parseCookie()[name];
        if (value) {
            value = decodeURIComponent(value);
        }
    
        return value;
    }
    //$(".msger-chat").scrollTo();
    
    user_name = getCookieByName('name');
    addr = addr + getCookieByName('roomID') + "/";
    
    $("#room-title").html("現在位於:" + getCookieByName('roomID') + "聊天室");

    $("#send").on("click", () => {
        const message = $("#msg").val();
        var myDate = new Date();
        var today = myDate.getHours()+":"+ myDate.getMinutes() +":"+myDate.getSeconds();
        $("#msg").val("");
        $.post(addr, { "ra" : getRandom(1000,50000), "name" : user_name, "time" : today, "message" : message });
    });
    setInterval(() => {
        $.getJSON(addr, function(data){
            var d = data;
            var ck = data.length-1;
            //console.log(d[ck].ra != last_ra) || (d[ck].time != last_tm);
            if((d[ck].ra != last_ra) || (d[ck].time != last_tm))  {
                console.log("new");
                $('#text2').append('<p>' + d[ck].name + "\t" + d[ck].time + ' : ' + d[ck].message + '</p>');
                last_ra = d[ck].ra;
                last_tm = d[ck].time;
            }      
        });
        /*$.getJSON('http://localhost:1732/login', function(data){ 
        console.log("data:");
        console.log(data);
        });*/
    }, 1*1000);
});