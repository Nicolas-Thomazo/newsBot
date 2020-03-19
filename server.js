'use strict';

const express = require('express');
const conf = require('./config');
const FBeamer = require('./fbeamer');
const bodyParser = require('body-parser');
const f = new FBeamer(conf.FB);
//console.log(f);

const server = express();
const PORT = process.env.PORT || 3000;

server.get('/',(req,res) => f.registerHook(req,res));
server.post('/', bodyParser.json({
    verify: f.verifySignature.call(f)
}));
server.post('/', (req,res,data) => {
    return f.incoming(req,res, async data => {
        try{
            if(data.content === 'Hello')
            {
                console.log(data.content);
                await f.txt(data.sender, 'jetfuel cant melt steel beams :((');
            }
        }
        catch(e){
            console.log(e);
        }
    })

});

server.listen(PORT, ()=>console.log(`The bot server is running on port ${PORT}`));
