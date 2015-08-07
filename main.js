/* Convert path to points */

(function() {
    'use strict';

// Get path data 
// pathSegList based on http://bl.ocks.org/biovisualize/4716777
var seg = d3.select("path").node().pathSegList;
var segPathData = d3.range(seg.numberOfItems).map(function(d, i){
  var item = seg.getItem(i); 
  return {type: item.pathSegTypeAsLetter, x: item.x, y: item.y};
});

// Get points of polygon
var ptCur, ptPre,
    points = segPathData.map(function(d) {
      
      switch(d.type) {
        case "M": ptCur = [Math.round(d.x),           Math.round(d.y)];           break;
        case "V": ptCur = [Math.round(ptPre.x),       Math.round(d.y)];           break;
        case "v": ptCur = [Math.round(ptPre.x),       Math.round(ptPre.y + d.y)]; break;
        case "H": ptCur = [Math.round(d.x),           Math.round(ptPre.y)];       break;
        case "h": ptCur = [Math.round(ptPre.x + d.x), Math.round(ptPre.y)];       break; 
        case "l": ptCur = [Math.round(ptPre.x + d.x), Math.round(ptPre.y + d.y)]; break; 
        default: console.log("How about add a new case for type '" + d.type + "'!?");
      }
      
      ptPre = {x:ptCur[0], y:ptCur[1]};
      return ptCur;
    
    }).slice(0, -1);


/* Tests */

var path = document.querySelector(".path-origin").getAttribute('d');
console.log(path);
console.log(segPathData, segPathData.length);
console.log(points);

var svg = d3.select("svg");

var polygons = [points];
svg.selectAll(".path-converted")
   .data(polygons)
   .enter().append("path")
   .attr("class", "path-test")
   .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
/*
svg.selectAll("circle")
   .data(points)
   .enter().append("circle")
   .attr("class", "circle-test")
   .attr("transform", function(d) { return "translate(" + d + ")"; })
   .attr("r", "3px");
*/
})();
