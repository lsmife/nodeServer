const crypto=require('crypto');
const stateMessage=require('./state_codes.json');
module.exports={
    md5:function(str){
        const MD5_SUFFIX="zh_&&zhonghui&&众荟";
        let obj=crypto.createHash('md5');
        obj.update(str+MD5_SUFFIX );
        return obj.digest('hex');
    },
    sendMessage:function(str){

        return stateMessage.find((n)=>n.code==str);

    },
    //将query字符串转换为SQL查询字符串
    JsonToQuery:function (queryObj){
        let queryArray = Object.getOwnPropertyNames(queryObj);
        let queryStr = "";
        for (let i = 0; i < queryArray.length; i++) {

            if (i == queryArray.length - 1) {
                queryStr += queryArray[i] + "='" + queryObj[queryArray[i]]+"'";
            } else {
                queryStr += queryArray[i] + "='" + queryObj[queryArray[i]] + "' AND ";
            }
        }
        return queryStr;
    }
};