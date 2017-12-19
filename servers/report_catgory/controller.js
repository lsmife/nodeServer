const db=require('../../config_database');
const common=require('../../libs/common');

exports._query=(req,res)=>{
    let queryObj = req.query;
    if(Object.getOwnPropertyNames(queryObj).length==0){
        let queryStr=`select id,name,level,description,parent,type,icon_name,conn_url from report_category`;
        db.query(queryStr,(err,data)=>{
            if(err) {
                res.status(400).send({
                    code:"10000",
                    message:"数据库连接失败！"
                })
            }else{

                let tree=[{"id":"0","name":"星云平台","level":"0","description":"根节点","type":"0"}];
                let root={"id":"0","name":"星云平台","level":"0","description":"根节点","type":"0"};
                bulidTree(root,data);
                function bulidTree(root,datas){
                    for(let i=0;i<datas.length;i++){
                        // datas[i]['children']=[]
                        if(datas[i].parent==root.id){
                            let node=datas[i];
                            tree.push(datas[i]);
                            bulidTree(datas[i],datas);
                        }
                    }
                }

                res.json(tree);
            }
        });
    }
    else {
        let queryParams = queryObj.key_word;

        let queryStr = `select 
                           id,
                           name,
                           description,
                           level,
                           conn_url
                       from report_category 
                       where 
                          concat(id,name,level,description,conn_url) like '%${queryParams}%' `;
        db.query(queryStr, (err, data) => {
            if (err) {
                res.status(400).send({
                    code: "10000",
                    message: "数据库连接失败！"
                })
            } else {
                res.json(data);
            }
        });
    }
};
exports._insert=(req,res)=>{
    let queryBody=req.body;

    let sql_str=`insert into
                 report_category(name,
                 level,
                 description,
                 parent,
                 icon_name,
                 conn_url)
                 values(
                 '${queryBody.catory_name}',
                 ${queryBody.catory_level},
                 '${queryBody.catory_desc}',
                 ${queryBody.catory_parent},
                 '${queryBody.catory_icon}',
                 '${queryBody.catory_conn_url}')`;
    console.log(sql_str)
    db.query(sql_str,(err)=>{
        if(err) {
            res.status(400).send({
                code: "10000",
                message: "数据库连接失败！"
            })
        }else{
            res.status(200).json({
                "status":"200",
                "message":"添加成功"
            })
        }
    });

};

exports._modify=(req,res)=>{
    let queryBody=req.body;
    let sql_str=`UPDATE report_category SET ${queryBody.key}="${queryBody.value}" where id=${queryBody.id}`;
    db.query(sql_str,(err)=>{
        if(err){
            res.status(400).send({
                code: "10000",
                message: "数据库连接失败！"
            })
        }else{
            res.status(200).json({
                "status":"200",
                "message":"修改成功"
            })
        }

    })
};
exports._del=(req,res)=>{
    let pid=req.params.id;
    let sql_str=`delete from report_category where id =${pid}`;
    let check_str=`select id from report_category where parent =${pid}`;
    db.query(check_str,(err,data)=>{
        if(data){
            if(data.length==0){
                db.query(sql_str,(err)=>{
                    if(err){
                        res.status(400).json({
                            code: "10000",
                            message: "数据库连接失败！"
                        })
                    }else{
                        res.status(200).json({
                            "status":"200",
                            "message":"删除成功！"
                        })
                    }
                })
            }else{
                res.status(500).json({
                    "status":"500",
                    "message":"存在子目录，请先删除子目录！"
                });
            }
        }else {
            res.json(err);
        }
    });


};