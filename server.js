const express=require('express');
const expressStatic=require('express-static');
const expressSession=require('express-session');
const ejs=require('ejs');
const expressRouter=require('express-route');
const mysql=require('mysql');
const multer=require('multer');
const multerObj=multer({dest:'./static/upload'});
const consolidate=require('consolidate');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const bodyParser=require('body-parser');

var server=express();
server.listen(9090);
//1、获取请求数据
//get自带
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(multerObj.any());
//2、cookie session
server.use(cookieParser());
(function(){
    let keys=[];
    for(let i=0;i<10000;i++){
        keys[i]='nbweb_'+Math.random();
    }
    server.use(cookieSession({
        name:'session',
        keys:keys,
        maxAge:24*3600*1000
    }));
})();


//3.模板
// server.engine('html',consolidate.ejs);
// server.set('views','templates');
// server.set('view engine','html');

//4.route
server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,X-Access-Token,X-Key");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Cache-Control','no-cache');
    next();
});

server.use('/api/login',require('./webs/login/router.js')());
server.use('/api/aside_list',require('./webs/asidelist/router.js')());
server.use('/api/reports',require('./servers/reports/router.js')());
server.use('/api/report_catgory',require('./servers/report_catgory/router.js')());
server.use('/api/users',require('./servers/users/router.js')());
server.use('/api/roles',require('./servers/roles/router.js')());
server.use('/api/permission',require('./servers/permission/router.js')());
server.use('/api/tabealu',require('./servers/tabealu/router.js')());

server.use('/demo',require('./demo/router.js')());

//5、default static
// server.use(expressStatic('./static/'));