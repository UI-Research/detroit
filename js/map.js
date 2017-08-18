/*OAKLAND*/
        mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
       
        var COLORS = ['#cfe8f3', '#cfe8f3','#1696d2', '#1696d2', '#0a4c6a', '#0a4c6a', '#0a4c6a', '#0a4c6a'];
        var BREAKS = {
                "STUDY_LAND": ["commercial","exempt","industrial", "institutional", "land", "mixed", "multi-unit residential", "residential"]
                            // [-0.49, -0.024, -0.023, 0.1301, 0.1302, 0.203],
               // "G1B2012.x": [-0.57, -0.049, -0.049, 0.1351, 0.1351, 0.2]
                            //[-0.57, -0.049, -0.048, 0.1351, 0.1352, 0.2]
            };
        var BASE='STUDY_LAND';
        var FILTERUSE;
        var map = new mapboxgl.Map({
            container: 'map',
         //   style: 'mapbox://styles/mapbox/dark-v9',
            style: 'mapbox://styles/urbaninstitute/cj6f4xa0426mm2rk33ef922w8',
            center: [-83.1692441,42.3726897],
            zoom: 9.7
        });
        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.Navigation());
        //add some point data and style it
        map.on('load', function () {
            map.addSource("landUse", {
                "type": "geojson",
                "data": 'data/detroit2.json'
            });
            
            //  map.addLayer({
            //     "id": "landUse_fill",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": {
            //             property: 'STUDY_LAND',
            //             stops: [
            //         [BREAKS[BASE][0], COLORS[0]]
            //         // [BREAKS[BASE][1], COLORS[1]],
            //         // [BREAKS[BASE][2], COLORS[2]],
            //         // [BREAKS[BASE][3], COLORS[3]],
            //         // [BREAKS[BASE][4], COLORS[4]],
            //         // [BREAKS[BASE][5], COLORS[5]]
                  
            //         ]},
            //         "fill-opacity": 0.85,
            //         "fill-outline-color": "#ffffff"
            //     }
            // }); 
            //OPTION 1//
            // map.addLayer({
            //     "id": "all",
            //     "type": "line",
            //     "source": "landUse",
            //     "paint": {
            //         "line-color": "#fff",
            //         'line-width': 2

            //     },

             //   "filter": ["==", "STUDY_LAND", "commercial"]
               
            // }); 
            map.addLayer({
                "id": "commercial",
                "type": "fill",
                "source": "landUse",
                "paint": {
                    "fill-color": "#fdbf11"
                },
                "filter": ["==", "STUDY_LAND", "commercial"]
               
            }); 


            map.addLayer({
                "id": "exempt",
                "type": "fill",
                "source": "landUse",
                "paint": {
                    "fill-color": "#78c26d"
                },
                "filter": ["==", "STUDY_LAND", "exempt"]
               
            }); 
            map.addLayer({
                "id": "industrial",
                "type": "fill",
                "source": "landUse",
                "paint": {
                    "fill-color": "#1696d2"
                },
                "filter": ["==", "STUDY_LAND", "industrial"]
               
            }); 

            map.addLayer({
                "id": "institutional",
                "type": "fill",
                "source": "landUse",
                "paint": {
                    "fill-color": "#78c26d"
                },
                "filter": ["==", "STUDY_LAND", "institutional"]
               
            }); 

            map.addLayer({
                "id": "mixed",
                "type": "fill",
                "source": "landUse",
                "paint": {
                    "fill-color": "#fdbf11"
                },
                "filter": ["==", "STUDY_LAND", "mixed"]
               
            }); 

            map.addLayer({
                "id": "multi-unit",
                "type": "fill",
                "source": "landUse",
                "paint": {
                    "fill-color": "#ca5800"
                },
                "filter": ["==", "STUDY_LAND", "multi-unit residential"]
               
            }); 
        //OPTION 1

            // map.addLayer({
            //     "id": "land",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#78c26d"
            //     },
            //     "filter": ["==", "STUDY_LAND", "land"]
               
            // }); 

            // map.addLayer({
            //     "id": "residential",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#1696d2"
            //     },
            //     "filter": ["==", "STUDY_LAND", "residential"]
               
            // }); 

            //         map.addLayer({
            //     "id": "commercial",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#fdbf11"
            //     },
            //     "filter": ["==", "STUDY_LAND", "commercial"]
               
            // }); 


            // map.addLayer({
            //     "id": "exempt",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#d2d2d2"
            //     },
            //     "filter": ["==", "STUDY_LAND", "exempt"]
               
            // }); 
            // map.addLayer({
            //     "id": "industrial",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#000000"
            //     },
            //     "filter": ["==", "STUDY_LAND", "industrial"]
               
            // }); 

            // map.addLayer({
            //     "id": "institutional",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#d2d2d2"
            //     },
            //     "filter": ["==", "STUDY_LAND", "institutional"]
               
            // }); 

            // map.addLayer({
            //     "id": "mixed",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#fdbf11"
            //     },
            //     "filter": ["==", "STUDY_LAND", "mixed"]
               
            // }); 

            // map.addLayer({
            //     "id": "multi-unit",
            //     "type": "fill",
            //     "source": "landUse",
            //     "paint": {
            //         "fill-color": "#ca5800"
            //     },
            //     "filter": ["==", "STUDY_LAND", "multi-unit residential"]
               
            // }); 



        });

        // map.on("mousemove", function (e) {
        //     var features = map.queryRenderedFeatures(e.point, {
        //         layers: ["tract-fill"]
        //     });
            

        //     if(IS_MOBILE){
        //         if (features.length) {
        //             console.log('3')
        //             //show name and value in sidebar
        //            /* document.getElementById('tooltip-name').innerHTML = "Census Tract GEOID" + features[0].properties.GEOID;*/
        //             document.getElementById('tooltip-mobile').innerHTML = "From 2011–2012, the employment rate was " + Math.round(features[0].properties[BASE]*100)/100 + "%" + ".";
        //             //for troubleshooting - show complete features info
        //             //document.getElementById('tooltip').innerHTML = JSON.stringify(features, null, 2);
        //         } else {
        //             //if not hovering over a feature set tooltip to empty
        //             document.getElementById('tooltip-name-mobile').innerHTML = "";
        //             document.getElementById('tooltip-mobile').innerHTML = "";
        //         }
        //     }else{
        //         if (features.length) {
        //             console.log('3')
        //             //show name and value in sidebar
        //             document.getElementById('tooltip-name').innerHTML = "Census Tract GEOID" + features[0].properties.GEOID;
        //             document.getElementById('tooltip').innerHTML = "From 2011–2012, the employment rate was " + Math.round(features[0].properties[BASE]*100)/100 + "%" + ".";
        //             //for troubleshooting - show complete features info
        //             //document.getElementById('tooltip').innerHTML = JSON.stringify(features, null, 2);
        //         } else {

        //             //if not hovering over a feature set tooltip to empty
        //             document.getElementById('tooltip-name').innerHTML = "";
        //             document.getElementById('tooltip').innerHTML = "";
        //         }
        //     }

        //      map.on("mousemove", function(e) {
        //         var features = map.queryRenderedFeatures(e.point, { layers: ["tract-fill"] });
        //         if (features.length) {
        //             map.setFilter("tract-hover", ["==", "GEOID10", features[0].properties.GEOID10]);
        //         } else {
        //             map.setFilter("tract-hover", ["==", "GEOID10", ""]);
        //         }
        //     });

        // // Reset the route-hover layer's filter when the mouse leaves the map
        //     map.on("mouseout", function() {
        //         map.setFilter("tract-hover", ["==", "GEOID10", ""]);
        //     });
        // });

 
    //  $('#base-btns label').click(function () {
    //     BASE = $(this).attr("id");

    //     map.setPaintProperty('tract-fill', 'fill-color', {
    //         property: BASE,
    //         stops: [
    //                 [BREAKS[BASE][0], COLORS[0]],
    //                 [BREAKS[BASE][1], COLORS[1]],
    //                 [BREAKS[BASE][2], COLORS[2]],
    //                 [BREAKS[BASE][3], COLORS[3]],
    //                 [BREAKS[BASE][4], COLORS[4]],
    //                 [BREAKS[BASE][5], COLORS[5]]
          
    //                 ]
    //     });
    // })
  
 
  /*  $('#map-btns label').click(function () {
        OUTLINE = $(this).attr("id");
        map.setFilter('tract_line', [">",OUTLINE, 2])

    }) */

var IS_MOBILE = $("#isMobile").css("display") == "block"
window.onresize = function(){
    IS_MOBILE = $("#isMobile").css("display") == "block"
}

 var pymChild = new pym.Child()

 