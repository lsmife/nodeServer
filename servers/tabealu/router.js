const express =require('express');
const ticket=require('./controller');

module.exports=function(){
    let router=express.Router();

    router.get('/getTicket',ticket._get);

    return router;
};
