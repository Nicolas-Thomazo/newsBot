var inquirer = require('inquirer');
const request = require('request');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9dc2b49cbcb84a1ca22d9b7a5517671f');
const access = require('./config/development.json');
const access_token = access.FB.pageAccessToken;
const readline = require("readline");
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    terminal : false
});

async function get_from_api(filter, f , data)
{
  newsapi.v2.everything({
    q: filter,
    language: "en",
    }).then(async response => {

    if(response.articles[0] != null)
    {
      await f.txt(data.sender,"Here is what we find 💪");
      //console.log(response.articles[0]);     
      sendGenericTemplateMessage(data.sender,response.articles);
    }
    else
    {
      await f.txt(data.sender, "I'm sorry can you try something else, I'm afraid we don't have an article that match your request ☹");     
    }
  });
}


function sendGenericTemplateMessage(sender,articles) {
  for(i = 0; i < 3; i++)
  {
    if(articles[i] != null)
    {      
      if(articles[i].title == null){articles[i].title = "Title"}
      if(articles[i].urlToImage == null){articles[i].urlToImage ="https://www.slate.fr/sites/default/files/styles/1060x523/public/bl.png"}
      if(articles[i].url == null){ articles[i].url = "there is no url I'm sorry"}
      if(articles[i].source.name == null)
      { 
      articles[i].source.name = "name";
      }
    }
    else
    {
      articles.push({source: { id: 'Nul', name: 'Nul' },author: 'no author',title: "There is no articles",description: "",url: 'https://www.google.fr/',urlToImage:"https://www.slate.fr/sites/default/files/styles/1060x523/public/bl.png",publishedAt: '',content: ''})
    }
  }


  let data = 
    { 
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": articles[0].source["name"],
                    "subtitle": articles[0].title,
                    "image_url": articles[0].urlToImage,
                    "buttons": [{
                        "type": "web_url",
                        "url": articles[0].url,
                        "title": "link to the website"
                    }],
                }, {
                    "title": articles[1].title,
                    "subtitle": articles[1].source["name"],
                    "image_url": articles[1].urlToImage,
                    "buttons": [{
                      "type": "web_url",
                      "url": articles[1].url,
                      "title": "link to the website"
                  }],
                },
                {
                  "title": articles[2].title,
                  "subtitle": articles[2].source["name"],
                  "image_url": articles[2].urlToImage,
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
function sendTextMessage(sender, text) {
  let data = { text:text }
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
