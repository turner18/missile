var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt'),
    ca: fs.readFileSync('/etc/ssl/server.ca.crt')
};
ThunderConnector = require('thunder-connector');
ThunderConnector.connect();

https.createServer(options, function(req, res) {
    function sendResponse() {
        myResponse = JSON.stringify(echoResponse);
        res.setHeader('Content-Length', myResponse.length);
        res.writeHead(200);
        res.end(myResponse);
    }
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
        	// console.log("MISSILE IS OPEN");
            console.dir(jsonString, {depth: 5});
            echoResponse = {};
            echoResponse.version = "1.0";
            echoResponse.response = {};
            echoResponse.response.outputSpeech = {};
            
            echoResponse.response.outputSpeech.type = "PlainText"
            echoResponse.response.outputSpeech.text = "Missiles at the ready.  Awaiting your command"
            echoResponse.response.shouldEndSession = "false";
            theRequest = JSON.parse(jsonString);
            if (theRequest.request.type == 'IntentRequest') {
            	if (typeof theRequest.request.intent !== 'undefined')
            	{
            		console.log(theRequest.request.intent);
                    
                    choice = theRequest.request.intent.slots.Choice.value;
                	degrees = theRequest.request.intent.slots.Degrees.value;
            	}
                if (isNaN(degrees)) {
                	degrees = 5;
                }
                var stopTime = 0;
                console.log("Choice: " + choice);
                console.log("Degrees: " + degrees);
                echoResponse.response.outputSpeech.text = "Turning" + choice + degrees + "degrees"

                if (choice === "left" || choice === "left degrees")
                {
                    stopTime = Math.floor(degrees *22.3);
                    console.log("Stoptime: ",stopTime);
                    console.log("GOING LEFT");
                    setTimeout(function(){ThunderConnector.command('left');},0);
                    setTimeout(function(){ThunderConnector.command('stop');},stopTime);
                }
                if (choice === "right" || choice === "right degrees")
                {
                    stopTime = Math.floor(degrees *22.3);
                    console.log("Stoptime: ",stopTime);
                    console.log("GOING RIGHT");
                    setTimeout(function(){ThunderConnector.command('right');},0);
                    setTimeout(function(){ThunderConnector.command('stop');},stopTime);
                }
                if (choice === "up" || choice === "up degrees")
                {
                    stopTime = Math.floor(degrees *22.3);
                    console.log("Stoptime: ",stopTime);
                    console.log("GOING UP");
                    setTimeout(function(){ThunderConnector.command('up');},0);
                    setTimeout(function(){ThunderConnector.command('stop');},stopTime);
                }
                if (choice === "down" || choice === "down degrees")
                {
                    stopTime = Math.floor(degrees *22.3);
                    console.log("Stoptime: ",stopTime);
                    console.log("GOING DOWN");
                    setTimeout(function(){ThunderConnector.command('down');},0);
                    setTimeout(function(){ThunderConnector.command('stop');},stopTime);
                }
                if (choice === "light")
                {
                    echoResponse.response.outputSpeech.text = "Lights on"
                    console.log("LIGHTS ON");
                    setTimeout(function(){ThunderConnector.command('ledOn');},10);
                }
                if (choice === "dark")
                {
                    echoResponse.response.outputSpeech.text = "Lights off"
                    console.log("LIGHTS OFF");
                    setTimeout(function(){ThunderConnector.command('ledOff');},10);
                }
                if (choice === "fire")
                {
                    echoResponse.response.outputSpeech.text = "Fire"
                    setTimeout(function(){ThunderConnector.command('fire');},10);
                    
                    // setTimeout(function(){ThunderConnector.command('stop');},1000);
                }

                echoResponse.response.card = {};
                echoResponse.response.card.type = "Simple";
                echoResponse.response.card.title = "Template Title";
                echoResponse.response.card.subtitle = "Template SubTitle";
                echoResponse.response.card.content = choice;
                echoResponse.sessionAttributes = {};
                echoResponse.response.shouldEndSession = "true";
            }

            // if (typeof theRequest.request.intent !== 'undefined') {
            //     choice = theRequest.request.intent.slots.Choice.value;
            // }
            // myResponse = JSON.stringify(echoResponse);
            // res.setHeader('Content-Length', myResponse.length);
            // res.writeHead(200);
            // res.end(myResponse);
            // console.log('from post', myResponse);

            sendResponse();
            console.dir(echoResponse, {depth: 5});

        });
    } else {
    	myResponse = JSON.stringify(echoResponse);
        res.setHeader('Content-Length', myResponse.length);
        res.writeHead(200);
        res.end(myResponse);

        sendResponse();
    }
}).listen(3000); //Put number in the 3000 range for testing and 443 for production