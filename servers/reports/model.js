const db=require('../../config_database');

let datas=[];
db.query('SELECT * FROM user',(err,data)=>{

    if(err) {
        throw err;
    }else{
        datas=data;
        console.log(datas);
    }
});
console.log(datas);