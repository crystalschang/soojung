var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    express = require('express'),
    app = express.createServer();

console.log(__dirname+'/imgs')
app.use(express.static(__dirname + '/public',{ maxAge: 90000 }));

app.get('/', function(req,res) {
  res.redirect(301, 'http://www.crystalschang.com');
});

app.get('/lib/*', function(req,res) {
  getFile(getURI(req),req,res);
});

app.get('*', function(req,res) {
  res.send('NO way jose',404);
});

app.listen(process.env.PORT || 23338);

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
