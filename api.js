var inquirer = require('inquirer');
const request = require('request');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9dc2b49cbcb84a1ca22d9b7a5517671f');

const readline = require("readline");
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    terminal : false
});

async function get_from_api(filter, f , data)
{
  newsapi.v2.topHeadlines({
    q: filter,
    language: "en",
    }).then(async response => {
    
      img = ""
      if(filter =="coronavirus")
      {
        img = "https://dfcby4322olzt.cloudfront.net/wp-content/uploads/2020/03/1800x1200_coronavirus_1.jpg"

      }
      else if(filter =="news")
      {
        img = "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"
      }

    sendGenericTemplateMessage(data.sender,response.articles, img);
  });
}

async function ask(response)
{
  test = 1
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'articles',
      message: 'Do you want to see some more articles ?',
      choices: ['yes','no'],
    },
  ])
  .then(answers => {
    if(answers.articles == "yes")
    {
      console.log("From : " + response.articles[1].source["id"] + "\n" + response.articles[1].title + "\nIf you want more info about it : " + response.articles[1].url)
    }
    else{
      test = 0
      console.info('Answer:', answers.articles);
    }
  });
  return test
}

exports.get_from_api = get_from_api;

function sendImageMessage(sender, text) {
    let data = 
    { 
      "attachment":{
        "type":"image",
        "payload":{
          "url":"https://dfcby4322olzt.cloudfront.net/wp-content/uploads/2020/03/1800x1200_coronavirus_1.jpg"
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
            console.log('Error sending image messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
function sendButtonsMessage(sender,url) {
    let data = 
    { 
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Artciles that match your request",
        "buttons":[
          {
            "type":"web_url",
            "url":url,
            "title":"If you want more on the article"
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
function sendGenericTemplateMessage(sender,articles,img) {
    let data = 
    { 
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": articles[0].source["id"],
                    "subtitle": articles[0].title,
                    "image_url": img,
                    "buttons": [{
                        "type": "web_url",
                        "url": articles[0].url,
                        "title": "link to the website"
                    }],
                }, {
                    "title": articles[1].title,
                    "subtitle": articles[1].source["id"],
                    "image_url": img,
                    "buttons": [{
                      "type": "web_url",
                      "url": articles[1].url,
                      "title": "link to the website"
                  }],
                },
                {
                  "title": articles[2].title,
                  "subtitle": articles[2].source["id"],
                  "image_url": img,
                  "buttons": [{
                    "type": "web_url",
                    "url": articles[2].url,
                    "title": "link to the website"
                }],
              }
              ]
            }
        }
    }
    let access_token = "EAAoi4qvXabEBAAoWsHNMCqEKXbab4fcvF9JOZCZCU6cj2gPNsirN7L7z8IfT2HMKZCC2pWeSzCt1hDGTeLAkMBEm75A5gSOqPn7OsfeuSq6yZAcKyuT9XmBMaR9b6MJg4isNPJeCBEckJPpsF9a3UfyVI35Hyiant7Ms5oyKDQZDZD";
    request(  {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: access_token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: data,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending generic template messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
