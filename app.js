var util  = require('util');
var app   = require('http').createServer(handler);
var io    = require('socket.io')(app);
var fs    = require('fs');
var path  = require('path');

app.listen(1234);

function handler (req, response) 
{
  console.log("================= handle "+ req.url);

 var filePath = '.' + req.url;
  if (filePath == './')
    filePath = './index.html';
    
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  console.log("---contentType is " + contentType + " filePath: " + filePath)

  fs.exists(filePath, function(exists) 
  {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      response.writeHead(404);
      response.end();
    }
  });


  //console.log(req)
  // fs.readFile(__dirname + '/index.html',
  // function (err, data) {
  //   if (err) {
  //     res.writeHead(500);
  //     return res.end('Error loading index.html');
  //   }

  //   res.writeHead(200);
  //   res.end(data);
  // });
}


function handler2(request, res)
{
console.log('request starting...');
  
  var filePath = '.' + request.url;
  if (filePath == './')
    filePath = './index.htm';
    
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }
  
  path.exists(filePath, function(exists) {
  
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      response.writeHead(404);
      response.end();
    }
  });
  
  }  


function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}

function sendTime() {
    io.sockets.emit('atime', { time: new Date().toJSON() });
}

function sendLight(data) {
    io.sockets.emit('light', { light: data.message });
}

io.on('connection', function (socket) 
{
	console.log("Connected");
  socket.emit('welcome', { message: 'Connected !!!!' });
  
  socket.on('connection', function (data) 
  {
    console.log(data);   
  });
  
  socket.on('atime', function (data) {
	  sendTime();
    console.log(data);
    });
  
  socket.on('light', function (data) {
    //console.log("light received on SERVER from ESP")
    sendLight(data);
    //console.log(data);
    });

  socket.on('JSON', function (data) 
  {
//	console.log(data);
	  var jsonStr = JSON.stringify(data);
	  var parsed = ParseJson(jsonStr);
    console.log(parsed);
	  console.log(parsed.sensor);
  });

  socket.on('arduino', function (data) 
  {
	  io.sockets.emit('arduino', { message: 'R0' });
    console.log(data);
  });


  socket.on('rnd', function (data) 
  {
    console.log("SERVER: rx: rnd message")
    io.sockets.emit('rnd', { message: '' + data +'' } );
    console.log("SERVER: RX DATA: "+ data);
  });
});
