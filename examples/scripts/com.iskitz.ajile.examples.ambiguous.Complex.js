Namespace ("com.iskitz.ajile.examples.ambiguous");
Import    ("com.iskitz.ajile.examples.Simple");

com.iskitz.ajile.examples.ambiguous.Complex = function()
{
   var simple = new Simple();

   this.sayHello = function sayHello()
   {
      var message = "Hello World!\n\nThis is an " + this.toString() + " object"
                  + " that imported and is\nusing a " + simple.toString()
                  + " object!";

      alert(message);
   };

   this.toString = function toString()
   {
      return "[ambiguous.Complex]";
   };
};
