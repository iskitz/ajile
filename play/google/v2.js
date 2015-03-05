/*-----------------------------------------------------------------------------+
| Author:      Michael Lee            [ http://iskitz.com/ ]
| Created:     Tuesday,   September 12, 2006 [ 2006.09.12 ]
| Modified:    Wednesday, May       24, 2012 [ 2012.05.24 ]
|+-----------------------------------------------------------------------------+
|
| Description: A JavaScript module that demonstrates using Ajile with the Google
|              Maps API. This module is based on the Google Maps API version 2's
|              "Hello, World" example.
|+-----------------------------------------------------------------------------+
|
|              Visit http://ajile.net/ to start creating
|
|                    "Smart scripts that play nice!"
|
|           Copyright (c) 2003-2015 Michael Lee, iSkitz.com
|
|+----------------------------------------------------------------------------*/

Namespace ("com.iskitz.ajile.tests");

com.iskitz.ajile.tests.GoogleMap = (function()
{
   var global = this;

   var KEYS =
   {  "<PUT_DOMAIN_HERE>"        : "PUT_GOOGLE_MAPS_API_KEY_HERE"
   ,  "<PUT_OTHER_DOMAIN_HERE>"  : "PUT_GOOGLE_MAPS_API_KEY_HERE"
   };

   var NAME = "com.iskitz.ajile.tests.GoogleMap";

   var URL  = "http://maps.google.com/maps?file=api&v=2.x"
            + "&async=2&callback=" + NAME + ".load"
            + "&key=" + KEYS [location.hostname];


   function load ()
   {
      if (  "undefined" == typeof GMap2
         || "undefined" == typeof GLatLng
         || !GBrowserIsCompatible())
         return;

      var map = new GMap2 (document.getElementById ("map"));
      map.setCenter (new GLatLng (40.742575,-73.911209), 11);
   }

   window.onunload = function()
   {
      Ajile.Unload (NAME);
      Ajile.Unload ();
      !!global.GUnload && GUnload();
   };

   return { load : load, URL : URL };

})();

Load (com.iskitz.ajile.tests.GoogleMap.URL);
