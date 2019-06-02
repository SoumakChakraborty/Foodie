var user=document.querySelectorAll('.user-cart');
user.forEach(function(x) 
{
    x.addEventListener('change',function(e)
    { 
      var http=new XMLHttpRequest();
      var name=x.childNodes[5].childNodes[1].textContent.split("-")[1];
      var type=x.childNodes[5].childNodes[3].textContent.split("-")[1];
      http.open("GET","http://localhost:3000/getprice/"+name+"/"+type,true);
      http.onreadystatechange=function()
      {
         if(http.readyState==4&&http.status==200)
         {
            var result=JSON.parse(http.response);
            x.childNodes[5].childNodes[5].innerHTML="<strong>Price</strong> - "+(parseInt(x.childNodes[5].childNodes[7].childNodes[1].value)*result.price[0].price);
         }
      }
       http.send();   
    });
 });