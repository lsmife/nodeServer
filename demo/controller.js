/**
 * Created by lsmife on 2017/11/13.
 */
const db=require('../config_database');
const common=require('../libs/common');
const asnData=require('../demo/data.json');
exports._list=(req,res)=> {
    let queryObj = req.query;
    if(Object.getOwnPropertyNames(queryObj).length==0){
        let queryStr=`select * from reports`;
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
        let queryParams=queryObj['keywords'];
        console.log('\''+queryParams+'\'')
        let queryStr=`select * from reports where
                          concat( id,rname,curl)
                          like '%${queryParams}%' 
                     `;
        console.log(queryStr)
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
}
exports._add=(req,res)=> {
    let queryBody=req.body;
    let sql_str=`INSERT INTO reports(rname,parent,curl,role,type)
   values('${queryBody.rname}',${queryBody.parent},'${queryBody.curl}',${queryBody.role},1)`;
    console.log(sql_str)
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
}
exports._del=(req,res)=> {
    let pid=req.body.id;
    let sql_str= `DELETE from reports where id=${pid}`;
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
}
exports.login=(req,res)=> {
    let queryObj = req.body;
    console.log(req.body)
    let queryStr=`select * from users where username='${queryObj.username}'`;
    db.query(queryStr,(err,data)=>{
        if(err) {
            res.status(400).send({
                code:"10000",
                message:"数据库连接失败！"
            })
        }else{
            if(data==""){
                res.status(400).json({
                    "code":"406",
                    "message":"用户名不存在！"
                })
            }else{
                if(data[0].pwd!=queryObj.pwd){
                    res.status(400).json({
                        "code":"407",
                        "message":"密码错误！"
                    })
                }else{
                    let resposeData = {};
                    for(var key in data[0]){
                        if(key!=='pwd'){
                            resposeData[key]=data[0][key];
                        }
                    }
                    res.status(200).json(resposeData);
                }
            }
        }
    });
}
exports.aside=(req,res)=> {
    let queryStr=`select * from reports`;
    db.query(queryStr,(err,reports)=>{
        if(err) {
            res.status(400).send({
                code:"10000",
                message:"数据库连接失败！"
            })
        }else{
            let queryStrResptory='select * from resptory'
            // console.log(data);
            db.query(queryStrResptory,(err,reptorys)=>{
                if(err) {
                    res.status(400).send({
                        code:"10000",
                        message:"数据库连接失败！"
                    })
                }else{
                    var lists=[];
                    for(var j=0;j<reptorys.length;j++){
                        var cur=reptorys[j];
                        if(Object.prototype.toString.call(cur.parent) === '[object Null]'){
                            continue;
                        }
                        cur['childrens']=[];
                        for(var i=0;i<reports.length;i++){
                            if(reports[i]['parent']===cur.id){
                                cur['childrens'].push(reports[i]);
                            }
                        }
                        lists.push(cur);
                    }
                    res.json(lists);
                }
            });
        }
    });
}
exports.reptory=(req,res)=> {
    let queryStr=`select * from reptory`;
    db.query(queryStr,(err,reports)=>{
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
exports._asn=(req,res)=>{
    res.json(asnData);
}