/**
 * Created by nobu on 2014/06/14.
 */
$(function(){
    var socket = io.connect();

    socket.on('connect', function(data){
        console.log("connnect");
    });

    socket.on('result', function(data){
        document.getElementById("receiveMsg").innerHTML = data.value;
    });

    $('#send-message').click(function(){
      var msg = 'countreset';
      console.log(msg);
      socket.emit('countreset');
    });

});
