/*-----------------------------------------------------------------------------+
| Product:  JSPackaging
|+-----------------------------------------------------------------------------+
| Author:   Michael Lee <iskitz@users.sourceforge.net>
| Created:  Tuesday,  November 04, 2003
| Modified: Saturday, February 07, 2004, 11:39:38 PM EST
| Version:  2.0
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
| Michael Lee.
| Portions created by the Initial Developer are Copyright (C) 2003-2004
| the Initial Developer. All Rights Reserved.
|
| Contributor(s): Michael Lee <iskitz@users.sourceforge.net>
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


/*-----------------------------------------------------------------------------+
| JSBasePath ([path])
|+-----------------------------------------------------------------------------+
| Used to set the default location from which to load external JavaScripts. When
| no path parameter is supplied, the this JavaScript's location is used.
*-----------------------------------------------------------------------------*/
function JSBasePath(path)
{
   if(path == undefined || path == null)
   {
      var scripts = document.getElementsByTagName("script");

      for(var index1, index2, i=0, j=scripts.length; i < j; i++)
      {
         if((index1 = scripts[i].src.indexOf("com.iskitz.jspackaging.")) == -1)
            index1 = scripts[i].src.indexOf("com/iskitz/jspackaging.");

         if(index1 > -1)
         {
            index2 = scripts[i].src.indexOf("://");

            if(index2 < index1)
            {
               index2 = index2 == -1 ? 0 : scripts[i].src.indexOf('/', (index2 + 3));
               path = scripts[i].src.substring(index2, index1);
               break;
            }
         }
      }
   }

   __JSBasePath = path == undefined ? '' : path;
}

/*-----------------------------------------------------------------------------+
| JSImport (String packageID [, String url] [, Boolean packed] [, Object owner])
|+-----------------------------------------------------------------------------+
| Used to dynamically load external JavaScripts and where possible make them
| accessible via their shortened names
| (i.e. JSImport = com.iskitz.jspackaging.JSImport).
*-----------------------------------------------------------------------------*/
function JSImport(packageID, url, packed, owner)
{
   if(packageID == undefined || packageID == null)
      throw new JSPackageException(packageID);

   if(owner == undefined || owner == null)
      owner = this;

   var _start = packageID.lastIndexOf('.') + 1;
   var _shortPackageID = packageID.substring(_start);

   // check if this is a whole package import
   if(_shortPackageID == '*')
   {
      // if full package name was '*', throw exception
      if(_start <= 0) throw new JSPackageException('*');

      packageID = packageID.substring(0, _start - 1);
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
      if(owner.jsPendingImports.get(packageID) != undefined)
         return undefined;

      // test for valid url
      if(url == undefined || url == null || url.constructor != String)
         url = typeof __JSBasePath != "undefined" ? __JSBasePath : '';

      // guarantee that url ends with '/'
      if(url.lastIndexOf('/') != (url.length - 1)) url += '/';

      // save package id & url for import once loading has completed
      owner.jsPendingImports.add(packageID, url);

      // Translate package id from dot (.) notation to a file path if not
      // working with packed JavaScripts
      // (i.e. /com/iskitz/jspackaging.js instead of /com.iskitz.jspackaging.js)

      if(!packed && !__JSPacked)
         url += packageID.replace(/\./g,'\/');
      else url += packageID;

      // load external JavaScript from URL
      JSLoad(url + ".js");

      // check if jsImportThread should be started
      if(owner.jsImportThread == undefined)
         if(!owner.jsPendingImports.isEmpty())
         {
            // do pending imports scan 10/second; stop after 1 second elapses
            owner.jsImportThread = setInterval(owner.jsCompleteImports, 1);
         }

      // check if jsImportThread should be stopped
      if(owner.jsImportThread != undefined)
         if(owner.jsPendingImports.isEmpty())
         {
            clearInterval(owner.jsImportThread);
            owner.jsImportThread = undefined;
         }

      // return control so loading of the new package can complete
      return _package;
   }
   else // package exists
   {
      // JavaScript has been loaded so check for short-name conflicts to avoid
      // overwriting any existing objects; If one exists the imported JavaScript
      // can still be accessed using its fully qualified name.
      if(typeof owner[_shortPackageID] == "undefined")
         owner[_shortPackageID] = _package;

      //DEBUG: window.status += "["+_shortPackageID+"]";
   }

   return _package;
}

/*-----------------------------------------------------------------------------+
| JSLoad (String url [, Object container] [, String type] [, Boolean defer]
|         [, String language] [, String title])
|+-----------------------------------------------------------------------------+
| Used by JSImport to load external JavaScripts; can be used as a standalone.
*-----------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------+
| JSPackage (String packageID [, String owner])
|+-----------------------------------------------------------------------------+
| Used to create a uniquely-named package for containing related JavaScripts.
*-----------------------------------------------------------------------------*/
function JSPackage(packageID, owner)
{
   if(owner == undefined && owner == null)
      owner = this;

   // add functinality to complete pending imports
   if(typeof owner.jsCompleteImports == "undefined")
   {
      owner.jsImportThread = undefined;
      //DEBUG: count = 0;

      owner.jsCompleteImports = function ()
      {
         //DEBUG: status = "Scanned for pending JSImports [" + ++count + "] times";

         var _package, _imports = owner.jsPendingImports.packages;

         for(pkgID in _imports)
         {
            _package = owner.jsPendingImports.get(pkgID);

            if(_package != undefined)
            {
               JSImport(pkgID, null, null, this);
               _package.jsBasePath = _imports[pkgID][1];
               owner.jsPendingImports.destroy(pkgID);
            }
         }

         if(owner.jsPendingImports.isEmpty())
            clearInterval(owner.jsImportThread);
      };
   }

   // configure pending imports store
   if(typeof owner.jsPendingImports == "undefined")
   {
      /* Stores ids of packages that are waiting to be imported */
      owner.jsPendingImports =
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

         get : function (packageID)
         {
            var _package = owner;
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
   }

   var _package = owner;
   packageID = packageID.split('.');

   // load / create the package
   for(var i=0, j=packageID.length; i < j; i++)
      if(typeof _package[packageID[i]] == "undefined")
         _package = _package[packageID[i]] = {};
      else
         _package = _package[packageID[i]];

   // attempt to complete any pending imports
   owner.jsCompleteImports();

   return _package;
}

/*-----------------------------------------------------------------------------+
| JSPackageException (String packageID)
|+-----------------------------------------------------------------------------+
| Used to catch JSPackage exceptions caused by invalid package ids.
*-----------------------------------------------------------------------------*/
function JSPackageException(packageID)
{
   this.name = "com.iskitz.jspackaging.JSPackageException";
   this.message = "Invalid package name [" + packageID + "]";

   this.toString = function ()
   {
     return "[" + this.name + "] :: " + this.message;
   };
}

/*-----------------------------------------------------------------------------+
| JSPacked (Boolean isPacked)
|+-----------------------------------------------------------------------------+
| Used to indicate use of packed rather than directory-expanded JavaScripts
| (i.e. /com.iskitz.jspackaging.js  vs.  /com/iskitz/jspackaging.js).
*-----------------------------------------------------------------------------*/
function JSPacked(isPacked)
{
   __JSPacked = isPacked == undefined ? false: isPacked;
}


// Set default external JavaScript path based on this JavaScript's location
var __JSBasePath;
JSBasePath (__JSBasePath);

// Indicate that use of packed JavaScripts is off by default
var __JSPacked;
JSPacked (__JSPacked);

// Create com.iskitz.jspackaging package
JSPackage ("com.iskitz.jspackaging");
com.iskitz.jspackaging.JSBasePath = JSBasePath;
com.iskitz.jspackaging.JSImport = JSImport;
com.iskitz.jspackaging.JSLoad = JSLoad;
com.iskitz.jspackaging.JSPackage = JSPackage;
com.iskitz.jspackaging.JSPackageException = JSPackageException;
com.iskitz.jspackaging.JSPacked = JSPacked;
com.iskitz.jspackaging.jsBasePath = __JSBasePath;

// Hides errors (no popup windows about code errors)
window.onerror = function() { return false; };