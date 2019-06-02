var formdiv=document.querySelectorAll('.formdiv1');
var sign=document.querySelectorAll('#signdiv a');
var flag=false;
sign[0].addEventListener('click',function()
{
   if(!flag)
   { 
    $('.formdiv1').append('<form></form>');
    $('.formdiv1 form').attr('action','/signin');
    $('.formdiv1 form').attr('method','POST');
    $('.formdiv1 form').append('<i class="fas fa-times" id="close"></i>');
    $('.formdiv1 form').append('<input type="email" name="username" id="username" placeholder="Username" required><br>');
    $('.formdiv1 form').append('<input type="password" name="password" id="password" placeholder="Password" required><br>');
    $('.formdiv1 form').append('<input type="submit" value="Sign In" id="submit">');
    $('.formdiv1').append('<div id="user"><div id="forgotdiv"><a href="#" id="forgotanc">Forgot Password</a></div><div id="signupdiv"><a href="#" id="signupanc">Sign Up</a><div></div>');
    $('body').addClass('landing-blur');
       $('.navbar').addClass('navbar-click');
       $('.items-nav').addClass('items-nav-click');
       $('#main').css('display','none');
       $('#app-title').css('display','none');
       $('#deals').css('display','none');
       $('#item-info').css('display','none');
    $('.formdiv1').slideDown();
    flag=true;
   }
   else
   {
    $('.formdiv1 i').remove();
    $('.formdiv1 form').remove();
    $('.formdiv1 #user').remove();
    $('body').removeClass('landing-blur');
   $('.navbar').removeClass('navbar-click');
   $('.items-nav').removeClass('items-nav-click');
   $('#main').css('display','block');
   $('#app-title').css('display','block');
   $('#deals').css('display','block');
   $('#item-info').css('display','block');
    $('.formdiv1').slideUp();
    flag=false; 
   }
});
$('.formdiv1').on('click','i',function()
{
   $('.formdiv1 i').remove();
   $('.formdiv1 form').remove();
   $('.formdiv1 #user').remove();
   $('.formdiv1').removeClass('formdiv-sign');
   $('body #check').remove();
   $('body').removeClass('landing-blur');
   $('.navbar').removeClass('navbar-click');
   $('#main').css('display','block');
   $('#app-title').css('display','block');
   $('#deals').css('display','block');
   $('#item-info').css('display','block');
   $('.items-nav').removeClass('items-nav-click');
   $('.formdiv1').slideUp();
   flag=false;
});
$('.formdiv1').on('click','#user',function(e)
{
    if(e.target.id=="signupanc")
    {
        $('.formdiv1 i').remove();
        $('.formdiv1 form').remove();
        $('.formdiv1 #user').remove();
        $('.formdiv1').addClass('formdiv-sign');
        $('.formdiv1').append('<form></form>');
       $('.formdiv1 form').attr('action','/signup');
       $('.formdiv1 form').attr('method','POST');
       $('.formdiv1 form').attr('onsubmit','return check()');
       $('.formdiv1 form').append('<i class="fas fa-times" id="close"></i>');
       $('.formdiv1 form').append('<input type="text" name="fname" id="fname" placeholder="First Name" required><br>');
       $('.formdiv1 form').append('<input type="text" name="lname" id="lname" placeholder="Last Name" required><br>');       
       $('.formdiv1 form').append('<input type="email" name="username" id="username" placeholder="Username" required><br>');
       $('.formdiv1 form').append('<input type="password" name="password" id="password" placeholder="Password" required><br>');
       $('.formdiv1 form').append('<input type="password" id="retype-password" placeholder="Retype Password" required><br>');
       $('.formdiv1 form').append('<input type="submit" value="Sign Up" id="submit">');
       $('body').append('<script src="check.js" id="check"></script>');
       $('body').addClass('landing-blur');
       $('.navbar').addClass('navbar-click');
       $('.items-nav').addClass('items-nav-click');
       $('#main').css('display','none');
       $('#app-title').css('display','none');
       $('#deals').css('display','none');
       $('#item-info').css('display','none');
       $('.formdiv1').slideDown();     
    }
    else
    {
        $('.formdiv1 i').remove();
        $('.formdiv1 form').remove();
        $('.formdiv1 #user').remove();
        $('.formdiv1').append('<form></form>');
       $('.formdiv1 form').attr('action','/resetpass');
       $('.formdiv1 form').attr('method','POST');
       $('.formdiv1 form').append('<i class="fas fa-times" id="close"></i>');
       $('.formdiv1 form').append('<input type="email" name="username" id="username" placeholder="Enter email" required><br>');
       $('.formdiv1 form').append('<input type="submit" value="Reset password" id="submit">');
       $('body').addClass('landing-blur');
       $('.navbar').addClass('navbar-click');
       $('.items-nav').addClass('items-nav-click');
       $('#main').css('display','none');
       $('#app-title').css('display','none');
       $('#deals').css('display','none');
       $('#item-info').css('display','none');
       $('.formdiv1').slideDown();     
    }
});
