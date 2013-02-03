/*-----------------------------------------------------------------------------+
| Product:  Ajile [com.iskitz.js.ajile]
|+-----------------------------------------------------------------------------+
| Author:   Michael A. I. Lee <iskitz@users.sourceforge.net>
| Created:  Tuesday,  November 04, 2003
| Modified: Sunday,   September 25, 2005, 15:11:40 EST
| Version:  0.3.6 Beta
|+-----------------------------------------------------------------------------+
| Ajile is a JavaScript framework that brings packaging and importing to
| JavaScript.
|
| The framework is designed to streamline JavaScript development by providing an
| efficient, clear, and simple approach to working with multiple JavaScript
| libraries.

| Using the framework developers can:
| 1. Create uniquely identifiable Javascript libraries.
| 2. Define relationships and dependencies between JavaScript libraries.
| 3. Package logic into separate, re-usable and identifiable units.
| 4. Programatically load JavaScript libraries built outside of the framework.
|
| Visit [ http://ajile.iskitz.com/ ] for documentation, examples, updates,
| and news about the framework.
|+-----------------------------------------------------------------------------+
|
| ***** BEGIN LICENSE BLOCK *****
| Version: MPL 1.1/GPL 2.0/LGPL 2.1
|
| The contents of this file are subject to the Mozilla Public License Version
| 1.1 (the "License"); you may not use this file except in compliance with
| the License. You may obtain a copy of the License at
| http://www.mozilla.org/MPL/
|
| Software distributed under the License is distributed on an "AS IS" basis,
| WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
| for the specific language governing rights and limitations under the
| License.
|
| The Original Code is Ajile.
|
| The Initial Developer of the Original Code is
| Michael A. I. Lee.
| Portions created by the Initial Developer are Copyright (C) 2003-2005
| the Initial Developer. All Rights Reserved.
|
| Contributor(s): Michael A. I. Lee <iskitz@users.sourceforge.net>
|
| Alternatively, the contents of this file may be used under the terms of
| either the GNU General Public License Version 2 or later (the "GPL"), or
| the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
| in which case the provisions of the GPL or the LGPL are applicable instead
| of those above. If you wish to allow use of your version of this file only
| under the terms of either the GPL or the LGPL, and not to allow others to
| use your version of this file under the terms of the MPL, indicate your
| decision by deleting the provisions above and replace them with the notice
| and other provisions required by the GPL or the LGPL. If you do not delete
| the provisions above, a recipient may use your version of this file under
| the terms of any one of the MPL, the GPL or the LGPL.
|
| ***** END LICENSE BLOCK *****
*-----------------------------------------------------------------------------*/


// Create or verify existance of com.iskitz.js package
for(var _ = [this, -1, ["com","iskitz","js"]]; ++_[1] < _[2].length;)
{
   if(!_[0][_[2][_[1]]])
      _[0][_[2][_[1]]] = {};

   _[0] = _[0][_[2][_[1]]];
}

// Cleanup global helper variables
delete _[0];
delete _[1];
delete _[2];
_ = null;


/* Create com.iskitz.js.ajile object */
com.iskitz.js.ajile = new function()
{
   var VERSION = "0.3.6 Beta";
   var DEBUG   = false;

   if(containerFailsRequirements()) return;

   // List of System Types to disallow overriding of.
   var SYSTEM_TYPES = ["AbstractView", "Attr", "CDATASection", "CSS2Properties"
                        , "CSSCharsetRule", "CSSFontFaceRule", "CSSImportRule"
                        , "CSSMediaRule", "CSSPageRule", "CSSPrimitiveValue"
                        , "CSSRule", "CSSRuleList", "CSSStyleDeclaration"
                        , "CSSStyleRule", "CSSStyleSheet", "CSSUnknownRule"
                        , "CSSValue", "CSSValueList", "CharacterData", "Comment"
                        , "Counter", "DOMException", "DOMImplementation"
                        , "DOMImplementationCSS", "DOMString", "DOMTimeStamp"
                        , "Document", "DocumentCSS", "DocumentEvent"
                        , "DocumentFragment", "DocumentRange", "DocumentStyle"
                        , "DocumentTraversal", "DocumentType", "DocumentView"
                        , "Element", "ElementCSSInlineStyle", "Entity"
                        , "EntityReference", "Event", "EventException"
                        , "EventListener", "EventTarget", "HTMLAnchorElement"
                        , "HTMLAppletElement", "HTMLAreaElement"
                        , "HTMLBRElement", "HTMLBaseElement"
                        , "HTMLBaseFontElement", "HTMLBodyElement"
                        , "HTMLButtonElement", "HTMLCollection"
                        , "HTMLDListElement", "HTMLDOMImplementation"
                        , "HTMLDirectoryElement", "HTMLDivElement"
                        , "HTMLDocument", "HTMLElement", "HTMLFieldSetElement"
                        , "HTMLFontElement", "HTMLFormElement"
                        , "HTMLFrameElement", "HTMLFrameSetElement"
                        , "HTMLHRElement", "HTMLHeadElement"
                        , "HTMLHeadingElement", "HTMLHtmlElement"
                        , "HTMLIFrameElement", "HTMLImageElement"
                        , "HTMLInputElement", "HTMLIsIndexElement"
                        , "HTMLLIElement", "HTMLLabelElement"
                        , "HTMLLegendElement", "HTMLLinkElement"
                        , "HTMLMapElement", "HTMLMenuElement", "HTMLMetaElement"
                        , "HTMLModElement", "HTMLOListElement"
                        , "HTMLObjectElement", "HTMLOptGroupElement"
                        , "HTMLOptionElement", "HTMLParagraphElement"
                        , "HTMLParamElement", "HTMLPreElement"
                        , "HTMLQuoteElement", "HTMLScriptElement"
                        , "HTMLSelectElement", "HTMLStyleElement"
                        , "HTMLTableCaptionElement", "HTMLTableCellElement"
                        , "HTMLTableColElement", "HTMLTableElement"
                        , "HTMLTableRowElement", "HTMLTableSectionElement"
                        , "HTMLTextAreaElement", "HTMLTitleElement"
                        , "HTMLUListElement", "LinkStyle", "MediaList"
                        , "MouseEvent", "MutationEvent", "NamedNodeMap", "Node"
                        , "NodeFilter", "NodeIterator", "NodeList", "Notation"
                        , "ProcessingInstruction", "RGBColor", "Range"
                        , "RangeException", "Rect", "StyleSheet"
                        , "StyleSheetList", "Text", "TreeWalker", "UIEvent"
                        , "ViewCSS"
                      ];

   // Regular Expressions
   var RE_PARENT_DIR       = /(.*\/)[^\/]+/;
   var RE_PARENT_NAMESPACE = /(.*)\.[^\.]+/;
   var RE_RELATIVE_DIR     = /(\/\.\/)|(\/[^\/]*\/\.\.\/)/;
   var RE_URL_PROTOCOL     = /:\/\//;

   var DIR_NAMESPACE       = false;
   var DOT_NAMESPACE       = !DIR_NAMESPACE;
   var FRAMEWORK_DIR_PATH  = "com/iskitz/js/ajile";
   var FRAMEWORK_DOT_PATH  = "com.iskitz.js.ajile";
   var NSINFO              = new NameSpaceInfo();

   var listenersNotInitialized = false;

   var importCount   = 0;
   var nsInfoMap     = {};
   var _htmlHead;
   var _this;


   /*--------------------------------------------------------------------------+
   | NameSpaceInfo
   |+--------------------------------------------------------------------------+
   | Used to store path and namespace type information.
   *--------------------------------------------------------------------------*/
   function NameSpaceInfo(path, usesDots)
   {
      this.usesDots = usesDots;
      this.path = path;

      this.toString = function ()
      {
        return "NameSpaceInfo [ path: "      + this.path
                            + ", usesDots: " + this.usesDots
                            + " ]";
      };
   }


   /*--------------------------------------------------------------------------+
   | EnableDebugging (no)  // Boolean - Indicates whether to enable debugging
   |+--------------------------------------------------------------------------+
   | Used to enable external debugging of the framework. When called without
   | arguments debugging is enabled. If the <no> argument is supplied a value of
   | true would enable debugging while a value of false would disable it.
   *--------------------------------------------------------------------------*/
   function EnableDebugging(no)
   {
      DEBUG = no == undefined ? true : no;
   }


   /*--------------------------------------------------------------------------+
   | GetVersion
   |+--------------------------------------------------------------------------+
   | Used to retrieve the framework's VERSION information.
   *--------------------------------------------------------------------------*/
   function GetVersion()
   {
      return VERSION;
   }


   /*--------------------------------------------------------------------------+
   | Import (namespace   // String  - Package or filename of external script
   |           [, url]     // String  - Location of external script
   |           [, usesDots]// Boolean - Indicates if script is in dot notation
   |           [, owner])  // Object  - Imported scripts container
   |+--------------------------------------------------------------------------+
   | Used to dynamically load external JavaScripts and where possible make them
   | accessible via their shortened names
   | (i.e. Import = com.iskitz.js.ajile.Import).
   *--------------------------------------------------------------------------*/
   function Import(namespace, url, usesDots, owner)
   {
      if(listenersNotInitialized) initializeListeners();

      if(namespace == undefined || namespace == null)
         throw new PackageException(namespace);

      owner = owner || this;

      var start = namespace.lastIndexOf('.') + 1;
      var shortPackageID = namespace.substring(start);

      // check if this is a whole package import
      if(shortPackageID == '*')
      {
         // if full package name was '*', throw exception
         if(start <= 0) throw new PackageException('*');

         namespace = RE_PARENT_NAMESPACE.exec(namespace)[1];
      }
      // Disallow system types ovverriding
      else if(owner[shortPackageID])
         for(var t=SYSTEM_TYPES.length; --t >= 0;)
            if(shortPackageID == SYSTEM_TYPES[t])
               return undefined;

      var script = owner,
          nsParts = namespace.split('.');

      var _parentPkgID = '';

      for(var i=0, j = nsParts.length; i < j; i++)
         if(typeof script[nsParts[i]] != "undefined")
         {
            script = script[nsParts[i]];
            _parentPkgID += nsParts[i] + '.';
         }
         else break;

      if(i < j) /* package is undefined */
      {
         if(shortPackageID == '*')
            script = Package(namespace, url, usesDots, owner);

         // check if package import is already pending; if so don't re-import
         if(pendingImports.namespaces[namespace])
            return undefined;

         _parentPkgID = RE_PARENT_NAMESPACE.exec(namespace)[1];

         var nsInfo = nsInfoMap[_parentPkgID];

         // find & store base path on first import if not already found
         if(!nsInfo && !url)
         {
            nsInfo = getNSInfoFor(_parentPkgID
                                  , url
                                    || (_parentPkgID ? _parentPkgID.replace(/\./g, "\/")
                                                     : undefined));
         }

         // test for valid url
         if(url == undefined || url == null || url.constructor != String)
            url = (nsInfo != undefined && typeof nsInfo.path != "undefined")
                  ? nsInfo.path : NSINFO.path || '';

         // guarantee that url ends with '/'
         if(url.lastIndexOf('/') != (url.length - 1)) url += '/';

         // Translate package id from dot (.) notation to a file path if
         // working with dir notation JavaScripts
         // (i.e. /com/iskitz/js/ajile.js vs. /com.iskitz.js.ajile.js)
         if(usesDots
            || (usesDots == undefined
                && ((nsInfo && nsInfo.usesDots)
                    || (!nsInfo.path && NSINFO.usesDots))))
         {
            url += namespace;
         }
         else url += namespace.replace(/\./g,'\/');

         // If the package isn't already pending import, add it to the pending
         // list & load its external JavaScript file.
         if(pendingImports.add(namespace, url))
            Load(url + ".js");

         if(DEBUG) window.status += "Import [ "+namespace+" ]...\n";
      }
      else // package exists
      {
         // JavaScript has been loaded so check for short-name conflicts to avoid
         // overwriting any existing objects; If one exists the imported JavaScript
         // can still be accessed using its fully qualified name.
         if(typeof owner[shortPackageID] == "undefined")
         {
            owner[shortPackageID] = script;

            if(DEBUG)
               window.status += "<b><i>:: Imported [ "+shortPackageID+" ]</i></b>\n";
         }
         else if(DEBUG)
         {
            window.status += "<b><i>:: Imported [ "+namespace+" ]</i></b>\n";
         }
      }

      // return control so loading of the new package can complete
      return script;
   }


   /*--------------------------------------------------------------------------+
   | Load (url           // String  - Scripts location (i.e. http://.../a.js)
   |         [, container] // Object  - Window with script loading capability
   |         [, type]      // String  - Type of script (i.e. text/javascript)
   |         [, defer]     // Boolean - Flag for delaying script processing
   |         [, language]  // String  - Language script is written in.
   |         [, title])    // String  - Title for loaded script
   |+--------------------------------------------------------------------------+
   | Loads external JavaScripts; used by Import.
   *--------------------------------------------------------------------------*/
   function Load(url, container, type, defer, language, title)
   {
      if(DEBUG) window.status += "\nLOADING [ " + url + " ]...\n";

      // verify / attain container
      if(!container) container = window.document;

      // setup container
      if(typeof container.write == "undefined")
         if(typeof container.document != "undefined")
            container = container.document;
         else throw "Invalid container. Unable to load [" + url + "]";

      // test if HTML <head> is already cached; if not acquire and cache it
      //cacheHTMLHead(container);
      if(container && (!_htmlHead || container != _htmlHead.ownerDocument))
         _htmlHead = container.lastChild.firstChild;

      // no type or language set so set defaults for both
      if(!(type || language))
      {
         language = "JavaScript";
         type = "text/javascript";
      }

      // set defer
      if(defer == undefined) defer = false;

      // build the script object
      var script = container.createElement("script");

      if(!script)
      {
         LoadSimple(container, url, type, defer, language, title);
         return;
      }

      if(defer) script.defer = defer;
      if(language) script.language = language;
      if(title) script.title = title;
      if(type) script.type = type;

      // dynamically load the script via it's container
      //container.getElementsByTagName("head")[0].appendChild(script);
      _htmlHead.appendChild(script);

      // MSIE requires this to be done ONLY after appending <script> to <head>
      script.src = url;

      if(DEBUG) window.status += "LOADED  [ " + url + " ]...\n";
   }


   /** Simple VERSION of Load for browsers that don't fully support DOM 2.0 */
   function LoadSimple(container, src, type, defer, language, title)
   {
      if(!(container && container.write)) return;

      container.write("<script"
                      + (defer   ?  ' defer="defer"' : '')
                      + (language? (' language="'  + language + '"') : '')
                      + (title   ? (' title="'     + title + '"') : '')
                      + (type    ? (' type="'      + type + '"') : '')
                      + ' src="' + src + '"><\/script>');
   }


   /*--------------------------------------------------------------------------+
   | Package (namespace     // String  - Fully-qualified package name
   |            [, nsPath]    // String  - Location of external script
   |            [, usesDots]  // Boolean - Indicates package uses dot notation.
   |            [, owner])    // Object  - Container

   |+--------------------------------------------------------------------------+
   | Creates a uniquely-named package to encapsulate JavaScript functionality.
   *--------------------------------------------------------------------------*/
   function Package(namespace, url, usesDots, owner)
   {
      if(!namespace) return namespace;

      if(DEBUG)
      {
         window.status += "Processing [ " + getActiveImportee() + " ]..."
                       +  "\tPackage  [ " + namespace + " ]\n";
      }

      var script  = owner || window;

      // default package settings
      if(namespace == "*")
      {
         NSINFO.path = url || NSINFO.path;

         if(usesDots != undefined)
            NSINFO.usesDots = usesDots;

         return script;
      }

      // load / create the package
      var nsParts = namespace.split('.');
      for(var parentNamespace, i=0, j=nsParts.length; i < j; i++)
         if(typeof script[nsParts[i]] != "undefined")
            script = script[nsParts[i]];
         else
            script = script[nsParts[i]] = {};


      var nsInfo = nsInfoMap[namespace];

      // find & store base bath on first namespace definition if not already found
      if(!nsInfo)
      {
         if(!url)
            nsInfo = getNSInfoFor(namespace, namespace.replace(/\./g, "\/"));

         if(usesDots == undefined)
            return script;
      }


      // set package's default notation (usesDots or not)
      nsInfo.usesDots = usesDots != undefined
                        ? usesDots : typeof nsInfo.usesDots == "undefined"
                                     ? NSINFO.usesDots : nsInfo.usesDots;

      // set package's default path
      nsInfo.path = url != undefined
                    ? url : typeof nsInfo.path == "undefined"
                            ? NSINFO.path : nsInfo.path;

      return script;
   }


   /*--------------------------------------------------------------------------+
   | PackageException (String namespace)
   |+--------------------------------------------------------------------------+
   | Used to catch Package exceptions caused by invalid package ids.
   *--------------------------------------------------------------------------*/
   function PackageException(namespace)
   {
      this.name = FRAMEWORK_DOT_PATH + ".PackageException";
      this.message = "Invalid package name [" + namespace + "]";

      this.toString = function ()
      {
        return "[" + this.name + "] :: " + this.message;
      };
   }

   /* Stores ids of namespaces that are waiting to be imported */
   var pendingImports =
   {
      namespaces : [],

      add : function pendingImportsAdd(namespace, url)
      {
         if(this.namespaces[namespace]) return false;

         this.namespaces[namespace] = [namespace, url];
         ++this.namespaces.length;

         return true;
      },

      destroy : function pendingImportsDestroy(namespace)
      {
         delete this.namespaces[namespace];
         --this.namespaces.length;
      },

      get : function pendingImportsGet(namespace, owner)
      {
         var script = owner || window;
         namespace = namespace.split('.');

         for(var i=0, j=namespace.length; i < j; i++)
            if(typeof script[namespace[i]] != "undefined")
               script = script[namespace[i]];
            else
               return undefined;

         return script;
      },

      isEmpty : function pendingImportsIsEmpty()
      {
         return this.namespaces.length < 1;
      }
   };


   // Cache <head> for later use by Load
   function cacheHTMLHead(container)
   {
      // test if HTML <head> is already cached; if not acquire and cache it
      if(container && (!_htmlHead || container != _htmlHead.ownerDocument))
         _htmlHead = container.lastChild.firstChild;
   }


   /*--------------------------------------------------------------------------+
   | completeImports (e) // Object - Event
   |+--------------------------------------------------------------------------+
   | Attempts to complete any pending imports.
   *--------------------------------------------------------------------------*/
   function completeImports(e)
   {
      var script, _imports = pendingImports.namespaces;

      if(DEBUG) window.status += '\n';

      for(var pkgID in _imports)
         if((script = pendingImports.get(pkgID)))
         {
            Import(pkgID, null, null, this);
            script.jsBasePath = _imports[pkgID][1];
            pendingImports.destroy(pkgID);
         }
         else if(DEBUG)
            window.status += "<i>:: Pending   [ "+pkgID+" ]</i>\n";
   }


   function containerFailsRequirements()
   {
      return (   typeof document                   == "undefined"
              || typeof document.appendChild       == "undefined"
              || typeof document.createElement     == "undefined"
              || typeof document.getElementsByName == "undefined"
             );
   }


   function destroy()
   {
      // Remove exposed components
      delete Import;
      delete Load;
      delete Package;
      delete PackageException;

      try
      {
         // remove window listener package
         if(com.iskitz.js.events.WindowListeners)
         {
            com.iskitz.js.events.WindowListeners.destroy();

            // check if imported
            if(WindowListeners == com.iskitz.js.events.WindowListeners)
               WindowListeners = undefined;

            delete com.iskitz.js.events.WindowListeners;
         }
      }
      catch(e)
      {
         // library hasn't been loaded, exception is expected in that scenario
      }

      Ajile = undefined;
      delete com.iskitz.js.ajile;
   }

   /* Use to disable event handlers */
   function disabled()
   {
      return false;
   }


   /* Exposes Ajile features for public use */
   function exposeFramework()
   {
      window.Ajile = _this;

      window.Ajile.DIR_NAMESPACE = DIR_NAMESPACE;
      window.Ajile.DOT_NAMESPACE = DOT_NAMESPACE;

      window.Ajile.EnableDebugging = EnableDebugging;
      window.Ajile.GetVersion      = GetVersion;

      window.Import           = Import;
      window.Load             = Load;
      window.Package          = Package;
      window.PackageException = PackageException;
   }


   function getActiveImportee()
   {
      var pending = pendingImports.namespaces;
      var i = 2;

      for(var importee in pending)
         if(--i == 0)
            return importee;

      return '';
   }

   /*--------------------------------------------------------------------------+
   | getNSInfoFor([dotPath]     // String - Dot notation namespace to locate.
   |              [, dirPath])  // String - Directory path to locate.
   |+--------------------------------------------------------------------------+
   | Detects the default location from which to load external JavaScripts. When
   | neither the dirPath nor the dotPath parameters are supplied, the
   | Framework's location is used.
   *--------------------------------------------------------------------------*/
   function getNSInfoFor(dotPath, dirPath)
   {
      dirPath = dirPath || FRAMEWORK_DIR_PATH;
      dotPath = dotPath || FRAMEWORK_DOT_PATH;

      // Avoid the extra work if a default path is already set
      if(dirPath == FRAMEWORK_DIR_PATH
         && dotPath == FRAMEWORK_DOT_PATH
         && NSINFO.path)
         return NSINFO;

      var nsInfo = nsInfoMap[dotPath];

      if(nsInfo) return nsInfo;

      var dirPath2   = '/' + dirPath + '/';
      dirPath        = '/' + dirPath + '.';
      dotPath        = '/' + dotPath + '.';

      var usesDots, paths, path;
      var scripts = document.scripts || document.getElementsByTagName("script");

      if(!scripts) scripts = {length: 0};

      for(var lastHope, i1, i2=0, i=0, j=scripts.length; i < j || lastHope; i++)
      {
         path = lastHope ? scripts[i].parentNode.lastChild.src
                         : scripts[i].src;

         // if path is missing a protocol create an absolute path
         if(path.search(RE_URL_PROTOCOL) == -1)
         {
            path  = document.location.href;
            paths = RE_PARENT_DIR.exec(path);

            // only switch to parent dir if not already in root
            if(paths[1].length > path.search(RE_URL_PROTOCOL) + 3)
               path = paths[1];

            i2    = path.length;
            path += lastHope ? scripts[i].parentNode.lastChild.src
                             : scripts[i].src;
         }

         // search for dot notation
         i1 = path.indexOf(dotPath, i2) + 1;

         // path uses dot notation
         if(!(usesDots = i1 > 0))
            i1 = path.indexOf(dirPath, i2) + 1 || path.indexOf(dirPath2, i2) + 1;

         // Resolve relative paths ./ and ../ to absolute locations
         if(RE_RELATIVE_DIR.test(path))
         {
            do
            {
               path  = path.replace(RE_RELATIVE_DIR, '/');
            }while(RE_RELATIVE_DIR.test(path));

            i1 = path.lastIndexOf(dotPath) + 1
                 || path.lastIndexOf(dirPath) + 1
                 || path.lastIndexOf(dirPath2) + 1;
         }

         if(i1 > 0)   // Found namespace's loader; now extract path
         {
            // undo usesDots if path found doesn't exactly match this namespace
            if(usesDots)
               usesDots = i1 == (path.lastIndexOf(dotPath) + 1);

            path = path.substring(0, i1);
            break;
         }

         if((lastHope = !lastHope && (i == j - 1)))
            --i;

         // getting here means the framework's path was not found so reset
         path = usesDots = undefined;
         i2 = 0;
      }//end for(...scripts...)

      nsInfo = new NameSpaceInfo(path, usesDots);

      // store path for the namespace
      if(nsInfo.path)
         nsInfoMap[dotPath.slice(1,-1)] = nsInfo;

      return nsInfo;
   }//end getNSInfoFor(...)


   /* Initialize this package */
   function initializeFramework()
   {
      // Get the framework's detected base path and namespace type for scripts
      var nsInfo = getNSInfoFor(FRAMEWORK_DOT_PATH, FRAMEWORK_DIR_PATH);

      // Create the default NameSpaceInfo object
      NSINFO = new NameSpaceInfo();

      // Set the framework's default base path; current directory is default
      NSINFO.path = nsInfo.path || '';

      // Set the framework's default namespace type; dot is default
      NSINFO.usesDots = nsInfo.usesDots != undefined ? nsInfo.usesDots
                                                     : DOT_NAMESPACE;

      // Cache <head> for later use by Load
      cacheHTMLHead(window.document);

      window.status = "Powered by .: Ajile \u2122 :.  " + window.status;

      // Expose the Framework's features
      exposeFramework();

      // Import event listener functionality if not provided by container
      Import("com.iskitz.js.dom.events.EventTarget");

      // Now make sure framework's window events get configured
      listenersNotInitialized = true;
   }


   function initializeListeners()
   {
      try
      {
         // Extend com.iskitz.js.dom.events.EventTarget for window if necessary
         if(com.iskitz.js.dom && com.iskitz.js.dom.events.EventTarget)
            com.iskitz.js.dom.events.EventTarget.apply(window, []);
      }
      catch(e)
      {
         // library wasn't needed, functionality already present
      }

      if(!window.addEventListener) return;

      // Hides errors (no popup windows about code errors)
      window.addEventListener("error"  , disabled        , true);
      window.addEventListener("load"   , completeImports , true);
      window.addEventListener("unload" , destroy         , true);

      listenersNotInitialized = false;
   }


   // preserve reference to the this object
   _this = this;

   initializeFramework();
};