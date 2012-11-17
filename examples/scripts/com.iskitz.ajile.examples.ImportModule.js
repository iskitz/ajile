// Author:      Michael Lee [ http:/ajile.net/ ]
//
// Created:     2006.07.30
// Modified:    2012.11.17
//
// Description: Example of how to define all of a namespace's members within a
//              single container object for later import like:
//
//              Import("com.iskitz.ajile.examples.ImportModule.*");

Namespace ("com.iskitz.ajile.examples.ImportModule");


com.iskitz.ajile.examples.ImportModule = new function ImportModule ()
{
   var THIS = this;

   function $ImportModule()
   {
      this.aNumber            = 1;
      this.aString            = "member 5";
      this.aFunction          = function(){ alert("member 1"); };
      this.anArray            = ["member3"];
      this.anObject           = { member:"member 2" };
      this.aRegularExpression = (/member 6/);
      this.showContents       = showContents;
   }
  
   function showContents()
   {
      var contents = ".:{ com.iskitz.ajile.examples.ImportModule }:.\n\n";

      alert(contents + (THIS.constructor.toString ? THIS.constructor : ''));
   }
   
   $ImportModule();
};
