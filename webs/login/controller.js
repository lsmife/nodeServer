/**
 * Created by lsmife on 2017/5/26.
 */
const db=require('../../config_database');
const common=require('../../libs/common');

// /GET 处理get查询参数的请求
exports._login=(req,res)=> {
    let queryObj = req.body;
    let queryStr=`select * from user where username='${queryObj.username}'`;
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
                if(data[0].password!=queryObj.password){
                    res.status(400).json({
                        "code":"407",
                        "message":"密码错误！"
                    })
                }else{
                    // let result={
                    //     "id":data[0].id,
                    //     "email":data[0].email,
                    //     "organization":data[0].organization,
                    //     "role":data[0].role,
                    //     "username":data[0].username
                    // };
                    res.status(200).json(data[0]);
                    // console.log(req.session)
                    // res.status(200).json({
                    //     "code":"10000",
                    //     "message":"登录成功！"
                    // });
                }
            }
        }
    });
};

exports._state=(req,res)=> {

    if(req.session.userInfo){
        res.send({
            "code":"100000",
            "message":"已登录！"
        })
    }else{
        res.send({
            "code":"111111",
            "message":"请首先登录"
        })
    }
};
