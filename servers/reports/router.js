const express =require('express');
const report=require('./controller');

module.exports=function(){
    let router=express.Router();

    router.get('/',report._query);

    router.post('/add',report._insert);

    router.put('/modify',report._update);

    router.delete('/delete/:id',report._del);

    // router.delete('/delete_single',(req,res)=>{
    //     res.send('this is reports/delete_single API')
    // });

    return router;
};
