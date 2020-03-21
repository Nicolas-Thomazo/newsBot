"use strict";

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
    console.log("Weclome in our chatbot, we give you the news of the moment ask whatever you want\nask us something")
    bot_answer();
}

async function bot_answer(){
    read.on('line',(reply) => {
        matchPattern(reply, cb => {
           if(cb.intent == "hello")
           {
               console.log("Hello, I'm here to help you\nHow are you");
           }
           else if(cb.intent == "Im'fine and you ?")
           {
               console.log(cb.intent);
           }
           else if(cb.intent == "how can I help you")
           {
               console.log(cb.intent);
           }
           else if(cb.intent == "coronavirus")
           {
               console.log("Here are the articles that match your request");
               var filter = 'coronavirus';
               api.get_from_api(filter);               
           }
           else if(cb.intent == "news")
           {
               console.log("Here are the articles that match your request");
               var filter = 'news';
               api.get_from_api(filter);
               
           }   
           else if(cb.intent == "see you another time")
           {
               console.log(cb.intent);
               read.close();
           }     
           else{
               console.log("I didn't get what you want, try again please");
           } 
       });       
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

//user_question()


