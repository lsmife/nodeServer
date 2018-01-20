/**
 * Created by lsmife on 2017/11/13.
 */
const express =require('express');
const test=require('./controller');

module.exports=function(){
    let router=express.Router();
    router.get('/reports-list',test._list);
    router.post('/reports-add',test._add);
    router.delete('/reports-del',test._del);
    router.get('/aside',test.aside);
    router.post('/login',test.login);
    router.get('/pointData',test._asn);
    router.get('/pointLine',test._asn);
    return router;
};
