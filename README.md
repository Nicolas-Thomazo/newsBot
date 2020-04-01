# NewsBot

Keep up to date with the latest news

- [🐣 Introduction](#-introduction)
- [🏃‍♀️ Steps to do](#%E2%80%8D-steps-to-do)
- [📋 Explications](#-explications)
- [👨‍🎓 Developers ](#-developers)


## 🐣 Introduction

NewsBot is a chatbot in messenger that give you the latest news about a specific domain.

Here what I can do  
- Greeting  
- Bye   
- Helping   
- Asking for whatever news

The news part is related to the api :newsapi (https://newsapi.org/)

When you ask a question to the chatbot about the news you can specify
- countries (USA, France ...)
- fields (economy, covid-19 ...)
- politics (president, conflict, election, brexit ...)
- environments (ocean, climat change, tornado ...)

## 🏃‍♀️ Steps to do

We deployed the chatbot on messenger. But all the apps in messanger must be reviewed before interacting with users on Messenger. So we couldn't put it in global, it's only local for the moment.

In order to make it run on your facebook you must follow these steps

- Create a facebook page for your project and link it up with facebook for developers at https://developers.facebook.com/
- On your facebook for developers page, go to your project and generate an Access Token
- Take the access token that you generated and replace the pageAccessToken with yours in the development.json file
- For the next part you can either generate a 64byte string yourself or you can use the existing string
- If you choose de generate it yourself, you have to replace the VerifyToken field in the development.json file
- At this point, you can start your server: node server.js
- Next you should install ngrok with the following command: npm i -g ngrok (you can find the docs here https://ngrok.com/)
- If you're using port 3000 for this project, you can generate a private https with the following command: nrgok http 3000
- Next you're going to register your webhook on facebook
- Find the webhook option on your facebook developers page (you can get more info on this here: https://developers.facebook.com/docs/graph-api/webhooks/getting-started/)
- Fill the callback URL field with the forwarding HTTPS link given by ngrok
- Copy and paste your previously generated VerifyToken in the Verify Token field

If you did everything right, you should get a message in your console saying that the webhook is registered :)
You should be able to receive messages sent to your bot on facebook and it should be able to answer.

Once all these steps are done you need to run ngrok and server.js in order to have the ot running.

## 📋 Explications

How does our chatbot works ?

The architecture of newsbot is a task-oriented dialog system. It was created in order to respond to a particular task, in our case, give some news. We obtain the intention of the user thanks to our file pattern. Then we send a request on the newsapi in order to get the 3 headline articles.

## Presentation video

https://www.youtube.com/watch?v=vsCjoIk5w_g&fbclid=IwAR1trryjQdXLfcQBxr2XgaI_QlUS7pVhpwD-XR3aUjnre1AeMetQ1wATBbc

## 👨‍🎓 Developers 

Esilv - IBO - Chatbot project

- Nicolas Thomazo
- Aron Szucs


