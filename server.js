'use strict';
const express = require('express');
const conf = require('./config');
const FBeamer = require('./fbeamer');
const bodyParser = require('body-parser');
const f = new FBeamer(conf.FB);
const request = require('request');
const  XRegExp = require('xregexp');
const  patterns = require('./pattern');
const  api = require('./api');


const server = express();
const PORT = process.env.PORT || 3000;

server.get('/',(req,res) => f.registerHook(req,res)
);
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



async function bot_answer(f, data){
    
        matchPattern(data.content, async cb => {
            if(cb.intent == "true")
            {
                await f.txt(data.sender, "I didn't get what you want 😔, try again please or ask for help");
            }
            else{
               

                if(cb.case == 2)
                {
                    console.log("Here are the articles that match your request");
                    const intention = data.content.split(' ');
                    var filter = cb.intent;
                        intention.forEach((element,index) => {
                            matchPattern(element, async cb2 => {
                               //console.log("index : " + index);
                                if(cb2.case == 2 && filter.includes(cb2.intent) == false)
                                {
                                    console.log(cb2.intent)
                                    filter = filter + " " + cb2.intent;
                                }
                            });
                        });
                    console.log("filter : " + filter);
                    api.get_from_api(filter, f, data);
                    //if()
                }
                if(cb.case == 1)
                {
                    await f.txt(data.sender, cb.intent);
                }
                if(cb.case == 3)
                {
                    var help = "Here what I can do\n➡Greeting\n➡Bye\n➡Helping\n➡Giving news";
                    await f.txt(data.sender,help)
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
            case : getResult.case,
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



