/**
 * Module dependencies.
 */

var express = require('express')
  , alunos = require('./routes/alunos')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// ROUTES FOR ALUNO
app.get('/', alunos.list);
app.get('/aluno/lista', alunos.list);
app.get('/aluno/novo', alunos.form);
app.post('/aluno/save', alunos.save);
app.get('/aluno/edit/:id', alunos.edit);
app.get('/aluno/del/:id', alunos.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});