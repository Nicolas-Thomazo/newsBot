# NewsBot

![bot](https://botdirectory.net/wp-content/uploads/2016/07/NewsBot-messenger_code.png)

- [🐣 Introduction](#-introduction)
- [🏃‍♀️ Steps to do](#-steps-to-do)
- [📋 Explications](#-explication)
- [👨‍🎓 Developers ](#-developers)


## 🐣 Introduction

NewsBot is a chatbot in messenger that give you the latest news about a specific domain.

Here what I can do
➡Greeting
➡Bye
➡Helping
➡Asking for whatever news

The news part is related to the api :newsapi (https://newsapi.org/)

When you aski questions to the chatbot about the news you 
- specified country (USA, France ...)
- Fields (economy, covid-19 ...)
- politics (president, conflict, election, brexit ...)
- environment (ocean, climat change, tornado ...)

## 🏃‍♀️ Steps to do

We deployed the chatbot on messenger. But all the apps in messanger must be reviewed before interacting with users on Messenger. So we couldn't put it in global, it's only local.

In order to make it run on your facebook you must follow these steps

- Create a facebook page for ypur project and link it up with facebook for developers at https://developers.facebook.com/
- On your facebook for developers page, go to your project and generate an Access Token
- Take the access token that you generated and replace the pageAccessToken with yours in the development.json file
- For the next part you can either generate a 64byte string yourself or you can use the existing string
- If you choose de generate it yourself, you have to replace the VerifyToken field in the development.json file
- Next you should install ngrok with the following command: npm i -g ngrok (you can find the docs here https://ngrok.com/)
- If you're using port 3000 for this project, you can generate a private https with the following command: nrgok http 3000
- Next you're going to register your webhook on facebook
- Find the webhook option on your facebook developers page (you can get more info on this here: https://developers.facebook.com/docs/graph-api/webhooks/getting-started/)
- Fill the callback URL field with the forwarding HTTPS link given by ngrok
- Copy and paste your previously generated VerifyToken in the Verify Token field

If you did everything right, you should get a message in your console saying that the webhook is registered :)

## 📋 Explications

The architecture of newsBot fall into the task-oriented dialog system, it is designed for a particular task (here it's about getting the news). It's set up to get information from the user to help complete the task. Like the Control structure of Frame Based Dialogue System, it has a set of slots for the job frame that specifies what the system needs to know, then define the values that each slot can take by asking questions of each.


## 👨‍🎓 Developers 

Esilv - IBO - Chatbot project

- Nicolas Thomazo
- Aron Szucs


