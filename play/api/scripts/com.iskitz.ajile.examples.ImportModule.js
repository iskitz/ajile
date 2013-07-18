// Author:      Michael Lee [ http:/ajile.net/ ]
//
// Created:     2006.07.30
// Modified:    2013.06.10.01.52-07.00
//
// Description: Example of how to define all of a namespace's members within a
//              single container object for later import like:
//
//              Import("com.iskitz.ajile.examples.ImportModule.*");

Namespace ("com.iskitz.ajile.examples.ImportModule");


com.iskitz.ajile.examples.ImportModule = new function /*ImportModule*/ ()  //BUG: MSIE8-: Named Function Expressions are globals.
{
   var THIS = this;

   function $ImportModule()
   {
      THIS.aNumber            = 1;
      THIS.aString            = "member 5";
      THIS.aFunction          = function(){ alert("member 1"); };
      THIS.anArray            = ["member3"];
      THIS.anObject           = { member:"member 2" };
      THIS.aRegularExpression = (/member 6/);
      THIS.showContents       = showContents;
   }
  
   function showContents()
   {
      var contents = ".:{ com.iskitz.ajile.examples.ImportModule }:.\n\n";

      alert(contents + (THIS.constructor.toString ? THIS.constructor : ''));
   }
   
   $ImportModule();
};
