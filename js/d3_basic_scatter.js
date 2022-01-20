// set the dimensions and margins of the graph
const scatter_margin = {top: 30, right: 30, bottom: 70, left: 60},
      scatter_width = 460 - scatter_margin.left - scatter_margin.right,
      scatter_height = 400 - scatter_margin.top - scatter_margin.bottom;

// append the svg object to the body of the page
const scatter_svg = d3.select("#scatter_d3_1")
  .append("svg")
    .attr("class","viz_svg_class")
    .attr("width", scatter_width + scatter_margin.left + scatter_margin.right)
    .attr("height", scatter_height + scatter_margin.top + scatter_margin.bottom)
  .append("g")
    .attr("transform", `translate(${scatter_margin.left},${scatter_margin.top})`);

// Initialising the visualisation

d3.csv("https://raw.githubusercontent.com/ben-austin27/ben-austin27.github.io/main/data/pounds_units.csv").then( function(scatter_data) {

const scatter_x = d3.scaleLinear()
                    .domain([0,10])
                    .range([0,scatter_width]);

const scatter_y = d3.scaleLinear()
                    .domain([0,10])
                    .range([scatter_height,0]);

scatter_svg.append("g")
      .attr("transform", "translate(0," + scatter_height + ")")
      .call(d3.axisBottom(scatter_x));

scatter_svg.append("g")
      .call(d3.axisLeft(scatter_y));

points = scatter_svg.append('g')
          .selectAll("point")
          .data(scatter_data)
          .join("circle")
            .attr("cx", d => scatter_x(d.pounds))
            .attr("cy", scatter_height)
            .attr("r", 5)
            .attr("fill", "#4bbfc9")

// the nect section is the logic to trigger an animation when we scroll to the visualisation
function update() {
      points.transition()
          .ease(d3.easePolyInOut.exponent(3)) //https://observablehq.com/@d3/easing-animations
          .duration(2000)
          .attr("cy", d => scatter_y(d.units))}

var controller = new ScrollMagic.Controller();
new ScrollMagic.Scene({
  // the element to scroll inside
  triggerElement: '#scatter_d3_1'
})
.on('enter', function(e) {
    update(e);
}).addTo(controller)

});



