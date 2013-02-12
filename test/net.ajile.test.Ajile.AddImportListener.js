/*
 About   : ajile's Ajile.AddImportListener Test Suite module.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:30-08.00
 Updated : 2013.02.12 @ 12:47-08.00
 */

Namespace ("net.ajile.test.Ajile");

(net.ajile.test.Ajile.AddImportListener = function defineTestSuiteModule (global, undefined) {
      
   function $start() {
       describe ("ajile: Ajile.AddImportListener()", describeTestSuite);
   }

   function describeTestSuite () {
      beforeEach ($prepareTest);
      afterEach  ($restoreTest);

      it ("is a method"                                          , isAMethod);
      it ('adds and notifies a generic listener'                 , notifiesGenericListener);
      it ('adds and notifies a global existing-property listener', notifiesGlobalExistingListener);
      it ('adds and notifies a global future-property listener'  , notifiesGlobalFutureListener);
      it ("adds and notifies an Import listener"                 , notifiesImportListener);
      it ("adds and notifies an ImportAs listener"               , notifiesImportAsListener);
      it ("adds and notifies an Include listener"                , notifiesIncludeListener);
      it ('adds and notifies a multi-item listener'              , notifiesMultiListener);
//      it ('adds and notifies an external global future-property listener', notifiesExternalGlobalFutureListener);
//      it ("adds and notifies an external Import listener"                , notifiesExternalImportListener);
//      it ("adds and notifies an external ImportAs listener"              , notifiesExternalImportAsListener);
//      it ("adds and notifies an external Include listener"               , notifiesExternalIncludeListener);
   }

//.............................................................. Shared test variables and functions

   var listener = {};

   function $prepareTest () {
      listener.item = listener.name = listener.notify = undefined;
   }
   function $restoreTest () {
      listener.name
      ?  Ajile.RemoveImportListener (listener.name, listener.notify)
      :  Ajile.RemoveImportListener (listener.notify)
      ;
   }
   function $notifyListener ($listener) {
      listener.item = $listener.item;
      listener.name && expect ($listener.name).toBe (listener.name);
      expect ($listener.item).toBeDefined();
   }
   function $wasListenerNotified () {
      return listener.notify.calls.length > 0;
   }
   function $wasListenerAdded (callCount) {
      expect (listener.notify.calls.length).toBeGreaterThan (callCount);
      if (!listener.name) return;
      if (!(listener.name instanceof Array)) {
         var item      = listener.item;
         listener.item = {};
         listener.item [listener.name] = item;
         listener.name = [listener.name];
      }
      for (var name, names=listener.name, i=names.length; --i >= 0;) {
         name = names[i];
         expect (listener.item[name]).toBe (eval (name));
         Ajile.Unload (name);
         delete listener.item[name];
      }
   }

//............................................................................ Actual test functions

   function isAMethod () {
      expect (Ajile.AddImportListener).toBeDefined();
      expect (Ajile.AddImportListener).toEqual (jasmine.any (Function));
   }


   function notifiesGenericListener () {
      function $start () {
        listener.notify = $notifyListener;
        spyOn    (listener, "notify").andCallThrough();
        runs     (addAndNotifyListener);
        waitsFor ($wasListenerNotified, 'adds and notifies a generic listener', 500);
        runs     (wasListenerAdded);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (listener.notify);  // Add listener.
         Import  ("net");                            // Notify listener.
         Include ("net.ajile.test");                 // Notify listener again.  
      }
      function wasListenerAdded() {
         $wasListenerAdded(1);
      }
      $start();
   }//end: notifiesGenericListener()


   function notifiesGlobalExistingListener () {
      function $start () {
         listener.name   = "anExistingGlobalProperty";
         listener.notify = $notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, 'adds and notifies a global existing-property listener', 500);
         runs     (wasListenerAdded);
      }
      function addAndNotifyListener () {
         global [listener.name] = {global:true};                     // Define global property.
         Ajile.AddImportListener (listener.name, listener.notify);   // Add listener; auto-notified.
      }
      function wasListenerAdded() {
         $wasListenerAdded(0);
      }
      $start();
   }//end: notifiesGlobalExistingListener()


   function notifiesGlobalFutureListener () {
      function $start () {
         listener.name   = "aFutureGlobalProperty";
         listener.notify = $notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, 'adds and notifies a global future-property listener', 500);
         runs     (wasListenerAdded);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (listener.name, listener.notify);  // Add listener.
         global [listener.name] = {global:true};                    // Define future global property.
      }
      function wasListenerAdded() {
         $wasListenerAdded(0);
      }
      $start();
   }//end: notifiesGlobalFutureListener()


   function notifiesImportListener () {
      var fullName = "net.ajile.test.Ajile.AddImportListener.Imported"
        ;
      function $start () {
         listener.name   = "Imported";
         listener.notify = $notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, "adds and notifies an included module's listener", 500);
         runs     (wasListenerAdded);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (listener.name, listener.notify);   // Add multi-item listener.
         net.ajile.test.Ajile.AddImportListener.Imported = {imported:true};
         Import (fullName);                                          // Import and notify listener.
      }
      function wasListenerAdded() {
         $wasListenerAdded(0);
         Ajile.Unload (fullName);
      }
      $start();
   }//end: notifiesImportListener()


   function notifiesImportAsListener () {
      var fullName = "net.ajile.test.Ajile.AddImportListener.Imported"
        ;
      function $start () {
         listener.name   = "ImportedAs";
         listener.notify = $notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, "adds and notifies an imported module's listener", 500);
         runs     (wasListenerAdded);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (listener.name, listener.notify);   // Add multi-item listener.
         net.ajile.test.Ajile.AddImportListener.Imported = {imported:true};
         ImportAs (listener.name, fullName);                         // Import and notify listener.
      }
      function wasListenerAdded() {
         $wasListenerAdded(0);
         Ajile.Unload (fullName);
      }
      $start();
   }//end: notifiesImportAsListener()


   function notifiesIncludeListener () {
      function $start () {
         listener.name   = "net.ajile.test.Ajile.AddImportListener.Included";
         listener.notify = $notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, "adds and notifies an included module's listener", 500);
         runs     (wasListenerAdded);
      }
      function addAndNotifyListener () {
         Ajile.AddImportListener (listener.name, listener.notify);   // Add multi-item listener.
         net.ajile.test.Ajile.AddImportListener.Included = {included:true};
         Include (listener.name);                                    // Include & notify listener.
      }
      function wasListenerAdded() {
         $wasListenerAdded(0);
         expect (global["Included"]).not.toBeDefined();
      }
      $start();
   }//end: notifiesIncludeListener()


   function notifiesMultiListener () {
      var existingGlobal   = "anExistingGlobalProperty"
        , futureGlobal     = "aFutureGlobalProperty"
        , importedModule   = "net.ajile.test.Ajile.AddImportListener.Imported"
        , includedModule   = "net.ajile.test.Ajile.AddImportListener.Included"
        , multiListeners   = [existingGlobal, futureGlobal, "Imported", "ImportedAs", includedModule]
        ;
      function $start () {
         listener.name   = multiListeners;
         listener.notify = $notifyListener;
         spyOn    (listener, "notify").andCallThrough();
         runs     (addAndNotifyListener);
         waitsFor ($wasListenerNotified, 'adds and notifies a multi-item listener', 500);
         runs     (wasListenerAdded);
      }
      function addAndNotifyListener () {
         global [existingGlobal] = {global:true};                    // Define an existing global property.
         Ajile.AddImportListener (multiListeners, listener.notify);  // Add multi-item listener.
         global [futureGlobal]   = {global:true};                    // Define future global property.
         net.ajile.test.Ajile.AddImportListener.Imported = {imported:true};
         Import   (importedModule);                                  // Import and notify listener.
         ImportAs ("ImportedAs", importedModule);                    // Import and notify listener.
         net.ajile.test.Ajile.AddImportListener.Included = {included:true};
         Include  (includedModule);                                  // Notify listener.
         Include  (existingGlobal);                                  // Notify listener.
         Include  (futureGlobal);                                    // Notify listener.
      }
      function wasListenerAdded() {
         $wasListenerAdded(0);
         Ajile.Unload (importedModule);
      }
      $start();
   }//end: notifiesMultiListener()

   $start();

})(this);