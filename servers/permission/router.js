/**
 * Created by lsmife on 2017/5/24.
 */
const express =require('express');
const permission=require('./controller');

module.exports=function(){
    let router=express.Router();

    router.get('/',permission._query);
    router.get('/getone',permission._get_one)
    router.put('/set',permission._set);

    return router;
};
