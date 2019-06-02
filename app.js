var express=require('express');
var app=express();
var middle=require("./modules/middleware");
var session=require('express-session');
var body=require('body-parser');
var flash=require('connect-flash');
var stripe=require('stripe')('sk_test_BOogfMcZeVM8rY6Y6YOJRce5001MrrT966');
var method=require('method-override');
app.use(method("_method"));
app.use(flash());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(body.urlencoded({extended:true}));
app.use(session({
       secret:"This is secret to me and me only",
       resave:false,
       saveUninitialized:false,
       cookie:{maxAge:94608000000,signed:true}
}));
app.get("/",function(req,res)
{
   var state=middle.isLoggedIn(req);
   var conn=middle.getconnection();
   conn.query("select * from food where type='mexican'",function(e1,r1,f1)
   {
    conn.query("select * from food where type='chinese'",function(e2,r2,f2)
    {
      conn.query("select * from food where type='italian'",function(e3,r3,f3)
      {
        conn.query("select * from food where type='continental'",function(e4,r4,f4)
        {
          conn.query("select * from food where actual_type='Indian'",function(e5,r5,f5)
         {
                res.render("landing",{msg:req.flash("msg"),state:state,Indian:r5,Mexican:r1,Chinese:r2,Italian:r3,Continental:r4});            
          });       
        });
      });
    });
   });
});
app.post("/signup",function(req,res)
{
    var fname=req.body.fname;
    var lname=req.body.lname;
    var user=req.body.username;
    var pass=req.body.password;
    var encrypt=middle.encrypt(pass);
    encrypt=middle.encrypt("P"+encrypt+"D");
    var conn=middle.getconnection();
  conn.query("select * from user where username='"+user+"'",function(e,r,f)
  { 
    if(r.length!=0)
    {
      req.flash('msg','Username exists');
      res.redirect("back");
    }
    else
    {  
      conn.query("insert into user values('"+fname+"','"+lname+"','"+user+"','"+encrypt+"')",function(err,result,fields)
      {
       if(err)
         console.log(err);
       else
         res.redirect("back");  
      });
    }
  });
});
app.post("/signin",function(req,res)
{
    var user=req.body.username;
    var pass=req.body.password;
    var encrypt=middle.encrypt(pass);
    encrypt=middle.encrypt("P"+encrypt+"D");
    var conn=middle.getconnection();
    conn.query("select * from user where username='"+user+"'",function(err,result,fields)
    {
        if(result.length==0)
        {
          req.flash('msg','Username does not exist');
          res.redirect("/");
        }
        else
        {
           if(encrypt!=result[0].password)
            {
              req.flash('msg','Wrong password');
              res.redirect("/"); 
            }
            else
            {
              req.session.uname=user;
              res.redirect("back");
            }
        }
    });
});
app.get("/signout",function(req,res)
{
     req.session.destroy(function(err)
     {
       if(err)
         console.log(err);
       else
        res.redirect("/");  
     });
});
app.get("/item/:type/:name",function(req,res)
{
    var state=middle.isLoggedIn(req);
    var conn=middle.getconnection();
    conn.query("select * from food where type='"+req.params.type+"'and name='"+req.params.name+"'",function(err,result,fields)
    {
       res.render("showitem",{food:result,state:state,msg:req.flash("msg")});
    });
});
app.get("/item/:type",function(req,res)
{
  var conn=middle.getconnection();
  var state=middle.isLoggedIn(req);
  conn.query("select * from food where type='"+req.params.type+"'",function(err,result,fields)
  {
     res.render("indianitems",{food:result,state:state});
  });
});
app.get("/buy/:type/:name",function(req,res)
{
    var state=middle.isLoggedIn(req);
    var conn=middle.getconnection();
    if(state==false)
    {
       req.flash("msg","You must Sign In to buy the product");
       res.redirect("/item/"+req.params.type+"/"+req.params.name);
    }
    else
    {
      conn.query("select * from price P natural join(select * from food where type='"+req.params.type+"'and name='"+req.params.name+"')F",function(err,result,fields)
      {
            res.render("buypage",{food:result}); 
      });
   }
});
app.post("/placeorder/:type/:name",function(req,res)
{
     var address=req.body.address;
     var phone=req.body.phone;
     var quantity=req.body.quantity;
     var d=new Date();
     var date=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
     var time=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
     var orderID="OD"+req.session.uname+req.params.type+req.params.name+date+time+req.connection.remoteAddress+req.sessionID;
     orderID=middle.encrypt(orderID);
     var conn=middle.getconnection();
     conn.query("select * from price where type='"+req.params.type+"'and name='"+req.params.name+"'",function(err,result,fields)
     {
          conn.query("insert into process values('"+orderID+"','"+req.session.uname+"','"+req.params.name+"','"+req.params.type+"','"+quantity+"','"+date+"','"+time+"','"+address+"','"+phone+"','"+(result[0].price*parseInt(quantity))+"')",function(e,r,f)
          {
             if(e)
              console.log(e);
             else
              res.redirect("/payment"); 
          });   
     });
});
app.get("/orders",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
       res.redirect("/");
    else
    {
       var conn=middle.getconnection();
       conn.query("select * from food F natural join(select * from food_order where username='"+req.session.uname+"')O",function(err,result,fields)
       {
           if(err)
            console.log(err);
           res.render("orderspage",{orders:result,username:req.session.uname}); 
       });
    }   
});
app.get("/addtocart/:type/:name",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
    {
       req.flash("msg","You must be signed in to add to cart");
       res.redirect("back");
    }
    else
    {
      var conn=middle.getconnection();
      conn.query("select * from food F natural join(select * from price where type='"+req.params.type+"'and name='"+req.params.name+"')P",function(err,result,fields)
      {
          conn.query("insert into cart values('"+req.session.uname+"','"+req.params.name+"','"+req.params.type+"','"+result[0].photo+"','"+result[0].price+"')",function(e,r,f)
          {
             req.flash("msg","Successfully added to cart");
             res.redirect("back");
          });
      });
    }
});
app.get("/cart",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
      res.redirect("/");
    else
    {
       var conn=middle.getconnection();
       conn.query("select * from cart where username='"+req.session.uname+"'",function(err,result,fields)
       {
           if(err)
             console.log(err);
           else
             res.render("cartpage",{cart:result,username:req.session.uname}); 
       });
    }  
});
app.get("/delete/:type/:name",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
      res.redirect("/");
     else
     {
        var conn=middle.getconnection();
        conn.query("delete from cart where username='"+req.session.uname+"' and food_name='"+req.params.name+"' and food_type='"+req.params.type+"'",function(err,result,fields)
        {
          if(err)
            console.log(err);
          else
            res.redirect("back");
        });
     } 
});
app.post("/checkout",function(req,res)
{
  var state=middle.isLoggedIn(req);
  var quantity=req.body.quantity;
  var address=req.body.address;
  var phone=req.body.phone;
  var d=new Date();
  if(state==false)
    res.redirect("/");
  else
  {
     var conn=middle.getconnection();
     conn.query("select * from price P join (select * from cart where username='"+req.session.uname+"')C where P.name=C.food_name and P.type=C.food_type",function(err,result,fields)
     {
       for(var i=0;i<result.length;i++)
        {
            var date=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
            var time=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            var orderID="OD"+req.session.uname+result[i].type+result[i].name+date+time+req.connection.remoteAddress+req.sessionID;
            orderID=middle.encrypt(orderID);
            conn.query("insert into process values('"+orderID+"','"+req.session.uname+"','"+result[i].name+"','"+result[i].type+"','"+quantity[i]+"','"+date+"','"+time+"','"+address+"','"+phone+"','"+(result[i].price*parseInt(quantity[i]))+"')",function(e,r,f)
            {
                if(e)
                 console.log(e); 
            });
         }
         conn.query("delete from cart where username='"+req.session.uname+"'",function(e1,r1,f1)
         {
         });
         res.redirect("/payment");        
     });
  } 
});
app.get("/getprice/:name/:type",function(req,res)
{
     var name=req.params.name;
     var type=req.params.type;
     name=name.trim();
     type=type.trim();
    var state=middle.isLoggedIn(req);
    var obj={};
    obj.price=[];
    if(state==false)
      res.redirect("/");
    else
    {
      var conn=middle.getconnection();
      conn.query("select * from price where name='"+name+"'and type='"+type+"'",function(err,result,fields)
      {
          if(err)
            console.log(err);
          obj.price.push(result[0]);
          res.json(obj);
      });
    }
});
app.get("/payment",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
      res.redirect("/");
    else
    {
      var conn=middle.getconnection();
      conn.query("select * from food F natural join(select * from process where username='"+req.session.uname+"')P",function(err,result,fields)
      {
           if(result.length==0)
              res.redirect("/");
            else
            {
                 conn.query("select sum(price) as total from process where username='"+req.session.uname+"'",function(e,r,f)
                 {
                    res.render("payment",{order:result,total:r[0].total});
                 });
            }   
      });
    }  
});
app.get("/product/delete/:name/:type",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
     res.redirect("/");
    else
    {
      var conn=middle.getconnection();
      conn.query("delete from process where username='"+req.session.uname+"' and name='"+req.params.name+"' and type='"+req.params.type+"'",function(err,result,fields)
      {
          if(err)
            console.log(err);
          else
            res.redirect("/payment");  
      });
    } 
});
app.get("/payment/success",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
      res.redirect("/");
    else
    {
      var conn=middle.getconnection();
      conn.query("select * from process where username='"+req.session.uname+"'",function(err,result,field)
      {
          for(var i=0;i<result.length;i++)
          {
           conn.query("insert into food_order values('"+result[i].orderID+"','"+result[i].username+"','"+result[i].name+"','"+result[i].type+"','"+result[i].quantity+"','"+result[i].order_date+"','"+result[i].order_time+"','"+result[i].address+"','"+result[i].phone+"','"+result[i].price+"')",function(e,r,f)
           {
              if(e)
                console.log(e);
           });
          }
      });
      conn.query("delete from process where username='"+req.session.uname+"'",function(err,result,fields)
      {
      });
       res.render("success"); 
    }
});
app.post("/getpayment",function(req,res)
{
    var state=middle.isLoggedIn(req);
    if(state==false)
      res.redirect("/");
    else
    {
      var conn=middle.getconnection();
      conn.query("select sum(price) as total from process where username='"+req.session.uname+"'",function(err,result,fields)
      {
          stripe.customers.create({
            email:req.body.stripeEmail,
            source:req.body.stripeToken
          },function(err,customer)
          {
              if(err)
                console.log(err);
              else
              {
                stripe.charges.create({
                  amount:result[0].total,
                  description:"Food order",
                  currency:"usd",
                  customer:customer.id
                },function(e)
                {
                   if(e)
                     console.log(e);
                   else
                     res.redirect("/payment/success");  
                });
              }  
          });
      }); 
  }
});
app.get("/changepass",function(req,res)
{
     var state=middle.isLoggedIn(req);
     if(state==false)
       res.redirect("/");
     else
     {
       var conn=middle.getconnection();
       conn.query("select * from user where username='"+req.session.uname+"'",function(err,result,field)
       {
              res.render("changepass",{user:result});
       }); 
     }  
});
app.put("/changepass",function(req,res)
{
     var state=middle.isLoggedIn(req);
     if(state==false)
      res.redirect("/");
     else
     {
       var pass=req.body.password;
       var enc=middle.encrypt(pass);
       enc=middle.encrypt("P"+enc+"D");
       var conn=middle.getconnection();
       conn.query("update user set password='"+enc+"' where username='"+req.session.uname+"'",function(err,result,field)
       {
           if(err)
             console.log(err);
           else
           {
               req.flash("msg","Password changed successfully");
               res.redirect("/");
           }  
       });
     } 
});
app.post("/resetpass",function(req,res)
{
     var email=req.body.username;
     var server=middle.createServer();
     server.send({
                to:email,
                from:"yelpcamp500@gmail.com",
                text:"Dear customer,\n Please click on the link: http://localhost:3000/reset/"+email+" to reset your password.\n\nYours faithully,\nFoody"
     },function(err,msg)
     {
         console.log(err||msg);
     });
    res.redirect("/"); 
});
app.get("/reset/:user",function(req,res)
{
    res.render("reset",{user:req.params.user});
});
app.put("/reset/:user",function(req,res)
{
  var pass=req.body.password;
  var enc=middle.encrypt(pass);
  enc=middle.encrypt("P"+enc+"D");
  var conn=middle.getconnection();
  conn.query("update user set password='"+enc+"' where username='"+req.params.user+"'",function(err,result,field)
  {
      if(err)
        console.log(err);
      else
      {
          req.flash("msg","Password reset successfully");
          res.redirect("/");
      }  
  });
});
app.listen(3000,"127.0.0.1",function()
{
      console.log("Server started");
});