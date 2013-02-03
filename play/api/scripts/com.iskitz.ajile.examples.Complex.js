
Import ("com.iskitz.ajile.examples.Simple");

Ajile.AddImportListener ("Simple", function onSimple (name) {

   com.iskitz.ajile.examples.Complex = function Complex ()
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
});
