Namespace("com.iskitz.ajile.examples");

com.iskitz.ajile.examples.LoadExample = function /*LoadExample*/ ()    // BUG: MSIE8-: Named Function Expressions are globals.
{
   var msg = navigator.userAgent + "\n\n\t\t"
           + "Successfully Loaded [ com.iskitz.ajile.examples.LoadExample ]!";
   
   alert(msg);
};