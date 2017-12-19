const express =require('express');
const roles=require('./controller');

module.exports=function(){
    let router=express.Router();

    router.get('/',roles._query);

    router.post('/add',roles._insert);

    router.put('/modify',roles._update);

    router.delete('/delete/:id',roles._del);

    // router.delete('/delete_single',(req,res)=>{
    //     res.send('this is reports/delete_single API')
    // });

    return router;
};
