/*-----------------------------------------------------------------------------+
| Author:      Michael Lee            [ http://iskitz.com/ ]
| Created:     Saturday,  May       15, 2010 [2010.05.15]
| Modified:    Wednesday, May       24, 2012 [2012.05.24]
|+-----------------------------------------------------------------------------+
|
| Description: A JavaScript module that demonstrates using Ajile with the Google
|              Maps API. This module is based on the Google Maps API version 3's
|              "Hello, World" example.
|+-----------------------------------------------------------------------------+
|
|              Visit http://ajile.net/ to start creating
|
|                    "Smart scripts that play nice!"
|
|           Copyright (c) 2003-2010 Michael Lee, iSkitz.com
|
|+----------------------------------------------------------------------------*/

Namespace ("com.iskitz.ajile.tests");

com.iskitz.ajile.tests.GoogleMap = (function()
{
   var NAME = "com.iskitz.ajile.tests.GoogleMap"
   ,   URL  = "http://maps.google.com/maps/api/js?sensor=false"
            + "&callback=" + NAME + ".load";

   function load ()
   {
      // Create a HTML DIV element to display the map:
      var mapDiv              = document.createElement ("div");
          mapDiv.style.height =
          mapDiv.style.width  = "100%";

      // Add the DIV to the document:
      document.body.appendChild (mapDiv);

      // Define the map's display properties:
      var mapSettings =
      {  center   : new google.maps.LatLng (40.742575, -73.911209)
      ,  mapTypeId: google.maps.MapTypeId.ROADMAP
      ,  zoom     : 12
      };

      // Create the map:
      var map = new google.maps.Map (mapDiv, mapSettings);
   }

   window.onunload = function()
   {
      Ajile.Unload (NAME);
      Ajile.Unload ();
   };

   return { load : load, URL : URL };

})();

Load (com.iskitz.ajile.tests.GoogleMap.URL);
