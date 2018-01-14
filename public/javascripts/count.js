/**
 * Created by nobu on 2014/06/14.
 */
$(function(){

    var uuid = $.cookie('uuid');
    console.log('uuid:' + uuid);
    if(uuid === undefined || uuid === '') {
        uuid = (function(){
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4() +S4());
        })();
        $.cookie('uuid', uuid, {expires:7, path:'/'});
    }

    var socket = io.connect();

    socket.on('connect', function(data){
        console.log("connnect");
        console.log(socket.id);
    });

    socket.on('message', function(data){
        document.getElementById("receiveMsg").innerHTML = data.value;
    });

    // メッセージを送る
    $('#send-message').click(function(){
        socket.emit('message', { uuid: uuid });
    });
});
