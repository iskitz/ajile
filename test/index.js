/*
 About   : Launch script for ajile's Jasmine Tests.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:15-08.00
 Updated : 2013.01.27 @ 15:39-08.00
*/

(function (global, Ignore, Listen, undefined) {

   Include  ("jasmine", "../use/jasmine/");
   Listen   ("jasmine", function jasmineCoreLoaded (moduleName) {

      Ignore   (moduleName, arguments.callee);
      Load     ("../use/jasmine/jasmine-html.js");

      Ajile.nextInline = function includeJasmineHTML() {
         var callee = arguments.callee;
         callee.timer && clearTimeout (callee.timer);

         jasmine.HtmlReporter
         ?  (delete (callee.timer) && Include ("jasmine.HtmlReporter"))
         :  (callee.timer = setTimeout (callee, 0))
         ;
      };

      Load     ("./InlineLoader.js");
      Listen   ("jasmine.HtmlReporter", function jasmineHTMLLoaded (moduleName) {

         Ignore   (moduleName, arguments.callee);
         Include  ("net.ajile.test.*", "./");  

         Listen  (function initializeJasmine (moduleName) {

//HACK: Need Listen ("net.ajile.test.*", ...);
            var ns = global.net && net.ajile && net.ajile.test;

            if (!(ns && ns.Ajile && ns.Import && ns.ImportAs && ns.Include && ns.Load && ns.Namespace)) {
               return;
            }
//HACK: Need Listen ("net.ajile.test.*", ...);

            Ignore (arguments.callee);

            var jasmineEnv = jasmine && jasmine.getEnv();
            jasmineEnv.updateInterval = 1000;

            var htmlReporter = new jasmine.HtmlReporter();
            jasmineEnv.addReporter (htmlReporter);

            jasmineEnv.specFilter = function jasmineSpecFilter (spec) {
               return htmlReporter.specFilter (spec);
            };

            try {
               jasmineEnv.execute();
            }
            catch (ex) {
               var currentWindowOnload = window.onload;
   
               window.onload = function windowLoaded () {
                  currentWindowOnload && currentWindowOnload();
                  jasmineEnv.execute();
               };
            }
            
            setTimeout (function showAllResults () {
                /* Jasmine 1.2.0 defaults to showing only failures, this toggles to show both
                 * failures and successes.
                 */
                var link = document.getElementById ("HTMLReporter").getElementsByTagName("a")[0];
                (typeof link.onclick == "function") && link.onclick();
            }, 1500);

         });//End:initializeJasmine()
      });//End:jasmineHTMLLoaded()
   });//End:jasmineCoreLoaded()

})(this, Ajile.RemoveImportListener, Ajile.AddImportListener);
