Namespace ("com.iskitz.ajile.examples");

com.iskitz.ajile.examples.Simple = function /*Simple*/()   //BUG: MSIE8-: Named Function Expression becomes global.
{
   this.toString = function toString()
   {
      return "[Simple]";
   };
};