/**
 * Created by lsmife on 2017/5/26.
 */
const db=require('../../config_database');
const common=require('../../libs/common');

// /GET 处理get查询参数的请求
exports._aside_list=(req,res)=> {
    let queryObj = req.query;
    let roleStr=`select permission from role_ref_permission where role in(${queryObj.role})`;
    //查找角色数据
    db.query(roleStr,(err,data)=>{
        if(err) {
            res.status(400).json({
                code:"400",
                message:"数据库连接失败！"
            })
        }else{
            /*生成多角色用户，报表数组*/
            let perm_str="";
            for(let i =0;i<data.length;i++){
                if(i==data.length-1){
                    perm_str+=data[i].permission;
                }else{
                    perm_str+=data[i].permission+',';
                }
            }
            let listStr=`select * from category_report_reference`;
            let perm_arr=perm_str.split(',');
            db.query(listStr,(err,list)=>{
                if(err){
                    res.status(400).json(err);
                }else{

                    //抽取权限对应的目录结构
                    let listArray=[];
                    let root={"id":"0","pname":"星云平台","level":"0","description":"根节点","type":"0"};
                    bulidTree(root,list);
                    function bulidTree(root,data){
                        for(let i=0;i<data.length;i++){
                            if(data[i].parent==root.id){
                                bulidTree(data[i],data);
                            }
                            if(data[i].type=="1" && perm_arr.indexOf(data[i].id.toString())>-1){
                                data[i].isAccess=true;

                                if(listArray.indexOf(data[i])==-1){
                                    listArray.unshift(data[i]);
                                }
                                // console.log(data[i])
                            }

                            if(data[i].isAccess==true && data[i].parent==root.id){
                                root.isAccess=true;
                                if(listArray.indexOf(root)==-1){
                                    listArray.unshift(root);
                                }

                            }
                        }
                    }

                    //构建用于显示的目录树结构(子节点)
                    // let asideLists=[];
                    buildList(root,listArray);
                    res.json(root);
                    function buildList(root,datas){
                        root['children']=[];
                        for(let i=0;i<datas.length;i++){
                            if(datas[i].parent==root.id){
                                let node=datas[i];
                                root.children.push(datas[i]);
                                // asideLists.push(datas[i]);
                                buildList(datas[i],datas);
                            }
                        }
                    }

                }

            })
        }
    });
};


