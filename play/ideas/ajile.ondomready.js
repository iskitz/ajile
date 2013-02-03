
(function ajileOnDOMReady (global, undefined) {
   /*
    * Who   : Michael Lee, iskitz.com
    * When  : 2012.11.10...2012.11.14.07.45.PST
    * 
    * What  : ajile DOM Ready & new function Module Definition Experiment
    * Why   : ajile should allow scripts to define DOM dependencies. Should be able to define
    *         modules that work with instanceof and support private and public members.
    */

   var time;
   !addEventListener && (addEventListener = function(){}); !this.console && (console = {log: function(){}});

   // Listen for DOM's content loaded and onload events:
   addEventListener ("load", function onLoad () { console.log ((time=new Date),time.getMilliseconds(),"Doc Ready!"); }, false);
   onload = function onLoad () { console.log ((time=new Date),time.getMilliseconds(),"Doc Loaded!"); };
   addEventListener ("domcontentloaded", function DOMContentLoaded () { console.log ((time=new Date),time.getMilliseconds(),"DOM Ready!"); }, false);

   Ajile.AddImportListener ("document", function onDocumentReady () {
     /* Once the DOM is ready this function activates: */
     console.log ((time=new Date),time.getMilliseconds(), "Body Ready?", !!document.body);

     undefined = "polluted!";   // Change the global undefined reference.

     Namespace ("my");          // Create a global "my" namespace.

     my.space = new (function space (global, undefined) {
         /* A globally accessible my.space module with private & public
            members, and access to the global scope and a protected
            undefined reference. Example of stand-alone implementation.
         */

         // Private member variables:
         var win  = global
         ,   doc  = win.document
         ,   body = doc.body
         ,   log
         ;

         // Public member method:
         this.log = log = function log (text) {
             body.innerHTML += "<"+"pre>" + (text || " ") + "<"+"/pre>";
             return log;
         };

         log ()("iSkitz's Experiments:")();
         log ("  When      : " + "2012.11.10");
         log ("  global    : " + (!global ? "in" : "") + "accessible");
         log ("  DOM       : " + (!(doc && body) ? "not ":"") + "ready");
         log ("  undefined : " + (undefined || "protected"));
     })(this);

     my.space.log ("  public    : " + !!my.space.log);
     my.space.log ("  private   : " + !my.space.win);
     my.space.log ("  ajile     : " + Ajile.GetVersion());
     my.space.log ()(arguments.callee)();
   });
})(this);
