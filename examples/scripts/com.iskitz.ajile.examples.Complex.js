Namespace ("com.iskitz.ajile.examples");
Import    ("com.iskitz.ajile.examples.Simple");

com.iskitz.ajile.examples.Complex = function()
{
   var simple = new Simple();
   
   this.sayHello = function sayHello()
   {
      var message = "Hello World!\n\nThis is a " + this.toString() + " object"
                  + " that imported and is\nusing a " + simple.toString()
                  + " object!";

      alert(message);
   };

   this.toString = function toString()
   {
      return "[Complex]";
   };
};