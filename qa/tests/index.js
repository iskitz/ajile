/*
 About   : Launch script for ajile's Jasmine Tests.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 10:15 PM PT
 Updated : 2012.06.04 @ 04:44 AM PDT
*/

(function (Ignore, Listen, undefined) {

   Include ("jasmine", "../../lib/jasmine/");
   Listen  ("jasmine", function jasmineCoreLoaded (moduleName) {
   
      Ignore (moduleName, arguments.callee);
      Load   ("../../lib/jasmine/jasmine-html.js");
   
      setTimeout (function(){ Include ("jasmine.HtmlReporter"); }, 0);
   
      Listen ("jasmine.HtmlReporter", function jasmineHTMLLoaded (moduleName) {
   
         Ignore  (moduleName, arguments.callee);
         Include  ("net.ajile.test.*", "./");  
   
         Listen  (function initializeJasmine (moduleName) {
   
            var ns = net.ajile.test;
   
            if (!(ns.Load && ns.Namespace)) {
               return;
            }
   
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
         });//End:initializeJasmine()
      });//End:jasmineHTMLLoaded()
   });//End:jasmineCoreLoaded()

})(Ajile.RemoveImportListener, Ajile.AddImportListener);
