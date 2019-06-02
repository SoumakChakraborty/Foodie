var formdiv=document.querySelectorAll('.formdiv');
var sign=document.querySelectorAll('#signdiv a');
var flag=false;
sign[0].addEventListener('click',function()
{
   if(!flag)
   { 
    $('.formdiv').append('<form></form>');
    $('.formdiv form').attr('action','/signin');
    $('.formdiv form').attr('method','POST');
    $('.formdiv form').append('<i class="fas fa-times" id="close"></i>');
    $('.formdiv form').append('<input type="email" name="username" id="username" placeholder="Username" required><br>');
    $('.formdiv form').append('<input type="password" name="password" id="password" placeholder="Password" required><br>');
    $('.formdiv form').append('<input type="submit" value="Sign In" id="submit">');
    $('.formdiv').append('<div id="user"><div id="forgotdiv"><a href="#" id="forgotanc">Forgot Password</a></div><div id="signupdiv"><a href="#" id="signupanc">Sign Up</a><div></div>');
    $('body').addClass('landing-blur');
       $('.navbar').addClass('navbar-click');
       $('.items-nav').addClass('items-nav-click');
       $('#main').css('display','none');
       $('#app-title').css('display','none');
       $('#deals').css('display','none');
       $('#item-info').css('display','none');
       $('#phone-contact').css('display','none');
       $('#email-contact').css('display','none');
    $('.formdiv').slideDown();
    flag=true;
   }
   else
   {
    $('.formdiv i').remove();
    $('.formdiv form').remove();
    $('.formdiv #user').remove();
    $('body').removeClass('landing-blur');
   $('.navbar').removeClass('navbar-click');
   $('.items-nav').removeClass('items-nav-click');
   $('#main').css('display','block');
   $('#app-title').css('display','block');
   $('#deals').css('display','block');
   $('#item-info').css('display','block');
   $('#phone-contact').css('display','block');
   $('#email-contact').css('display','block');
    $('.formdiv').slideUp();
    flag=false; 
   }
});
$('.formdiv').on('click','i',function()
{
   $('.formdiv i').remove();
   $('.formdiv form').remove();
   $('.formdiv #user').remove();
   $('.formdiv').removeClass('formdiv-sign');
   $('body #check').remove();
   $('body').removeClass('landing-blur');
   $('.navbar').removeClass('navbar-click');
   $('#main').css('display','block');
   $('#app-title').css('display','block');
   $('#deals').css('display','block');
   $('#item-info').css('display','block');
   $('.items-nav').removeClass('items-nav-click');
   $('#phone-contact').css('display','block');
       $('#email-contact').css('display','block');
   $('.formdiv').slideUp();
   flag=false;
});
$('.formdiv').on('click','#user',function(e)
{
    if(e.target.id=="signupanc")
    {
        $('.formdiv i').remove();
        $('.formdiv form').remove();
        $('.formdiv #user').remove();
        $('.formdiv').addClass('formdiv-sign');
        $('.formdiv').append('<form></form>');
       $('.formdiv form').attr('action','/signup');
       $('.formdiv form').attr('method','POST');
       $('.formdiv form').attr('onsubmit','return check()');
       $('.formdiv form').append('<i class="fas fa-times" id="close"></i>');
       $('.formdiv form').append('<input type="text" name="fname" id="fname" placeholder="First Name" required><br>');
       $('.formdiv form').append('<input type="text" name="lname" id="lname" placeholder="Last Name" required><br>');       
       $('.formdiv form').append('<input type="email" name="username" id="username" placeholder="Username" required><br>');
       $('.formdiv form').append('<input type="password" name="password" id="password" placeholder="Password" required><br>');
       $('.formdiv form').append('<input type="password" id="retype-password" placeholder="Retype Password" required><br>');
       $('.formdiv form').append('<input type="submit" value="Sign Up" id="submit">');
       $('body').append('<script src="check.js" id="check"></script>');
       $('body').addClass('landing-blur');
       $('.navbar').addClass('navbar-click');
       $('.items-nav').addClass('items-nav-click');
       $('#main').css('display','none');
       $('#app-title').css('display','none');
       $('#deals').css('display','none');
       $('#item-info').css('display','none');
       $('#phone-contact').css('display','none');
       $('#email-contact').css('display','none');
       $('.formdiv').slideDown();     
    }
    else
    {
        $('.formdiv i').remove();
        $('.formdiv form').remove();
        $('.formdiv #user').remove();
        $('.formdiv').append('<form></form>');
       $('.formdiv form').attr('action','/resetpass');
       $('.formdiv form').attr('method','POST');
       $('.formdiv form').append('<i class="fas fa-times" id="close"></i>');
       $('.formdiv form').append('<input type="email" name="username" id="username" placeholder="Enter email" required><br>');
       $('.formdiv form').append('<input type="submit" value="Reset password" id="submit">');
       $('body').addClass('landing-blur');
       $('.navbar').addClass('navbar-click');
       $('.items-nav').addClass('items-nav-click');
       $('#main').css('display','none');
       $('#app-title').css('display','none');
       $('#deals').css('display','none');
       $('#item-info').css('display','none');
       $('#phone-contact').css('display','none');
       $('#email-contact').css('display','none');
       $('.formdiv').slideDown();     
    }
});
