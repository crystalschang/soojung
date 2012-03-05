var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    express = require('express'),
    app = express.createServer();


app.get('/', function(req,res) {
  console.log('nidex');
  getFile('/index.html',req,res);
});

app.get('/lib/*', function(req,res) {
  getFile(getURI(req),req,res);
});

app.get('/imgs/*', function(req,res) {
  getFile(getURI(req),req,res);
});

app.get('*', function(req,res) {
  res.send('NO way jose',404);
});

app.listen(23338);

function getURI(request) {
    return url.parse(request.url).pathname;
}

function getFile(filename, request, response) {
    filename = '.'+filename;
    console.log('filename: '+filename);
    path.exists(filename, function(exists) {
            if(!exists) {
                response.statusCode = 404;
                response.end('404 Not Found\n');
                return;
            }   
        else{
                fs.readFile(filename, 'binary', function(err, file) {
                    if(err) {
                            response.statusCode = 500;
                        response.end(err+'\n');
                        return;
                  }   
                    response.statusCode = 200;
                response.end(file, 'binary');
                }); 
        }   
    }); 
}
