/**----------------------------------------------------------------------------+
| Product:  api/index.js - ajile's API Examples Module.                        |
|+-----------------------------------------------------------------------------+
| Author:   Michael Lee [ http://ajile.net/ ]
|
| Created:  Friday,    November   2, 2006    [2006.06.02.19:44-04.00]
| Modified: Tuesday,   February  19, 2013    [2013.02.19.00:35-08.00]
|+-----------------------------------------------------------------------------+
|
|   [ ajile :: http://ajile.net/ :: "Smart scripts that play nice!" ]
| 
| This module is a functional example of ajile's Model View Controller (MVC)
* support feature. This Examples.js module actually supports the Examples.htm
* page's functinality. If you take the time to look, you'll see that there is no
* JavaScript code within the api/index.htm page except for ajile's script tag:
| 
|  <script type="text/javascript" src="path/to/com.iskitz.ajile.js"></script>
|
* ajile's MVC support makes it possible to completely separate a page's
| presentation [(X)HTML] and behavioral (JavaScript) layers by creating a
* single point of control for scripting.
|
| To begin using ajile's MVC support, simply create a .js file with the exact
| name of your (X)HTML, JSP, ASP, PHP, XML, or other page. Then, add the
| ajile SCRIPT tag shown above to your page.
|
| NOTE: Be sure to update ajile's path to point to your copy! ;-)
|
| Your custom controller script (i.e. MyPage.js for MyPage.htm) can contain any
* JavaScript functionality, page related or not. ajile will automatically load
* this script whenever your page is requested. It will now be treated as your
* page's controller module.
|
| If your page will be accessed as a default page (no filename specified), i.e:
|
|  http://ajile.net/   loads    http://ajile.net/index.htm
|
| ajile will automatically load the index.js module from your page's directory.
* This is typically the file you should consider usinsg to define implement your
* GUI control logic.
* 
* NOTE: If for example you're using IIS configured such that:
|
|  http://ajile.net/   loads    http://ajile.net/default.htm
|
| There are 2 choices to guarantee ajile's MVC functionality:
* 
* 1: Name your controller module "index.js".
* 
* 2: Copy the index.js file and rename it to your server's default page
*    (i.e. IIS uses default.htm so rename your index.js copy to default.js)
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

      // Add listener to observe any import/include events.
      Ajile.AddImportListener(isPageReady);

      if(typeof document.parentNode != "undefined")
      {  // Include and use Alex Gorbatchev's Syntax Highlighter if this host
         // environment supports parentNode. parentNode is the most advanced DOM
         // property used by Syntax Highlighter, so let's only include the
         // library if the environment supports it.

         Include ("dp.sh.Brushes.JScript.1.5.1", "../../use/syntax.highlight/");

         // Let's add an an include listener so we know when it's ready
         Ajile.AddImportListener("dp.sh.Brushes.JScript", function(moduleName)
         {  
            Ajile.RemoveImportListener(moduleName, arguments.callee);

            var code   =  document.getElementsByTagName("pre");
            var isDOM2 =  undefined != typeof document.firstChild
                       && undefined != typeof document.firstChild.setAttribute;

            for(var i=code.length; --i >=0;)
               (( isDOM2 && code[i].setAttribute("name", "code"))
               || (code[i].name = "code"));

            dp.sh.HighlightAll("code");
         });
      }
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