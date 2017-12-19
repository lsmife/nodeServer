const express =require('express');
const reportCategory=require('./controller');

module.exports=()=>{
  let router=express.Router();
  router.get('/',reportCategory._query);
  router.post('/add',reportCategory._insert);
  router.delete('/delete/:id',reportCategory._del);
  router.put('/modify',reportCategory._modify);
  return router;
};
