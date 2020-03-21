'use strict';

const express = require('express');
const conf = require('./config');
const FBeamer = require('./fbeamer');
const bodyParser = require('body-parser');
const f = new FBeamer(conf.FB);
const request = require('request');

//console.log(f);

function sendButtonsMessage(sender) {
    let data = 
    { 
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Voici des liens intéréssants",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://www.supinfo.com/articles/author/143787-nicolas-bonzom",
            "title":"Mes autres articles"
          },
          {
            "type":"postback",
            "title":"Envoie d'un postback",
            "payload":"monPostback"
          }
        ]
      }
    }
    }
    let access_token = "EAAoi4qvXabEBAAoWsHNMCqEKXbab4fcvF9JOZCZCU6cj2gPNsirN7L7z8IfT2HMKZCC2pWeSzCt1hDGTeLAkMBEm75A5gSOqPn7OsfeuSq6yZAcKyuT9XmBMaR9b6MJg4isNPJeCBEckJPpsF9a3UfyVI35Hyiant7Ms5oyKDQZDZD";
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: access_token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: data,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending buttons messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
function sendTextMessage(sender, text) {
    let data = { text:text }
    let access_token = "EAAoi4qvXabEBAAoWsHNMCqEKXbab4fcvF9JOZCZCU6cj2gPNsirN7L7z8IfT2HMKZCC2pWeSzCt1hDGTeLAkMBEm75A5gSOqPn7OsfeuSq6yZAcKyuT9XmBMaR9b6MJg4isNPJeCBEckJPpsF9a3UfyVI35Hyiant7Ms5oyKDQZDZD";
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: access_token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: data,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}



const server = express();
const PORT = process.env.PORT || 3000;

server.get('/',(req,res) => f.registerHook(req,res));
server.post('/', bodyParser.json({
    verify: f.verifySignature.call(f)
}));
server.post('/', (req,res,data) => {
    return f.incoming(req,res, async data => {
        try{
            console.log(data.content);
            bot_answer(f,data);
        }
        catch(e){
            console.log(e);
        }
    })

});

server.listen(PORT, ()=>console.log(`The bot server is running on port ${PORT}`));



const  XRegExp = require('xregexp');
const  patterns = require('./pattern');
const  api = require('./api');


const readline = require("readline");
const read = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    terminal : false
});

function user_question(){
    return "Weclome in our chatbot, we give you the news of the moment ask whatever you want\nask us something";
    //bot_answer();
}

async function bot_answer(f, data){
        matchPattern(data.content, async cb => {
            if(cb.intent == "true")
            {
                await f.txt(data.sender, "I didn't get what you want, try again please");
            }
            else{
                if(cb.intent == "news" || cb.intent == "coronavirus")
                {
                    console.log("Here are the articles that match your request");
                    var filter = cb.intent;
                    api.get_from_api(filter, f, data);
                }
                else
                {
                    await f.txt(data.sender, cb.intent);
                }
            }
       });       
}


let matchPattern = (str, cb) => {
    let getResult = patterns.find(item => {
        if(XRegExp.test(str, XRegExp(item.pattern, "i"))){
            return true;
        }
    });

    //console.log(matchPattern);
    if (getResult){
        return cb ({
            intent: getResult.intent,
            entities : createEntities(str,getResult.pattern)
        });
    }
    else{
        return cb({intent: "true"});
    }
}

let createEntities = (str, pattern) => {
    return XRegExp.exec(str,XRegExp(pattern,"i"))
}



