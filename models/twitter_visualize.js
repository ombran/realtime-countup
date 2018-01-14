// Twitter API
var twitter = require('ntwitter');
var to_json = require('xmljson').to_json;

function yahoomaapi(io, data) {
  var yhttp = require('http');
  var querystring = require('querystring');

  var qst = querystring.stringify({
    appid: '',　// Yahooの日本語形態素解析APIのIDを指定
    sentence: data,
    results: 'ma'
  });

  var options = {
    host: 'jlp.yahooapis.jp',
    port: 80,
    path: '/MAService/V1/parse?' + qst
  };

  var result = '';
  yhttp.get(options,
    function (res) {
      body = "";
      res.on('data', function (data) {
        result += data;
      });
      res.on('end', function () {
        to_json(result, function (err, data) {
          var words = data.ResultSet.ma_result.word_list.word;
          //console.log(words);
          io.sockets.emit('tweet', words);
        });
      });
    }
  ).on('error',
    function (e) {
      console.log("Got error: " + e.message);
    }
  )
}

function twitter_visualize(io) {
  // apps.twitter.comで登録したアプリの各種キー情報を登録
  var twit = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });

  twit.stream('user', function (stream) {
    stream.on('data', function (data) {
      var ma = yahoomaapi(io, data.text);
      //console.log(data.text);
    });
    stream.on('end', function (res) {
    });
    stream.on('destroy', function (res) {
    });
  });
}

module.exports = twitter_visualize;
