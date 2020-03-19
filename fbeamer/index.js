'use strict';

const crypto = require('crypto');
const request = require('request');
const apiVersion = 'v6.0';

class FBeamer{

    constructor({pageAccessToken,VerifyToken,appSecret})
    {
        this.pageAccessToken = pageAccessToken;
        this.VerifyToken = VerifyToken;
        this.appSecret = appSecret;
    }

    incoming(req, res, cb) {
        res.sendStatus(200);
        if(req.body.object === 'page' && req.body.entry)
        {
            let data = req.body;
            data.entry.forEach((pageObj => {
                if(pageObj.messaging){
                    if(pageObj.messaging[0].postback){
                        //handlepostbacks
                    }else{
                        //handle messages
                        return cb(this.messageHandler(pageObj.messaging[0]));
                    }
                }
            }))

        }

    };

    txt(id,text,messaging_type = 'RESPONSE'){
        let obj = {
            messaging_type,
            recipient:{
                id
            },
            message: {
                text
            }
        };
        return this.sendMessage(obj);
    }

    sendMessage(payload){
        return new Promise((resolve,reject) =>{
            request({
                uri: `https://graph.facebook.com/${apiVersion}/me/messages`,
                qs:{
                    access_token : this.pageAccessToken
                },
                method: 'POST',
                json: payload
            },
                (error,response,body) =>{
                if(!error && response.statusCode === 200){
                    resolve({
                        mid: body.message_id
                    });
                }else{
                    reject(error);
                }
                });
        });
    };

    messageHandler(obj){
        let sender = obj.sender.id;
        let message = obj.message;
        if(message.text){
            let obj = {
                sender,
                type: 'text',
                content: message.text
            };
            return obj;
        }
    }

    verifySignature(req,res,buf){
        return(req,res,buf) =>{
            if(req.method === 'POST'){
                try{
                    console.log("boi");
                    let signature = req.headers['x-hub-signature'];
                    signature = signature.substring(5,signature.length);
                    let hash = crypto.createHmac('sha1', this.appSecret).update(buf,'utf-8');
                    if(hash.digest('hex') !== signature)
                        throw "Invalid Signature!";

                } catch (e){
                    console.log(e);
                }
            }
        }
    }

    registerHook(req,res){
        const params = req.query;
        const mode = params['hub.mode'],
            token = params['hub.verify_token'],
            challange = params['hub.challenge'];
        try{
            if(mode === 'subscribe' && token === this.VerifyToken && this.pageAccessToken !== '')
            {
                console.log("webhook registered");
                return res.send(challange);
            } else{
                throw "Could not register webhook!";
                return res.sendStatus(200);
            }
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = FBeamer;
