const express =require('express');
const aside=require('./controller');

module.exports=function(){
    let router=express.Router();
    router.get('/',aside._aside_list);

    return router;
};
