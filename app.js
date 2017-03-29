var util  = require('util');
var app   = require('http').createServer(handler);
var io    = require('socket.io')(app);
var fs    = require('fs');
var path  = require('path');

var KalmanFilter = require('kalmanjs').default;

var kx = new KalmanFilter();
var ky = new KalmanFilter();
var kz = new KalmanFilter();


var webConnections = [];
var ramConnections = [];

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/myappdatabase');

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


  if(req.method.toLowerCase() == 'post' )
  {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) 
    {
      console.log("received form");  
      console.log(fields);
    });
  }


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

function printRAM()
{
 console.log("=======================================================");
 console.log("|ID| RAM ID     | Socket ID            | Machine ID ");
 console.log("=======================================================");
 for(var i=0 ; i < ramConnections.length; i++)
 {
  
  console.log("| "+ i + "| " + ramConnections[i].ram_id + " | " + ramConnections[i].socket_id + " | " + ramConnections[i].machine_id);
  console.log("-------------------------------------------------------");
 }
 console.log("=======================================================");
}
//Just in case
function deleteRAM(socket_id)
{
  for(var i=0; i < ramConnections.length; i++)
  {
    if(ramConnections[i].socket_id == socket_id)
    {
      //remove this element from ramConnections
    }
  }//end for
}

function addRAMObject(obj)
{
  for(var i=0; i < ramConnections.length; i++)
  {
    if(ramConnections[i].ram_id == obj.ram_id)
    {
       ramConnections[i].socket_id = obj.socket_id;
       ramConnections[i].machine_id = obj.machine_id; //maybe is changed
       return;
    }    
  }
  ramConnections.push(obj);
}

io.on('connection', function (socket) 
{
  console.log("Connected  socket id:" + socket.id);
  //console.log(socket.handshake.headers.origin);
  
  if(socket.handshake.headers.origin != "ESP_RAM")
  {
    //possible web browser connection. ESP has Origin preset to ESP_RAM
    webConnections.push(socket);
    console.log("SOCK: connection - new WEB connection");

  }
  else
  {
    // here the connections from the ESP_RAM are received.
    // add socket from ESP to the list of RAMs
    //ramConnections.push(socket);
    console.log("SOCK: connection - new RAM connection");
  }

  socket.emit('welcome', { message: 'Connected !!!!' });
  
  socket.on('connection', function (data) 
  {
    console.log("Receive =connection=> from RAM"); console.log(socket.id);
    //console.log(data);   
    console.log(JSON.stringify(data));

    var new_ram = new Object();
    new_ram.socket_id = socket.id;
    var data_json = ParseJson(JSON.stringify(data)); 
    //console.log(ParseJson(JSON.stringify(data)));
    new_ram.ram_id = data_json.ram_id; //console.log(new_ram.ram_id);
    new_ram.machine_id = data_json.machine_id
    addRAMObject(new_ram);
printRAM();
    //new connection from a RAM is received in here. Need to send a message
    // to the connected clients to signal that a new RAM is up and running and
    // data may apper 
    for(var webBrowsers = 0; webBrowsers < webConnections.length; webBrowsers++)
    {
      console.log("SOCK: RX connection => Send new_ram with data");
      var sessionID = webConnections[webBrowsers];
      sessionID.emit('new_ram', { new_ram: data })
    }

  });
  
  socket.on('hb', function (data) {
     //sendTime();
     console.log("app.js - hb function"); console.log(data);
  });

  socket.on('atime', function (data) {
     sendTime();
     console.log("app.js - sendTime function"); console.log(data);
  });


  
  //socket.on('light', function (data) {
    //console.log("light received on SERVER from ESP")
    //sendLight(data);
    //console.log(data);
   // });

  socket.on('JSON', function (data) 
  {
    //console.log(data.x);
    //console.log(kf.filter(data.x))
    // data.x = kx.filter(data.x);
    // data.y = ky.filter(data.y);
    // data.z = kz.filter(data.z);
    //io.sockets.emit('acc_data', { acc_data: data });
    //socket.broadcast.emit('acc_data', { acc_data: data });
    
    for(var webBrowsers = 0; webBrowsers < webConnections.length; webBrowsers++)
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
   console.log(socket.id)
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



