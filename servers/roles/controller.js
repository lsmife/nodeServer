// const messages=require('../libs/state_codes.json');
// const common=require('../libs/common');
// router.post('/login/admin',(req,res)=>{
//     var username=common.md5(req.body.username);
//     var pwd=req.body.pwd;
// });
const db=require('../../config_database');
const common=require('../../libs/common');


// /GET 处理get查询参数的请求
exports._query=(req,res)=> {

    let queryObj = req.query;
    if(Object.getOwnPropertyNames(queryObj).length==0){
        let queryStr=`select id,name,description
            from role`;

        db.query(queryStr,(err,data)=>{

            if(err) {
                res.status(400).send({
                    code:"10000",
                    message:"数据库连接失败！"
                })
            }else{
                // console.log(data);
                res.json(data);
            }
        });
    }else{

        let queryParams=queryObj.key_word;
        let queryStr=`select id,name,description
            from role
            where concat(id,
                name,
                description)
            like '%${queryParams}%'`;

        db.query(queryStr,(err,data)=>{
            if(err) {
                res.status(400).send({
                    code:"10000",
                    message:"数据库连接失败！"
                })
            }else{
                res.json(data);
            }
        });
    }
};

// /POST 添加数据接口
exports._insert=(req,res)=> {
    let queryBody=req.body;
    let sql_str=`insert into role (name,description) 
        values('${queryBody.name}','${queryBody.desc}');`
    db.query(sql_str,(err,data)=>{

        if(err){
            res.status(400).json({
                "code":"400",
                "message":"数据库写入失败"
            })
        }else{
            res.status(200).json({
                "code":"200",
                "message":"添加成功！"
            })
        }
    })
};

exports._update=(req,res)=>{
    let queryBody=req.body;
    let sql_str=`UPDATE role SET ${queryBody.key}="${queryBody.value}" where id=${queryBody.id}`;
    db.query(sql_str,(err,data)=>{
        if(err){
            res.status(400).json({
                "code":"400",
                "message":"数据库写入失败"
            })
        }else{
            res.status(200).json({
                "code":"200",
                "message":"添加成功！"
            })
        }
    })
};

exports._del=(req,res)=>{
    let pid=req.params.id;
    let sql_str= `DELETE from role where id=${pid}`;
    db.query(sql_str,(err,data)=>{
        if(err){
            res.status(400).json({
                "code":"400",
                "message":"数据库写入失败"
            })
        }else{
            res.status(200).json({
                "code":"200",
                "message":"删除成功！"
            })
        }
    })
};