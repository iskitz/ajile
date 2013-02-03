/*-----------------------------------------------------------------------------+
| Product:  JSPackaging [com.iskitz.js.packaging]
|+-----------------------------------------------------------------------------+
| Author:   Michael A. I. Lee <iskitz@users.sourceforge.net>
| Created:  Tuesday,  November 04, 2003
| Modified: Saturday, May 02, 2004, 04:00:00 PM EST
| Version:  2.1
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
| The Original Code is JSPackaging.
|
| The Initial Developer of the Original Code is
| Michael A. I. Lee.
| Portions created by the Initial Developer are Copyright (C) 2003-2004
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
for(___a=window, ___b=0, ___c=["com","iskitz","js"]; ___b < ___c.length; ___b++)
{
   if(typeof ___a[___c[___b]] == "undefined") ___a[___c[___b]] = {};
   ___a = ___a[___c[___b]];
}

// Cleanup global helper variables
delete ___a;
delete ___b;
delete ___c;


/* Create com.iskitz.js.packaging object */
com.iskitz.js.packaging = new function ()
{
   var importCount = 0;
   var ImportThread;
   var jsPacked;
   var jsPath;
   var _path = "com/iskitz/js/packaging";
   var _pathPacked = "com.iskitz.js.packaging";

   /* Stores ids of packages that are waiting to be imported */
   var pendingImports =
   {
      packages : [],

      add : function (packageID, url)
      {
         this.packages[packageID] = [packageID, url];
         ++this.packages.length;
      },

      destroy : function (packageID)
      {
         delete this.packages[packageID];
         --this.packages.length;
      },

      get : function (packageID, owner)
      {
         var _package = (owner == undefined || owner == null) ? window : owner;
         packageID = packageID.split('.');

         for(var i=0, j=packageID.length; i < j; i++)
            if(typeof _package[packageID[i]] != "undefined")
               _package = _package[packageID[i]];
            else
               return undefined;

         return _package;
      },

      isEmpty : function ()
      {
         return this.packages.length < 1;
      }
   };


   /* Completes pending imports */
   function CompleteImports(owner)
   {
      var _package, _imports = pendingImports.packages;

      for(pkgID in _imports)
      {
         _package = pendingImports.get(pkgID, owner);

         if(_package != undefined)
         {
            this.JSImport(pkgID, null, null, this);
            _package.jsBasePath = _imports[pkgID][1];
            pendingImports.destroy(pkgID);
         }
      }

      if(pendingImports.isEmpty())
         clearInterval(ImportThread);

      //DEBUG: status = "Scanned for pending JSImports [" + (++importCount) + "] times";
   }


   /* Exposes JSLoader features for use */
   function exposeFeatures(JSPackaging)
   {
      JSPackaging.CompleteImports = CompleteImports;
      JSPackaging.JSImport  = window.JSImport  = JSImport;
      JSPackaging.JSLoad    = window.JSLoad    = JSLoad;
      JSPackaging.JSPackage = window.JSPackage = JSPackage;
      JSPackaging.JSPackageException = window.JSPackageException = JSPackageException;
      JSPackaging.JSPacked  = window.JSPacked  = JSPacked;
      JSPackaging.SetBasePath = SetBasePath;
   }


   /*--------------------------------------------------------------------------+
   | JSImport (packageID   // String  - Package or filename of external script
   |           [, url]     // String  - Location of external script
   |           [, packed]  // Boolean - Indicates if script is in packed form
   |           [, owner])  // Object  - Imported scripts container
   |+--------------------------------------------------------------------------+
   | Used to dynamically load external JavaScripts and where possible make them
   | accessible via their shortened names
   | (i.e. JSImport = com.iskitz.js.packaging.JSImport).
   *--------------------------------------------------------------------------*/
   function JSImport(packageID, url, packed, owner)
   {
      if(packageID == undefined || packageID == null)
         throw new JSPackageException(packageID);

      if(owner == undefined || owner == null)
         owner = this;

      var start = packageID.lastIndexOf('.') + 1;
      var shortPackageID = packageID.substring(start);

      // check if this is a whole package import
      if(shortPackageID == '*')
      {
         // if full package name was '*', throw exception
         if(start <= 0) throw new JSPackageException('*');

         packageID = packageID.substring(0, start - 1);
      }

      var i = 0,
          _package = owner,
          pkgIDs = packageID.split('.');

      for(var j = pkgIDs.length; i < j; i++)
         if(typeof _package[pkgIDs[i]] != "undefined")
            _package = _package[pkgIDs[i]];
         else
            break;

      if(i < j) /* package is undefined */
      {
         // check if package import is already pending; if so don't re-import
         if(pendingImports.get(packageID) != undefined)
            return undefined;

         // test for valid url
         if(url == undefined || url == null || url.constructor != String)
            url = typeof jsPath != "undefined" ? jsPath : '';

         // guarantee that url ends with '/'
         if(url.lastIndexOf('/') != (url.length - 1)) url += '/';

         // save package id & url for import once loading has completed
         pendingImports.add(packageID, url);

         // Translate package id from dot (.) notation to a file path if not
         // working with packed JavaScripts
         // (i.e. /com/iskitz/js/packaging.js vs. /com.iskitz.js.packaging.js)
         if(!packed && !jsPacked)
            url += packageID.replace(/\./g,'\/');
         else url += packageID;

         // load external JavaScript from URL
         JSLoad(url + ".js");

         // check if jsImportThread should be started
         if(ImportThread == undefined)
            if(!pendingImports.isEmpty())
            {
               // do pending imports scan 100/second
               ImportThread = setInterval(CompleteImports, 1);
            }

         // check if ImportThread should be stopped
         if(ImportThread != undefined)
            if(pendingImports.isEmpty())
            {
               clearInterval(ImportThread);
               ImportThread = undefined;
            }

         // return control so loading of the new package can complete
         return _package;
      }
      else // package exists
      {
         // JavaScript has been loaded so check for short-name conflicts to avoid
         // overwriting any existing objects; If one exists the imported JavaScript
         // can still be accessed using its fully qualified name.
         if(typeof owner[shortPackageID] == "undefined")
            owner[shortPackageID] = _package;

         //DEBUG: window.status += "["+shortPackageID+"]";
      }

      return _package;
   }


   /*--------------------------------------------------------------------------+
   | JSLoad (url           // String  - Scripts location (i.e. http://.../a.js)
   |         [, container] // Object  - Window with script loading capability
   |         [, type]      // String  - Type of script (i.e. text/javascript)
   |         [, defer]     // Boolean - Flag for delaying script processing
   |         [, language]  // String  - Language script is written in.
   |         [, title])    // String  - Title for loaded script
   |+--------------------------------------------------------------------------+
   | Loads external JavaScripts; used by Import.
   *--------------------------------------------------------------------------*/
   function JSLoad(url, container, type, defer, language, title)
   {
      // verify / attain container
      if(container == undefined || container == null) container = this;

      // setup container
      if(typeof container.write == "undefined")
         if(typeof container.document != "undefined")
            container = container.document;
         else throw "Invalid container. Unable to load [" + url + "]";

      // no type set
      if(type == undefined || type == null)
      {
         type = '';

         // no language so set default type
         if(language == undefined || language == null)
         {
            language = undefined;
            type = "text/javascript";
         }
      }

      // set default language
      if(language == undefined || language == null) language = "JavaScript";

      // set title
      if(title == undefined || title == null) title = '';

      // set defer
      if(defer == undefined) defer = false;

      // build the script object
      var script = container.createElement("script");
      script.defer = defer;
      script.language = language;
      script.title = title;
      script.type = type;
      script.src = url;

      // dynamically load the script via it's container
      var head = container.getElementsByTagName("head")[0];
      head.appendChild(script);
   }


   /*--------------------------------------------------------------------------+
   | JSPackage (packageID    // String - Fully-qualified package name
   |            [, owner])   // Object - Container

   |+--------------------------------------------------------------------------+
   | Createa a uniquely-named package to encapsulate JavaScript functionality.
   *--------------------------------------------------------------------------*/
   function JSPackage(packageID, owner)
   {
      var _package = (owner == undefined || owner == null) ? window : owner;
      packageID = packageID.split('.');

      // load / create the package
      for(var i=0, j=packageID.length; i < j; i++)
         if(typeof _package[packageID[i]] == "undefined")
            _package = _package[packageID[i]] = {};
         else
            _package = _package[packageID[i]];

      // attempt to complete any pending imports
      CompleteImports(owner);

      return _package;
   }


   /*--------------------------------------------------------------------------+
   | JSPackageException (String packageID)
   |+--------------------------------------------------------------------------+
   | Used to catch JSPackage exceptions caused by invalid package ids.
   *--------------------------------------------------------------------------*/
   function JSPackageException(packageID)
   {
      this.name = _pathPacked + ".JSPackageException";
      this.message = "Invalid package name [" + packageID + "]";

      this.toString = function ()
      {
        return "[" + this.name + "] :: " + this.message;
      };
   }

   /*--------------------------------------------------------------------------+
   | JSPacked ([isPacked]) // Boolean - Flag to indicate if JavaScript is packed
   |+--------------------------------------------------------------------------+
   | Used to indicate use of packed rather than directory-expanded JavaScripts
   | (i.e. /com.iskitz.js.packaging.js  vs.  /com/iskitz/js/packaging.js).
   *--------------------------------------------------------------------------*/
   function JSPacked(isPacked)
   {
      jsPacked = isPacked == undefined ? true: isPacked;
   }


   /*--------------------------------------------------------------------------+
   | SetBasePath ([path]) // String - URL or directory where JavaScripts reside.
   |+--------------------------------------------------------------------------+
   | Sets the default location from which to load external JavaScripts. When the
   | path parameter isn't supplied, this JavaScript's location is used.
   *--------------------------------------------------------------------------*/
   function SetBasePath(path)
   {
      if(path == undefined || path == null)
      {
         var scripts = document.getElementsByTagName("script");

         for(var index1, index2, i=0, j=scripts.length; i < j; i++)
         {
            if((index1 = scripts[i].src.indexOf(_pathPacked + '.')) == -1)
               index1 = scripts[i].src.indexOf(_path + '.');

            if(index1 > -1)
            {
               index2 = scripts[i].src.indexOf(":\/\/");

               if(index2 < index1)
               {
                  index2 = index2 == -1 ? 0 : scripts[i].src.indexOf('/', (index2 + 3));
                  path = scripts[i].src.substring(index2, index1);
                  break;
               }
            }
         }
      }

      jsPath = path == undefined ? '' : path;
   }

   // Initialize JSPackaging to expect directory ordered scripts by default
   JSPacked (false);

   // Set the default path for script loading
   SetBasePath();

   // Expose JSPackaging features
   exposeFeatures(this);

   // Hides errors (no popup windows about code errors)
   window.onerror = function() { return false; };
};
