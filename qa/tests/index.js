/*
 About   : Launch script for ajile's Jasmine Tests.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 22:15 PT
 Updated : 2012.11.17 @ 04:07 PST
*/

(function (global, Ignore, Listen, undefined) {

   Include  ("jasmine", "../../lib/jasmine/");
   Listen   ("jasmine", function jasmineCoreLoaded (moduleName) {

      Ignore   (moduleName, arguments.callee);
      Load     ("../../lib/jasmine/jasmine-html.js");

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

         Listen  ("net.ajile.test.Namespace", function initializeJasmine (moduleName) {
            var ns = global.net && net.ajile && net.ajile.test;

            if (!(ns && ns.Load && ns.Namespace)) {                 //BUG: Need Listen ("...*",...);
               return;
            }

            Ignore (moduleName, arguments.callee);

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
         });//End:initializeJasmine()
      });//End:jasmineHTMLLoaded()
   });//End:jasmineCoreLoaded()

})(this, Ajile.RemoveImportListener, Ajile.AddImportListener);
