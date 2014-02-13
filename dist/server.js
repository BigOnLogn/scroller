var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

app.listen(app.get('port'), function() {
  console.log('server listening on port', app.get('port'));
});