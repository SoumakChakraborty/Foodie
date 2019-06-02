var pass=document.querySelector('#password');
var retype=document.querySelector('#retype-password');
var flag=false;
retype.addEventListener('input',function()
{
    if(pass.value==retype.value)
      flag=true;
    else
      flag=false;  
});
function check()
{
    if(!flag)
    {
        retype.style.border="1px red solid";
        pass.style.border="1px red solid";
        $('.formdiv').append('<p>Passwords do not match</p>');
        return false;
    }
    else
      return true;
}