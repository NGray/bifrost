"use strict";

$(function(){
var temps = [],
    zipList = [32303, 97201],
    getWeather = function (zipList){

          var counter = zipList.length,
              sortedTemps, tempDifference;

          // fire off all the ajax requests
          for (var i = 0; i < zipList.length; i++) {
            $.ajax({
                url: "http://api.wunderground.com/api/625172310aff38a6/geolookup/conditions/q/" + zipList[i] + ".json",
                dataType: "jsonp",
                success: function(json) {

                var conditions = {
                    cityName : json.current_observation.display_location.full,
                    currentTemp : json.current_observation.temp_f,
                    iconPath : json.current_observation.icon,
                    temp_diff :  tempDifference
                  }

                // cache the current time on each iteration  
                temps.push(conditions.currentTemp);

                --counter;
                if ( counter == 0 )  {
                    // sort temps to grab them in the correct order
                    sortedTemps = temps.sort();
                    tempDifference = sortedTemps[1] - sortedTemps[0];
                    tempDifference = tempDifference.toPrecision(2)
                   
                    var differenceSource   = $("#timeDiffTmpl").html(),
                      differenceTemplate = Handlebars.compile(differenceSource);
                      $("#diffWrap").append(differenceTemplate({
                      tempDifference: tempDifference
                      })
                    );
                }
               
              // Compile template and pass in conditions obj 
              var source   = $("#cityTmpl").html(),
                  template = Handlebars.compile(source);
                  $("#infoWrap").append(template(conditions));

           }  // end of success
       }); // end of $.ajax 
    } // end of for-loop   
  }




getWeather(zipList);
  
});



