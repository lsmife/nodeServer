/**
 * Created by lsmife on 2017/5/24.
 */
const db=require('../../config_database');
const common=require('../../libs/common');


module.exports._query=(req,res)=>{

    let sql_str=`select * from role left join role_ref_permission on role = id`;
    let sql_str_r=`select * from report`;
    db.query(sql_str,(err,data)=>{

        if(err){
            res.status(400).json({
                "code":"400",
                "message":"数据库查询失败！"
            })
        }else{
            let perm_data=data;

            db.query(sql_str_r,(err,data)=>{
                if(err){
                    res.status(400).json({
                        "code":"400",
                        "message":"数据库查询失败！"
                    })
                }else{
                    let report_data=data;
                    for(m=0;m<perm_data.length;m++){
                        let perm_array_ori=[];
                        if(perm_data[m].permission==""||perm_data[m].permission.indexOf(',')==-1){
                            perm_array_ori.push(perm_data[m].permission);
                        }else{
                            perm_array_ori=perm_data[m].permission.split(',');
                        }
                        let perm_array=[];
                        for(let i=0;i<perm_array_ori.length;i++){
                            for(let j=0;j<report_data.length;j++){
                                if(parseInt(perm_array_ori[i])==report_data[j].id){
                                    perm_array.push(report_data[j].name);
                                }
                            }
                        }
                        perm_data[m].permission_name=perm_array.join().replace(/,/g,'&');
                    }
                    res.json(perm_data);
                }
            });
        }
    })

};
module.exports._get_one=(req,res)=>{


    let queryObj=req.query;
    let permissions=[];
    if(queryObj.permission==""||queryObj.permission.indexOf(',')==-1){
        permissions.push(queryObj.permission);
    }else{
        permissions=queryObj.permission.split(',');
    }
    let sql_str=`select * from category_report_reference`;
    db.query(sql_str,(err,data)=>{
        if(err){
            res.status(400).json({
                "code":"400",
                "message":"数据库查询失败"
            })
        }else{

            let root={"id":0,"pname":"星云平台","level":0,"type":0};
            let tree=[root];
            bulidTree(root,data);
            function bulidTree(root,datas){
                for(let i=0;i<datas.length;i++){
                    if(datas[i].parent==root.id){
                        let pnode=datas[i];
                        pnode.isShow=true;
                        if(permissions.indexOf(pnode.id.toString())>-1){
                            pnode.p_has=true;
                        }else{
                            pnode.p_has=false;
                        };

                        tree.push(pnode);
                        bulidTree(pnode,datas);
                    }
                }
            }
            res.status(200).json(tree);
        }
    })

};

module.exports._set=(req,res)=>{
    let queryBody=req.body;
    console.log(queryBody.role);
    let sql_str_update=`update role_ref_permission set permission='${queryBody.permission}' where role=${parseInt(queryBody.role)}`;
    console.log(sql_str_update)
    db.query(sql_str_update,(err,data)=>{
        if(err){
            res.status(400).json({
                "code":"400",
                "message":"数据库更新失败"
            })
        }else{
            res.status(200).json({
                "code":"200",
                "message":"更新成功！"
            })
        }
    })

}
// let sql_str_query=`select * from role_ref_permission where role =${queryBody.role}`;
// let sql_str_insert=`insert into role_ref_permission(role,permission) values(${queryBody.role},'${queryBody.permission}')`;
