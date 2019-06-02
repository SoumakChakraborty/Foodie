var mysql=require('mysql');
var emailjs=require('emailjs');
var sha1=require('sha1');
var middle={};
middle.getconnection=function()
{
    var conn=mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"Windows90#",
        database:"food"
    });
  return conn;  
};
middle.createServer=function()
{
    var server=emailjs.server.connect({
           user:"yelpcamp500@gmail.com",
           password:"windowS90#",
           host:"smtp.gmail.com",
           ssl:true 
    });
   return server; 
};
middle.isLoggedIn=function(req)
{
    var user=req.session.uname;
    if(user==undefined)
      return false;
    return true;  
};
middle.encrypt=function(password)
{
    var encrypted=sha1(password);
    var double=sha1("P"+encrypted+"D");
    return double;  
};
module.exports=middle;