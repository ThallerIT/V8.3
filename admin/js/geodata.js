//<![CDATA[

    let map = null;
    let geocoder = null;
    let recentOverlay = null;
    let recentPolyline = null;
    let poly = Array();

    function crop(val)
    {
        val = val + "0000000000";
        return val.substring(0, val.indexOf('.') + 7);
    }

    function load() {
      if (GBrowserIsCompatible()) {

        let lat = document.getElementById("j_Latitude").value * 1.0;
        let lng = document.getElementById("j_Longitude").value * 1.0;
        let zof = document.getElementById("j_ZoomFactor").value * 1.0;


        if (zof < 1 || zof == '' || lat=='' || lng=='') zof = 6;
        if (lat==0 || lat == '') lat = 47.70;
        if (lng==0 || lng == '') lng = 13.16;


        map = new GMap2(document.getElementById("geodata"));
        map.addControl(new GLargeMapControl());
        map.setCenter(new GLatLng(lat, lng), zof);

        geocoder = new GClientGeocoder();

        if (document.getElementById("j_Latitude").value == lat && document.getElementById("j_Longitude").value == lng)
        {
            let point = new GLatLng(lat,lng);
            map.setCenter(point, zof);
            let marker = new GMarker(point);
            map.addOverlay(marker);

            recentOverlay = marker;
        }

        GEvent.addListener(map, "click", function(overlay, point) {
          if (overlay) {
            map.removeOverlay(overlay);
          } else {

            let marker = new GMarker(point);

            document.getElementById("j_Longitude").value = point.lng();
            document.getElementById("j_Latitude").value = point.lat();
            document.getElementById("j_ZoomFactor").value = map.getZoom();

            map.setCenter(point, map.getZoom());

            if (recentOverlay) {
              map.removeOverlay(recentOverlay);
            }
            map.addOverlay(marker);
            recentOverlay = marker;
          }
        });

        GEvent.addListener(map, "zoomend", function(oldlevel, newlevel) {

            document.getElementById("j_ZoomFactor").value = newlevel;
        });

      }
    }

    function showPoly()
    {
        let lins = Array();
        let pairs = Array();

        if (document.getElementById("j_AdditionalPoints").value!='') {
          lins = document.getElementById("j_AdditionalPoints").value.split('\n');
        }

        for (const element of lins)
        {
            if (element.replace(/\n/,'').replace(/\r/,'')!='')
            {
                let tmp = element.split(',');
                pairs.push(new GLatLng(tmp[0],tmp[1]));
            }
        }

        document.getElementById("geodata_size").value = pairs.length;

        let polyline = new GPolyline(pairs,"#FF0000", 10);

        if (recentPolyline) {
          map.removeOverlay(recentPolyline);
        }

        recentPolyline = polyline;

        map.addOverlay(polyline);

        let point = pairs[pairs.length-1];

        let marker = new GMarker(point);
        map.addOverlay(marker);
        document.getElementById("j_Longitude").value = point.lng();
        document.getElementById("j_Latitude").value  = point.lat();

        if (recentOverlay) {
          map.removeOverlay(recentOverlay);
        }
        recentOverlay = marker;
    }

    function showAddress(address) {

      if (geocoder) {
        geocoder.getLatLng(address,function(point) {
            if (!point) {
              alert(address + " not found. please retry!");
            } else {
              map.setCenter(point, 16);
              let marker = new GMarker(point);
              map.addOverlay(marker);
              marker.openInfoWindowHtml(address);
              document.getElementById("j_Longitude").value = point.lng();
              document.getElementById("j_Latitude").value  = point.lat();

              if (recentOverlay) {
                map.removeOverlay(recentOverlay);
              }
              recentOverlay = marker;
            }
          }
        );
      }
    }

    function getCoords()
    {
        if (document.getElementById("j_Latitude").value!='' && document.getElementById("j_Longitude").value!='')
        {
            return crop(document.getElementById("j_Latitude").value) +','+crop(document.getElementById("j_Longitude").value) ;
        }
    }

    function addToPoly()
    {
        let pairs = Array();

        if (document.getElementById("j_AdditionalPoints").value!='')
        {
            let lins = document.getElementById("j_AdditionalPoints").value.split('\n');

            for (const element of lins)
            {
                if (element!='') {
                  pairs.push(element.replace(/\n/,'').replace(/\r/,''));
                }
            }
        }

        let newPoint = getCoords();

        if (document.getElementById("j_Latitude").value!='' && document.getElementById("j_Longitude").value!='' && pairs[pairs.length-1] != newPoint)
        {
            pairs.push(newPoint);
            document.getElementById("j_AdditionalPoints").value = pairs.join('\n');
        }

        showPoly();
    }

    function removeFromPoly()
    {
        let pairs = Array();

        if (document.getElementById("j_AdditionalPoints").value!='')
        {
            let lins = document.getElementById("j_AdditionalPoints").value.split('\n');

            for (const element of lins) {

              if (element!='') {
                pairs.push(element.replace(/\n/,'').replace(/\r/,''));
              }
            }

            pairs.pop();
            document.getElementById("j_AdditionalPoints").value = pairs.join('\n');

            if (document.getElementById("j_AdditionalPoints").value!='') {
              showPoly();
            }
        }
    }

    //]]>