/*-----------------------------------------------------------------------------+
| Product:  JSPackaging Framework
|+-----------------------------------------------------------------------------+
| Author:   Michael Lee <iskitz@users.sourceforge.net>
| Created:  November 4th, 2003 [2003.11.04]
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
| The Original Code is JSPackaging Framework.
|
| The Initial Developer of the Original Code is
| Michael Lee.
| Portions created by the Initial Developer are Copyright (C) 2003
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


/* Object */ function JSImport(/* String */ packageID, /* String */ url, /* Optional Object */ owner)
{
   if(packageID == undefined || packageID == null)
      throw new JSPackageException(packageID);

   if(owner == undefined || owner == null)
      owner = this;

   var _start = packageID.lastIndexOf('.') + 1;
   var _shortPackageID = packageID.substring(_start);

   var _package;

   try
   {
      // check if this is a whole package import
      if(_shortPackageID == '*')
      {
         // if full package name was '*', throw exception
         if(_start <= 0) throw "Exception";

         packageID = packageID.substring(0, _start - 1);
      }

      _package = eval('owner.' + packageID);
   }
   catch(e) { /* sub-package is undefined */ }

   // package is undefined so attempt to load it
   if(_package == undefined)
   {
      // package is already pending so don't atempt to reload
      if(owner.pendingImports.get(packageID) != undefined)
         return _package;

      var _subPackageID = packageID;

      if(_shortPackageID != '*')
         if((_lastDot = packageID.lastIndexOf('.')) != -1)
            _subPackageID = packageID.substring(0, _lastDot);

      // test for valid url
      if(url != undefined && url != null && url.constructor == String)
      {
         // guarantee that url ends with '/'
         if(url.lastIndexOf('/') != (url.length - 1))
            url += '/';

         if(owner.getBasePath('') == undefined)
            owner.setBasePath('', url);

         owner.setBasePath(_subPackageID, url);
      }
      else if(owner.getBasePath != undefined)
         if((url = owner.getBasePath(_subPackageID)) == '')
            url = owner.getBasePath('');

      // save package id to import once loading has completed
      owner.pendingImports.add(packageID);

      // load JavaScript from URL
      JSLoad(url + packageID);

      // return control so loading of the new package can complete
      return _package;
   }
   else if(_shortPackageID == '*')
   {
      // setup short-name access for each Object in the package
      var _object;
      for(object in _package)
      {
         _object = owner[object];

         // Avoid overwriting an existing Object, no short-name access. All
         // access will be through fully qualified name.
         if(_object == undefined)
            eval('owner.' + object + '=_package.' + object +';');
      }
   }
   else // create short-form package
      eval('_package = owner.' + _shortPackageID + '=owner.' + packageID + ';');

   owner.setBasePath(packageID, url);

   if(_shortPackageID == '*') _package = owner;

   return _package;
};


function JSLoad(/* String */ url, /* Optional Object */ container, /* Optional String */ type, /* Optional boolean */ defer, /* Optional String */ language, /* Optional String */ title)
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
         type = ' type="text/javascript"';
      }
   }
   // set type
   else type = ' type="' + type + '"';

   // set language
   if(language != undefined && language != null)
      language = ' language="' + language + '"';
   else // set default language
      language = ' language="JavaScript"';

   // set title
   title = (title != undefined && title != null) ? ' title="' + title + '"' : '';

   // set defer
   if(defer == undefined) defer = false;

   // set url
   if(url != undefined && url != null && url.constructor == String)
   {
      if((_lastSlash = url.indexOf('/')) != -1)
         if(++_lastSlash < url.length)
            var _packageID = url.substring(_lastSlash);

      // preserve relative paths
      url = url.replace(/\.\./g, '<__dot-dot__>');

      // translate from dot (.) notation to file path
      url = ' src="' + url.replace(/\./g,'\/') + '.js"';

      // restore relative paths
      url = url.replace(/<__dot-dot__>/g, '..');
   }
   else url = '';

   // define loader
   var _jsLoader = '<script' + language + type + url + title +
                   (defer ? ' defer' : '') + '><\/script>';

   // add binder
   if(_packageID != undefined)
      _jsLoader += '<script' + language + type + title + ' defer>' +
                   'completeImports();<\/script>';

   // load the script through it's container
   container.write(_jsLoader);
};


/* Object */ function JSPackage(/* String */ packageID, /* Optional Object */ owner)
{
   if(owner == undefined && owner == null)
      owner = this;

   // configure owner to store base paths for all of it's loaded packages
   if(owner.getBasePath == undefined)
   {
      /* Stores all base paths for owner's loaded packages */
      owner.__basePaths = [];

      /* Set default base path to undefined */
      owner.__basePaths[''] = undefined;

      /* Retrieves a package's base path <blank> if not found */
      owner.getBasePath = function (packageID)
      {
         var _basePath;

         if((_basePath = this.__basePaths[packageID]) == undefined)
            if((_basePath = this.__basePaths['']) == undefined)
               if(__basePaths != undefined)
                  if(this.__basePaths != __basePaths)
                     if((_basePath = __basePaths[packageID]) == undefined)
                        if((_basePath = __basePaths['']) == undefined)
                           return '';

         return _basePath;
      };

      /* Sets a package's base path */
      owner.setBasePath = function (packageID, url)
      {
         if(url  == undefined || url == null) url = '';
         this.__basePaths[packageID] = url;
      };
   }

   // add functinality to complete pending imports
   if(owner.completeImports == undefined)
   {
      owner.completeImports = function ()
      {
         var _package, _imports = this.pendingImports.__imports;
         for(packageID in _imports)
         {
            try
            {
               eval('_package = this.' + packageID);
            }
            catch(e) { /* package hasn't been loaded */ }

            if(_package != undefined)
            {
               JSImport(packageID, null, this);
               delete this.pendingImports.__imports[packageID];
            }
         }
      };
   }

   // configure pending imports store
   if(owner.pendingImports == undefined)
   {
      /* Stores ids of packages that are waiting to be imported */
      owner.pendingImports =
      {
         __imports : [],

         add : function (/* String */ packageID)
         {
            this.__imports[packageID] = packageID;
         },

         get : function (/* String */ packageID)
         {
            return this.__imports[packageID];
         }
      };
   }

   // load / create package
   var _package = __JSPackage(packageID, owner);

   // attempt to complete any pending imports
   owner.completeImports();

   return _package;
}


/* Object */ function __JSPackage(/* String */ packageID, /* Optional Object */ owner)
{
   if(packageID == undefined || packageID == null)
      throw new JSPackageException(packageID);

   if(owner == undefined) owner = this;

   var _package;

   try
   {
      _package = eval('owner.' + packageID);
   }
   catch(e) { /* package is not fully defined */ }

   // test if package is defined
   if(_package == undefined)
   {
      var _end = packageID.lastIndexOf('.');

      if(_end == -1)
      {
         // create base package
         _package = eval('owner.' + packageID + '={};');
      }
      else
      {
         // create sub-packages
         JSPackage(packageID.substring(0, _end), owner);

         // create package
         _package = eval('owner.' + packageID + '={};');
      }
   }

   return _package;
}


/* String */ function JSPackageException(/* String */ packageID)
{
   this.name = "com.iskitz.js.packaging.JSPackageException";
   this.message = "Invalid package name [" + packageID + "]";

   this.toString = function ()
   {
     return "[" + this.name + "] :: " + this.message;
   };
};


// Create packaging package
JSPackage ("com.iskitz.js.packaging");
com.iskitz.js.packaging.JSImport = JSImport;
com.iskitz.js.packaging.JSLoad = JSLoad;
com.iskitz.js.packaging.JSPackage = JSPackage;
com.iskitz.js.packaging.JSPackageException = JSPackageException;
