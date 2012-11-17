
Import ("com.iskitz.ajile.examples.Simple");

Ajile.AddImportListener ("Simple", function onSimple (name) {

    Namespace ("com.iskitz.ajile.examples.ambiguous");

    com.iskitz.ajile.examples.ambiguous.Complex = function Complex ()
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
});
