
(function ajileSimplified (global, ns, on, off, free, undefined) {
   /*
    * Who   : Michael Lee, iskitz.com
    * When  : 2012.11.10...2012.11.14.07.53.PST
    * 
    * What  : ajile Simplified API Experiment
    * Why   : ajile's API is too wordy (i.e. Ajile.RemoveImportListener). 
    */

    on ("my.success", (function prepareFor (success) {
        return function onMySuccess (name) {
            off (name, arguments.callee);

            log ()("iSkitz's Experiments:")();
            log ("  who        : " + "Michael Lee");
            log ("  when       : " + "2012.11.13");
            log ("  ajile      : " + Ajile.GetVersion());
            log ("  my.utils   : " + !!my.utils);
            log ("  my.success : " + !!my.success);
            log ()(success)();
        };
    })(arguments.callee));


    on ("my.utils", function onMyUtilsReady (name) {
        off (name, arguments.callee);

        var space = "com.iskitz.ajile.examples"
          , path  = "../examples/scripts/"
          ;

        ns  (space, path);                                              // Namespace
        get (path+space+".LoadExample.js");                             // Load
        get ({name:space+".IncludeExample"});                           // Include
        get (space+".Complex");                                         // Import
        get ({name:space+".ambiguous.Complex", alias:"ComplexToo"});    // ImportAs
        
        on (space, function onLoad (name) {
            var examples = com.iskitz.ajile.examples;

            on (space+".LoadExample", function onLoad (name) {
                off (name, arguments.callee);
                log (name+" = "+examples.LoadExample)();
                examples.LoadExample();
            });//end:on:...LoadExample

            on (space+".IncludeExample", function onInclude (name) {
                off (name, arguments.callee);
                log (name+" = "+examples.IncludeExample)();
                examples.IncludeExample();
            });//end:on:...IncludeExample

            on (space+".Complex", function onDependency (name) {
                off (name, arguments.callee);
                log (name+" = "+Complex)();
                new Complex().sayHello();
            });//end:on:...Complex

            on (space+".ambiguous.Complex", function onConflict (name) {
                off (name, arguments.callee);
                log (name+" = "+ComplexToo)();
                new ComplexToo().sayHello();
            });//end:on:...ambiguous.Complex
        });//end:on:..LoadExample

        ns      ("my.success");
        Include ("my.success");
    });//end:on:my.utils


    on ("document", function onDocumentReady (name) {
        off (name, arguments.callee);
        ns  ("my");

        my.utils = new (function utils () {
            this.get = function get (module) {
                var RE_PATH = (/(^[\.\/\\]|.+:\/\/)/);

                switch (true) {
                    case typeof module == "string":
                        (RE_PATH.exec (module) ? Load : Import) (module);
                        break;
                        
                    case typeof module == "object" && !!module:
                        module.name && module.alias
                        ?    ImportAs (module.alias, module.name, module.path, module.type)
                        :    Include  (module.name, module.path, module.type)
                        ;
                        break;
                }//end:switch
            };//end:my.utils.get

            var win  = global
                ,   doc  = win.document
                ,   body = doc.body
                ;

            this.log = function log (text) {
                body.innerHTML += "<"+"pre>" + (text || " ") + "<"+"/pre>";
                return arguments.callee;
            };//end:my.utils.log

        })();//end:my.utils

        Import ("my.utils.*");
        free   ("my.utils.*");
    });//end:on:document

})(this, Namespace, Ajile.AddImportListener, Ajile.RemoveImportListener, Ajile.Unload);
