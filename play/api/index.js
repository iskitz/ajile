/**----------------------------------------------------------------------------+
| Product:  api/index.js - ajile's API Examples Page Loader Module.            |
|+-----------------------------------------------------------------------------+
| Author:   Michael Lee [ http://ajile.net/ ]
|
| Created:  Friday,    November   2, 2006    [2006.06.02-04.00]
| Modified: Sunday,    December  10, 2017    [2017.12.10-08.00]
|+-----------------------------------------------------------------------------+
|
|   [ ajile :: http://ajile.net/ :: "Smart scripts that play nice!" ]
|
| This module is a functional example of ajile's Page Launcher feature. This
| Examples.js module actually supports the Examples.htm page's functionality. If
| you take the time to look, you'll see that there is no JavaScript code within
| the api/index.htm page besides ajile's script tag:
|
|  <script type="text/javascript" src="path/to/com.iskitz.ajile.js"></script>
|
| ajile's Page Loader feature makes it possible to completely separate a page's
| presentation [(X)HTML] and behavioral (JavaScript) layers by creating a
| single point of control for scripting.
|
| To begin using ajile's Page Loaders, simply create a .js file with the exact
| name of your (X)HTML, JSP, ASP, PHP, XML, or other page. Then, add the
| ajile SCRIPT tag shown above to that page.
|
| NOTE: Be sure to update ajile's path to point to your copy! ;-)
|
| Your page loader (e.g. MyPage.js for MyPage.htm) can contain any JavaScript
| code, page-related or not. ajile will automatically load that script whenever
| your page is launched. It will now be treated as your page's loader.
|
| If your page will be accessed as a default page (no filename specified), e.g:
|
|  http://ajile.net/   loads    http://ajile.net/index.htm
|
| ajile will automatically load the index.js module from your page's directory.
| This is typically the file you should consider using to implement your GUI
| control logic.
|
| NOTE: If for example you're using IIS configured such that:
|
|  http://ajile.net/   loads    http://ajile.net/default.htm
|
| There are 2 choices to guarantee ajile's Page Loader functionality:
|
| 1: Name your page loader "index.js".
|
| 2: Or copy your index.js file and rename it to your server's default page
|    (i.e. IIS uses default.htm so rename your copied index.js to default.js)
|+----------------------------------------------------------------------------*/

// Runtime option setting examples:
//
// Ajile.EnableCloak    (false);     // Hides source code from DOM at runtime.
// Ajile.EnableDebug    (/*false*/); // Enables/disables debug logging.
// Ajile.EnableOverride ();          // Enables/disables namespace/module overriding.

Namespace ("com.iskitz.ajile");

com.iskitz.ajile.Examples = new function () // Define Ajile's API Examples module
{
   var linkMap;


   function $begin ()
      {/*Unobtrusive HTML & JS:
         This is a map between the links in the API Examples page and the
         JavaScript functions that support those linked examples. Using simple
         HTML anchors allows easy unobtrusive mapping, removing all JS from the
         HTML page!
       */linkMap = { "Dependence"     :testDependence
                   , "Import"         :testImport
                   , "ImportAlias"    :testImportAlias
                   , "ImportListener" :testImportListener
                   , "ImportModule"   :testImportModule
                   , "Include"        :testInclude
                   , "Load"           :testLoad
                   , "Namespace"      :testNamespace
                   }
      ;  window.onload       =   initialize    // Initialize this module when its page   loads.
      ;  window.onunload     =   $end          // End use of this module when its page unloads.
      ;  loadSyntaxHighlighter   ()
      ;  Ajile.AddImportListener (isPageReady)                     // Listen for all import/include events.
      ;  Include ("com.iskitz.ajile.examples.*.0.9", "scripts/")   // Include all version 0.9 API examples.
      }


   function $end ()
   {  // Ends use of this API Examples page module by unloading all resources it
      // created and /or acquired since we began using it.

      // Reset all modified links
      if (typeof document.links != "undefined")
         for (var link, links = document.links, i = links.length; i --> 0;)
            if (linkMap [(link = links [i]).name])
               link.href = '#' + link.name;

      for (var item in linkMap) delete linkMap [item];   // Release the link map
      if (typeof Ajile == "undefined") return;

      Ajile.Unload ("com.iskitz.ajile.examples.*"); // Release examples package.
      Ajile.Unload ("dp.sh.*");                     // Release Syntax Highlighter.
      Ajile.Unload ("com.iskitz.ajile.Examples");   // Release this module.
   }


   function initialize ()
   {  // Initialize the API Examples page by specifically mapping relevant links to
      // their corresponding test functions.

      if (initialize.d) return;          // Avoid re-initializing

      var PREFIX = 'javascript: void (com.iskitz.ajile.Examples ("'
        , SUFFIX = '"));'
        , links  = document.links
        , next   = links  ? links.length : 0
        , link
        , name
        ;
      while  (0 <=-- next)
        {  link  =   links [next] ||  links.item (next)
        ;  name  =   link . name  || (link.hash && link.hash.replace (/^#/, ''))
        ;  linkMap  [name]        && (link.href  = PREFIX  +   name   +  SUFFIX)
        }

      com.iskitz.ajile.Examples = run ;  // Connect links to tests' handler
      initialize.d              = true;  // Remember that we're initialized
   }


   function isPageReady (moduleName)
   {  // ImportListener that triggers the API Examples page's initialization once all
      // required modules are ready for use.

      if ( "undefined" == typeof AComplex
        || "undefined" == typeof Complex
        || "undefined" == typeof ImportFunction
        || "undefined" == typeof showContents
        || "undefined" == typeof com.iskitz.ajile.examples.LoadExample
         )  return
         ;

      Ajile.RemoveImportListener (isPageReady);
      isPageReady = true;
      initialize ();
   }


   function loadSyntaxHighlighter ()
   {  // parentNode is the most advanced DOM property used by Syntax Highlighter,
      // so let's only include the library if this host environment supports it:
      if (typeof document.parentNode == "undefined") return;

      // Create a listener for the Syntax Highlighting library:
      var doSyntaxHighlighting = function doSyntaxHighlighting (moduleName) {
         Ajile.RemoveImportListener (moduleName, arguments.callee);

         var code   =  document.getElementsByTagName ("pre")
           , next   = code.length
           , isDOM2 =  undefined != typeof document.firstChild
                    && undefined != typeof document.firstChild.setAttribute
           ;
         while (0 <=-- next)
            isDOM2 ? code[next].setAttribute ("name", "code") : (code[next].name = "code");

         dp.sh.HighlightAll ("code");
      };

      // Add the listener so we know when Syntax Highlighter's ready:
      Ajile.AddImportListener ("dp.sh.Brushes.JScript", doSyntaxHighlighting);

      // Include Alex Gorbatchev's JavaScript Syntax Highlighter:
      Include ("dp.sh.Brushes.JScript.1.5.1", "../../use/syntax.highlight/");
   }


   function run (example)
      { if  (! example)   return
      ; var runExample  = linkMap [example]
      ;     runExample && runExample ()
      ; //  Ajile.ShowLog ()
      }


   function testDependence()
   {  // Tests ajile's dependency management feature; see com.iskitz.examples.0.9.js

      if ("undefined" != typeof Complex)
         (new Complex()).sayHello();
      else
         alert( "Dependency test was unsuccessful :-(\n\n"
                + "Failed to Import [ com.iskitz.ajile.examples.Complex ]");
   }


   function testImport()
   {  // Tests ajile's import feature; see com.iskitz.examples.0.9.js

      if ("undefined" != typeof ImportFunction)
         ImportFunction();
      else
         alert ( "Import test was unsuccessful :-(\n\n"
               + "Failed to Import [ com.iskitz.ajile.examples.ImportFunction ]"
               );
   }


   function testImportAlias()
   {  // Tests ajile's aliased-import feature; see scripts/com.iskitz.examples.0.9.js

      if("undefined" != typeof Complex && "undefined" != typeof AComplex)
      {
         (new Complex ()).sayHello();  // Create & use Complex object.
         (new AComplex()).sayHello();  // Create & use ambiguous Complex object.
      }
      else alert( "Ambiguity test was unsuccessful :-(\n\n"
                + "Failed to import both [ com.iskitz.ajile.examples.Complex ]\n"
                + "and [ com.iskitz.ajile.examples.ambiguous.Complex ]");
   }


   function testImportListener()
   {  // Tests ajile's import listener feature; see scripts/com.iskitz.examples.0.9.js

      var status = isPageReady == true ? ' ' : " NOT ";

      alert( "Import Listener test was" + status +"successful!\n\n"
           + "All required modules have"+ status +"been imported.");
   }


   function testImportModule()
   {  // Tests ajile's module member import feature; see scripts/com.iskitz.examples.0.9.js

      // Test if showContents method has been imported and that it's ImportModule.showContents.
      var imported =  ("undefined" != typeof showContents)
                   && ("undefined" != typeof com.iskitz.ajile.examples.ImportModule)
                   && (showContents == com.iskitz.ajile.examples.ImportModule.showContents)
                   ;

      if (imported) showContents();

      else alert( "ImportModule test was unsuccessful :-(\n\n Failed to "
                + "Import [ com.iskitz.ajile.examples.ImportModule.* ]");
   }


   function testInclude()
   {  // Tests ajile's include feature; see scripts/com.iskitz.examples.0.9.js

      if("undefined" != typeof com.iskitz.ajile.examples)
         if("undefined" != typeof com.iskitz.ajile.examples.IncludeExample)
            com.iskitz.ajile.examples.IncludeExample();

         else alert( "Include test was unsuccessful :-(\n\n"
                   + "Failed to Include [ com.iskitz.ajile.examples.IncludeExample.js ]");
   }


   function testLoad()
   {  // Tests ajile's load feature; see scripts/com.iskitz.examples.0.9.js

      if(  "undefined" != typeof com.iskitz.ajile.examples
        && "undefined" != typeof com.iskitz.ajile.examples.LoadExample)
            com.iskitz.ajile.examples.LoadExample();

      else alert( "Load test was unsuccessful :-(\n\n"
                + "Failed to Load [ com.iskitz.ajile.examples.LoadExample.js ]");
   }


   function testNamespace()
   {  // Tests ajile's namespace feature; see scripts/com.iskitz.examples.0.9.js

      Namespace ("com.iskitz.ajile.examples");

      var msg = typeof com.iskitz.ajile.examples == "undefined"
              ? "Failed to create"
              : "Successfully created";

      alert(msg + " the [ com.iskitz.ajile.examples ] namespace!");
   }

   $begin();  // Because some DOM.0 browsers don't seem to hoist functions...
}
;