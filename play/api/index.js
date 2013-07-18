/**----------------------------------------------------------------------------+
| Product:  api/index.js - ajile's API Examples Page Loader Module.                        |
|+-----------------------------------------------------------------------------+
| Author:   Michael Lee [ http://ajile.net/ ]
|
| Created:  Friday,    November   2, 2006    [2006.06.02.19:44-04.00]
| Modified: Sunday,    June      16, 2013    [2013.06.16.14:54-07.00]
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
| Your page loader (i.e. MyPage.js for MyPage.htm) can contain any JavaScript
| code, page-related or not. ajile will automatically load that script whenever
| your page is launched. It will now be treated as your page's loader.
|
| If your page will be accessed as a default page (no filename specified), i.e:
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
// Ajile.EnableCloak(false);     // Hides source code from DOM at runtime.
// Ajile.EnableDebug(/*false*/); // Enables/disables debug logging. 
// Ajile.EnableOverride();       // Enables/disables namespace/module overwriting.

// Define this module's namespace.
Namespace ("com.iskitz.ajile");

// Include all members of the examples package version 0.9.
Include ("com.iskitz.ajile.examples.*.0.9", "scripts/");

// Define the API Examples module
com.iskitz.ajile.Examples = new function()
{
   var linkMap;

   // Begin using this API Examples page module.
   function $begin()
   {
      window.onload   = initialize;// Initialize the API Examples page once loaded.
      window.onunload = $end;      // End use of this API Examples page module.

      // Unobtrusive HTML & JS:
      // This is a map between the links in the API Examples page and the JavaScript
      // functions that support those linked examples. Using simple HTML anchors
      // allows easy unobtrusive mapping, removing all JS from the HTML page!
      linkMap = { "Dependence"     :testDependence
                , "Import"         :testImport
                , "ImportAlias"    :testImportAlias
                , "ImportListener" :testImportListener
                , "ImportModule"   :testImportModule
                , "Include"        :testInclude
                , "Load"           :testLoad
                , "Namespace"      :testNamespace
                };

      Ajile.AddImportListener (isPageReady);   // Listen for all import/include events.
      loadSyntaxHighlighter();
   }


   // Ends use of this API Examples page module by unloading all resources it
   // created and /or acquired since we began using it.
   function $end()
   {
      // Reset all modified links
      if(typeof document.links != "undefined")
         for(var link, links = document.links, i = links.length; --i >= 0;)
            if(linkMap[(link = links[i]).name])
               link.href = '#' + link.name;

      // Release the link map
      for(var item in linkMap)
         delete linkMap[item];
      linkMap = null;
         
      if(typeof Ajile == "undefined") return;

      //Ajile.ShowLog();
      Ajile.Unload("com.iskitz.ajile.examples.*"); // Release examples package.
      Ajile.Unload("dp.sh.*");                     // Release Syntax Highlighter.
      Ajile.Unload("com.iskitz.ajile.Examples");   // Release this module.
   }


   // Initialize the API Examples page by specifically mapping relevant links to
   // their corresponding test functions.
   function initialize()
   {
      if(typeof document.links != "undefined")
         for(var link, links = document.links, i = links.length; --i >= 0;)
            if(linkMap[(link = links[i]).name])
               link.href = 'javascript:void(com.iskitz.ajile.Examples("'+ link.name +'"))';
      
      // Publish the API Examples' handler using this module's fully qualified name.
      com.iskitz.ajile.Examples = run;
    //Ajile.ShowLog();
   }

   // ImportListener that triggers the API Examples page's initialization once all
   // required modules are ready for use.
   function isPageReady(moduleName)
   {
      if(  "undefined" == typeof AComplex
        || "undefined" == typeof Complex
        || "undefined" == typeof ImportFunction
        || "undefined" == typeof showContents
        || "undefined" == typeof com.iskitz.ajile.examples.LoadExample)
         return;

      Ajile.RemoveImportListener(isPageReady);
      isPageReady = true;
      initialize();
   }

   function loadSyntaxHighlighter () {
      // Include and use Alex Gorbatchev's Syntax Highlighter if this host
      // environment supports parentNode. parentNode is the most advanced DOM
      // property used by Syntax Highlighter, so let's only include the
      // library if the environment supports it.

      if (typeof document.parentNode == "undefined") return;

      Include ("dp.sh.Brushes.JScript.1.5.1", "../../use/syntax.highlight/");

      var doSyntaxHighlighting = function doSyntaxHighlighting (moduleName) {
         Ajile.RemoveImportListener (moduleName, arguments.callee);

         var code   =  document.getElementsByTagName("pre");
         var isDOM2 =  undefined != typeof document.firstChild
                    && undefined != typeof document.firstChild.setAttribute
                    ;
          for (var i=code.length; --i >=0;) {
              isDOM2 ? code[i].setAttribute("name", "code") : (code[i].name = "code");
          }

          dp.sh.HighlightAll("code");
      };

      // Let's add a listener so we know when it's ready:
      Ajile.AddImportListener ("dp.sh.Brushes.JScript", doSyntaxHighlighting);
   }

   function run(example)
   {
      if(!example) return;

      var runExample = linkMap[example];
      if (runExample)  runExample();
   }

   // Tests ajile's dependency enforcement feature; see com.iskitz.examples.0.9.js
   function testDependence()
   {
      if("undefined" != typeof Complex)
      {
         var complex = new Complex();
         complex.sayHello();
      }
      else alert( "Dependency test was unsuccessful :-(\n\n"
                + "Failed to Import [ com.iskitz.ajile.examples.Complex ]");
   }

   // Tests ajile's import feature; see com.iskitz.examples.0.9.js
   function testImport()
   {
      if("undefined" != typeof ImportFunction)
         ImportFunction();

      else alert( "Import test was unsuccessful :-(\n\n"
                + "Failed to Import [ com.iskitz.ajile.examples.ImportFunction ]");
   }

   // Tests ajile's aliased-import feature; see scripts/com.iskitz.examples.0.9.js
   function testImportAlias()
   {
      if("undefined" != typeof Complex && "undefined" != typeof AComplex)
      {
         (new Complex() ).sayHello();  // Create & use Complex object.
         (new AComplex()).sayHello();  // Create & use ambiguous Complex object.
      }
      else alert( "Ambiguity test was unsuccessful :-(\n\n"
                + "Failed to import both [ com.iskitz.ajile.examples.Complex ]\n"
                + "and [ com.iskitz.ajile.examples.ambiguous.Complex ]");
   }

   // Tests ajile's import listener feature; see scripts/com.iskitz.examples.0.9.js
   function testImportListener()
   {
      var status = isPageReady == true ? ' ' : " NOT ";

      alert( "Import Listener test was" + status +"successful!\n\n"
           + "All required modules have"+ status +"been imported.");
   }

   // Tests ajile's module member import feature; see scripts/com.iskitz.examples.0.9.js
   function testImportModule()
   {
      // Test if showContents method has been imported and that it's ImportModule.showContents.
      var imported =  ("undefined" != typeof showContents)
                   && ("undefined" != typeof com.iskitz.ajile.examples.ImportModule)
                   && (showContents == com.iskitz.ajile.examples.ImportModule.showContents)
                   ;

      if(imported) showContents();

      else alert( "ImportModule test was unsuccessful :-(\n\n Failed to "
                + "Import [ com.iskitz.ajile.examples.ImportModule.* ]");
   }

   // Tests ajile's include feature; see scripts/com.iskitz.examples.0.9.js
   function testInclude()
   {
      if("undefined" != typeof com.iskitz.ajile.examples)
         if("undefined" != typeof com.iskitz.ajile.examples.IncludeExample)
            com.iskitz.ajile.examples.IncludeExample();

         else alert( "Include test was unsuccessful :-(\n\n"
                   + "Failed to Include [ com.iskitz.ajile.examples.IncludeExample.js ]");
   }

   // Tests ajile's load feature; see scripts/com.iskitz.examples.0.9.js
   function testLoad()
   {
      if(  "undefined" != typeof com.iskitz.ajile.examples
        && "undefined" != typeof com.iskitz.ajile.examples.LoadExample)
            com.iskitz.ajile.examples.LoadExample();

      else alert( "Load test was unsuccessful :-(\n\n"
                + "Failed to Load [ com.iskitz.ajile.examples.LoadExample.js ]");
   }

   // Tests ajile's namespace feature; see scripts/com.iskitz.examples.0.9.js
   function testNamespace()
   {
      Namespace ("com.iskitz.ajile.examples");

      var msg = typeof com.iskitz.ajile.examples == "undefined"
              ? "Failed to create"
              : "Successfully created";

      alert(msg + " the [ com.iskitz.ajile.examples ] namespace!");
   }

   // Begin using this API Examples page module! 
   $begin();
};