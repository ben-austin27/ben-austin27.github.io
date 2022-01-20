const grades_margin = {top: 30, right: 30, bottom: 70, left: 60},
      grades_width = 460 - grades_margin.left - grades_margin.right,
      grades_height = 460 - grades_margin.top - grades_margin.bottom;
      innerRadius = 50,
      outerRadius = Math.min(grades_width, grades_height) / 2;

const grades_svg = d3.select("#grades_circular")
  .append("svg")
    .attr("width", grades_width + grades_margin.left + grades_margin.right)
    .attr("height", grades_height + grades_margin.top + grades_margin.bottom)
  .append("g")
    .attr("transform", `translate(${grades_width/2+grades_margin.left}, ${grades_height/2+grades_margin.top})`);



d3.csv("https://raw.githubusercontent.com/ben-austin27/ben-austin27.github.io/main/data/results.csv").then( function(grades_data) {
  
const grades_x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(grades_data.map(d => d.module)); // The domain of the X axis is the list of states.

const grades_y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([40, 100]); // Domain of Y is from 0 to the max seen in the data

  // Add the bars
bars = grades_svg.append("g")
    .selectAll("path")
    .data(grades_data)
    .join("path")
      .attr("fill", d => "#" + d.color )
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(innerRadius+0.05)//d => grades_y(d['grade'])
          .startAngle(d => grades_x(d.module))
          .endAngle(d => grades_x(d.module) + grades_x.bandwidth())
          .padAngle(0.05)
          .padRadius(innerRadius))
  
modules = grades_svg.append("g")
      .selectAll("g")
      .data(grades_data)
      .join("g")
        .attr("text-anchor", function(d) { return (grades_x(d.module) + grades_x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((grades_x(d.module) + grades_x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (innerRadius+10) + ",0)"; })//
      .append("text")
        .text(function(d){return(d.module)})
        .attr("transform", function(d) { return (grades_x(d.module) + grades_x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

grades = grades_svg.append("g")
      .selectAll("g")
      .data(grades_data)
      .join("g")
        .attr("text-anchor", function(d) { return (grades_x(d.module) + grades_x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((grades_x(d.module) + grades_x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (grades_y(d['grade'])+7) + ",0)"; })//
      .append("text")
        .text(function(d){return(d.grade)})
        .attr("transform", function(d) { return (grades_x(d.module) + grades_x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

function update_bars() {
  d3.selectAll("path")
      .transition()
      .ease(d3.easePolyInOut.exponent(3)) //https://observablehq.com/@d3/easing-animations
      .duration(2000)  
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(d => grades_y(d['grade']))
          .startAngle(d => grades_x(d.module))
          .endAngle(d => grades_x(d.module) + grades_x.bandwidth())
          .padAngle(0.05)
          .padRadius(innerRadius))
// alter opactity of the labeling as well, after 2 seconds
}

var controller = new ScrollMagic.Controller();
new ScrollMagic.Scene({
  // the element to scroll inside
  triggerElement: '#grades_circular'
})
.on('enter', function(e) {
    update_bars(e);
}).addTo(controller)
});