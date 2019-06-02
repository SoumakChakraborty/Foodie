$('.payment-select').on('change',function(e)
{
    if(e.target.value=="cash")
       window.location.href="http://localhost:3000/payment/success";
    else
      $('#card').css('display','block');   
});