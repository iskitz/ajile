/*
 About   : ajile's Ajile.RemoveImportListener Test Suite module.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:30-08.00
 Updated : 2013.02.18 @ 23:13-08.00
 */

Namespace ("net.ajile.test.Ajile");

(net.ajile.test.Ajile.RemoveImportListener = function defineTestSuiteModule (global, undefined) {
      
   function $start() {
       describe ("ajile: Ajile.RemoveImportListener()", describeTestSuite);
   }

   function describeTestSuite () {
      beforeEach ($prepareTest);

      it ("is a method"                       , isAMethod);
      it ('removes a generic listener'        , removesGenericListener);
      it ('removes a global property listener', removesGlobalListener);
      it ("removes an Import listener"        , removesImportListener);
      it ("removes an ImportAs listener"      , removesImportAsListener);
      it ("removes an Included listener"      , removesIncludedListener);
      it ('removes a multi-item listener'     , removesMultiListener);
   }

//.............................................................. Shared test variables and functions

   var listener = {};

   function $prepareTest () {
      listener.notify = listener.removed = undefined;
   }
   function $wasListenerNotified () {
      return listener.notify.calls.length > 0;
   }
   function $wasListenerRemoved() {
      expect (listener.removed).toBe (true);
      expect (listener.notify.calls.length).toBe (1);
   }

//............................................................................ Actual test functions

   function isAMethod () {
      expect (Ajile.RemoveImportListener).toBeDefined();
      expect (Ajile.RemoveImportListener).toEqual (jasmine.any (Function));
   }

   function removesGenericListener () {
      function $start () {
        listener.notify = notifyListener;
        spyOn    (listener, "notify").andCallThrough();
        runs     (addAndNotifyListener);
        waitsFor ($wasListenerNotified, 'removes a generic listener', 500);
        runs     ($wasListenerRemoved);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (listener.notify);  // Add listener.
         Import  ("net");                            // Notify listener.
         Include ("net.ajile.test");                 // Notify listener again.  
      }
      function notifyListener ($listener) {
         listener.removed = (listener.removed||true) && Ajile.RemoveImportListener ($listener.notify);
      }
      $start();
   }//end: removesGenericListener()


   function removesGlobalListener () {
      var globalProperty = "Object"
        ;
      function $start () {
        listener.notify = notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, 'removes a global property listener', 500);
         runs     ($wasListenerRemoved);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (globalProperty, listener.notify);   // Add listener.
         Include (globalProperty);                                    // Notify listener.
         Import  (globalProperty);                                    // Notify listener again.
      }
      function notifyListener ($listener) {
         listener.removed =  (listener.removed||true)
                         && Ajile.RemoveImportListener (globalProperty, $listener.notify)
                         ;
      }
      $start();
   }//end: removesGlobalListener()


   function removesImportListener () {
      var importedModule = "net.ajile.test.Ajile.RemoveImportListener.Imported"
        ;
      function $start () {
         listener.notify = notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, "removes an Import listener", 500);
         runs     (wasListenerRemoved);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (importedModule, listener.notify);   // Add listener.
         net.ajile.test.Ajile.RemoveImportListener.Imported = {imported:true}; 
         Import  (importedModule);                                    // Notify listener.
         Include ("Ajile");                                           // Notify unrelated listener.
         Import  (importedModule);                                    // Notify listener again.
         Import  ("net");                                             // Notify unrelated listener.
      }
      function notifyListener ($listener) {
         listener.removed =  (listener.removed||true)
                          && Ajile.RemoveImportListener (importedModule, $listener.notify)
                          ;
      }
      function wasListenerRemoved() {
         $wasListenerRemoved();
         try { delete global.Imported; }catch (e) { global.Imported = undefined; } // BUG: MSIE disallows deleting global members.
         delete net.ajile.test.Ajile.RemoveImportListener.Imported;
      }
      $start();
   }//end: removesImportListener()


   function removesImportAsListener () {
      var importedModule = "net.ajile.test.Ajile.RemoveImportListener.Imported"
        ;
      function $start () {
         listener.notify = notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, "removes an ImportAs listener", 500);
         runs     (wasListenerRemoved);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener ("ImportedAs", listener.notify);    // Add listener.
         net.ajile.test.Ajile.RemoveImportListener.Imported = {imported:true}; 
         ImportAs ("ImportedAs", importedModule);                    // Notify listener.
         Import   ("Ajile");                                         // Notify unrelated listener.
         ImportAs ("ImportedAs", importedModule);                    // Notify listener again.
         ImportAs ("net", "net");                                    // Notify unrelated listener.
      }
      function notifyListener ($listener) {
         listener.removed =  (listener.removed||true)
                          && Ajile.RemoveImportListener ("ImportedAs", $listener.notify)
                          ;
      }
      function wasListenerRemoved() {
         $wasListenerRemoved();
         try { delete global.ImportedAs; }catch (e) { global.ImportedAs = undefined; } // BUG: MSIE disallows deleting global members.
         delete net.ajile.test.Ajile.RemoveImportListener.Imported;
      }
      $start();
   }//end: removesImportAsListener()


   function removesIncludedListener () {
      var includedModule = "net.ajile.test.Ajile.RemoveImportListener.Included"
        ;
      function $start () {
         listener.notify = notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, "removes an Included listener", 500);
         runs     (wasListenerRemoved);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (includedModule, listener.notify);   // Add listener.
         net.ajile.test.Ajile.RemoveImportListener.Included = true;   // Include module. 
         Include (includedModule);                                    // Notify listener.
         Include ("net.ajile.test");                                  // Notify unrelated listener.
         Include (includedModule);                                    // Notify listener again.
         Import  ("net");                                             // Notify unrelated listener.
      }
      function notifyListener ($listener) {
         listener.removed =  (listener.removed||true)
                          && Ajile.RemoveImportListener (includedModule, $listener.notify)
                          ;
      }
      function wasListenerRemoved() {
         $wasListenerRemoved();
         delete (net.ajile.test.Ajile.RemoveImportListener.Included);
      }
      $start();
   }//end: removesIncludedListener()


   function removesMultiListener () {
      var globalProperty = "Object"
        , includedModule = "net.ajile.test.Ajile.RemoveImportListener.Included"
        , multiListeners = [globalProperty, includedModule]
        ;
      function $start () {
         listener.notify = notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, "removes a multi-item listener", 500);
         runs     (wasListenerRemoved);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (multiListeners, listener.notify);   // Add listener.
         net.ajile.test.Ajile.RemoveImportListener.Included = true;   // Include module. 
         Include (includedModule);                                    // Notify listener.
         Include ("net.ajile.test");                                  // Notify unrelated listener.
         Include (globalProperty);                                    // Notify listener.
         Include (includedModule);                                    // Notify listener again.
         Import  ("net");                                             // Notify unrelated listener.
         Import  (globalProperty);                                    // Notify listener again.
      }
      function notifyListener ($listener) {
         listener.removed =  (listener.removed||true)
                          && Ajile.RemoveImportListener (multiListeners, $listener.notify)
                          ;
      }
      function wasListenerRemoved() {
         $wasListenerRemoved();
         delete (net.ajile.test.Ajile.RemoveImportListener.Included);
      }
      $start();
   }//end: removesMultiListener()

   $start();

})(this);