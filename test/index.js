/*
 About   : Launch script for ajile's Jasmine Tests.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:15-08.00
 Updated : 2017.12.03 @ 20:41-08.00
 */
(function (global, use, on, no, undefined) {

   function $start() {
      Include ("jasmine", "../use/jasmine/");
      on      ("jasmine", jasmineCoreLoaded);
   }

   function jasmineCoreLoaded (listener) {
      //jasmine.VERBOSE = true;

      no  (listener.name, listener.notify);
      use ("../use/jasmine/jasmine-html.js");

      Ajile.nextInline = function includeJasmineHTML() {
         var callee = arguments.callee;
         callee.timer && clearTimeout(callee.timer);
         
         jasmine.HtmlReporter
         ?  (delete (callee.timer) && Include("jasmine.HtmlReporter"))
         :  (callee.timer = setTimeout(callee, 0))
         ;
      };

      use ("./InlineLoader.js");
      on  ("jasmine.HtmlReporter", jasmineHTMLLoaded);
   }

   function jasmineHTMLLoaded (listener) {
      no      (listener.name, listener.notify);
      Include ("net.ajile.test.*", "./");

      on ([ "net.ajile.test.Ajile.AddImportListener"  //TODO: on ("net.ajile.test.*", jasmineReady);
          , "net.ajile.test.Ajile.RemoveImportListener"
          , "net.ajile.test.Import"
          , "net.ajile.test.ImportAs"
          , "net.ajile.test.Include"
          , "net.ajile.test.Load"
          , "net.ajile.test.Namespace"
          ], jasmineReady);
   }

   function jasmineReady (listener) {
      no  (listener.name, listener.notify);

      var jasmineEnv = jasmine && jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var htmlReporter = new jasmine.HtmlReporter();
      jasmineEnv.addReporter (htmlReporter);
      
      jasmineEnv.specFilter = function jasmineSpecFilter(spec) {
         return htmlReporter.specFilter (spec);
      };

      function documentReady (listener) {
        no  (listener.name, listener.notify);
        jasmineEnv.execute();
        setTimeout (showAllResults, 1500);
      }

      on ("document.body", documentReady);
   }

   function showAllResults() {
      /* Jasmine 1.2.0 defaults to showing only failures, this toggles to show both
       * failures and successes.
       */
      var link = document.getElementById ("HTMLReporter");
      link && (link = link.getElementsByTagName("a")[0]);
      link && (typeof link.onclick == "function") && link.onclick();
   }

   $start();

})(this, Load, Ajile.AddImportListener, Ajile.RemoveImportListener);