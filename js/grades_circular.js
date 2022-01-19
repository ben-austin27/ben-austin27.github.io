const grades_margin = {top: 30, right: 30, bottom: 70, left: 60},
      grades_width = 460 - grades_margin.left - grades_margin.right,
      grades_height = 400 - grades_margin.top - grades_margin.bottom;

const grades_svg = d3.select("#grades_circular")
  .append("svg")
    .attr("width", grades_width + grades_margin.left + grades_margin.right)
    .attr("height", grades_height + grades_margin.top + grades_margin.bottom)
  .append("g")
    .attr("transform", `translate(${grades_margin.left},${grades_margin.top})`);