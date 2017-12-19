
var needle=require('needle');
exports._get=(req,res)=> {

    let queryBody=req.query;
    let tabealu_name=queryBody.name;
    switch(queryBody.name){
        case 'rms_monitor_fc_detail' :
            tabealu_name='rms_monitor_fc_detail&#47;sheet3';
            break;
        case 'mac_predict_accuracy_monitor_daily' :
            tabealu_name='mac_predict_accuracy_monitor_daily&#47;sheet0';
            break;
        case '_3sheet1' :
            tabealu_name='_3&#47;sheet1';
            break;
        case '_3sheet0' :
            tabealu_name='_3&#47;sheet0';
            break;
        case '_4sheet1' :
            tabealu_name='_4&#47;sheet1';
            break;
        case '_4sheet0' :
            tabealu_name='_4&#47;sheet0';
            break;
        case '_1sheet4':
            tabealu_name='_1&#47;sheet4';
            break;
        case '_1sheet3':
            tabealu_name='_1/sheet3?:iid=35';
            break;
        case '_1sheet2':
            tabealu_name='_1/sheet2?:iid=35';
            break;
        case '_1sheet1':
            tabealu_name='_1/sheet1?:iid=35';
            break;
        case '_1sheet0':
            tabealu_name='_1/sheet0?:iid=35';
            break;

    }

    let data = {
        username: 'admin',
        client_ip: '192.168.20.39'
    };
    needle.post('http://192.168.20.226/trusted', data, { multipart: true },function(err, resonse, body){
        if(body){
            let tabealu=`
                        <script type='text/javascript' src='http://192.168.20.226/javascripts/api/viz_v1.js'></script>
                        <div class='tableauPlaceholder' >
                            <object class='tableauViz' width='100%' height='636' style='width: 100%; height: 636px;display:none;'>
                                <param name='host_url' value='http%3A%2F%2F192.168.20.226%2F' />
                                <param name='name' value='${tabealu_name}' />
                                <param name='tabs' value='no' />
                                <param name='toolbar' value='no' />
                                <param name="ticket" value="${body.toString()}" />
                            </object> 
                        </div>`;

            res.json({tabealu:tabealu});

        }else{
            res.send({
                code:"400",
                message:"请求tabealu服务器失败"
            })
        }
    });
}