const express =require('express');
const users=require('./controller');

module.exports=function(){
    let router=express.Router();

    router.get('/',users._query);

    router.post('/add',users._insert);

    router.put('/modify',users._update);

    router.delete('/delete/:id',users._del);

    // router.delete('/delete_single',(req,res)=>{
    //     res.send('this is reports/delete_single API')
    // });

    return router;
};
