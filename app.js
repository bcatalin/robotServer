var util  = require('util');
var app   = require('http').createServer(handler);
var io    = require('socket.io')(app);
var fs    = require('fs');
var path  = require('path');

var KalmanFilter = require('kalmanjs').default;

var kf = new KalmanFilter();


var webConnections = [];

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase');

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


// var nsp = io.of('RBT_81C996');
// nsp.on('connection', function(socket){
//   console.log('someone connected in namepace RBT_81C996');
//   console.log(socket.nsp.name);
//   nsp.emit('hi', 'Hello everyone!');
// });


// nsp.on('RBT_81C996/JSON', function (data) 
// {
//     console.log(data);
//     //io.sockets.emit('acc_data', { acc_data: data });
//     nsp.emit('acc_data', { acc_data: data });
// });

// var nsp2 = io.of('RBT_D232B4');
// nsp2.on('connection', function(socket){
//   console.log('someone connected in namepace RBT_D232B4');
//   console.log(socket.nsp.name);
//   nsp2.emit('hi', 'Hello everyone!');

// });


io.on('connection', function (socket) 
{
	console.log("Connected  socket id:" + socket.id);
  console.log(socket.handshake.headers.origin);
  
  if(socket.handshake.headers.origin != "ESP_RAM")
  {
    //possible web browser connection. ESP has Origin preset to ESP_RAM
    webConnections.push(socket);
  }

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
    //sendLight(data);
    //console.log(data);
    });

  socket.on('JSON', function (data) 
  {
  	//console.log(data.x);
    //console.log(kf.filter(data.x))
    data.x = kf.filter(data.x);
    //data.y = kf.filter(data.y);
    //data.z = kf.filter(data.z);
    //io.sockets.emit('acc_data', { acc_data: data });
    //socket.broadcast.emit('acc_data', { acc_data: data });
    
    for(var webBrowsers = 0; webBrowsers < webConnections.length; webBrowsers ++)
    {
      var sessionID = webConnections[webBrowsers];
      sessionID.emit('acc_data', { acc_data: data })
    }
    //io.clients[sessionID].send('acc_data', { acc_data: data })
	  

    //var jsonStr = JSON.stringify(data);
	  //var parsed = ParseJson(jsonStr);
    //console.log(parsed);
	  //console.log(parsed.sensor);
    //data.x = 
    //socket.broadcast.emit('acc_dataK', { acc_data: data });

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

  socket.on("disconnect" , function(reason) {
   //console.log(socket)
   if(reason == "transport close")
   {
     console.log("receive a disconnect")
   }

        var index = webConnections.indexOf(socket);
        if (index != -1) {
            webConnections.splice(index, 1);
            console.info('Client gone (id=' + socket.id + ').');
        }

});



});



