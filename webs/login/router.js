const express =require('express');
const login=require('./controller');

module.exports=function(){
    let router=express.Router();
    router.post('/',login._login);
    router.get('/state',login._state);
    return router;
};
