var quantity=document.querySelector('.quantity');
var price=document.getElementById('show_price');
var P=price.innerText.split(":");
var q=parseInt(P[1]);
 quantity[0].addEventListener('change',function()
 {
    var dyn_price=q*quantity[0].value; 
    price.innerHTML="<strong>Price:"+dyn_price+"</strong>";
 });