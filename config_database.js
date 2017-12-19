/**
 * Created by lsmife on 2017/5/16.
 */
var mysql=require('mysql');
//DB config
module.exports= mysql.createPool({
                    host:"localhost",
                    user:"root",
                    password:"admin",
                    database:"test"
                });
// module.exports= mysql.createPool({
//     host:"192.168.20.214",
//     user:"root",
//     password:"admin",
//     database:"nbwebserver"
// });