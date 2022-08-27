d3.json('../data/recipes.json', function (error,data) {

    function tabulate(data, columns) {
          var table = d3.select('.portfolio-item-individual').append('table').attr('class','recipe_table')
          var thead = table.append('thead')
          var tbody = table.append('tbody');
  
          // append the header row
          thead.append('tr')
            .selectAll('th')
            .data(columns).enter()
            .append('th')
              .text(function (column) { return column; });
  
          var recipe_id = Math.floor(Math.random()*data.length);
          var temp_frame = data[recipe_id]
          // create a row for each object in the data
          var rows = tbody.selectAll('tr')
            .data(temp_frame)
            .enter()
            .append('tr');
  
          // create a cell in each row for each column
          var cells = rows.selectAll('td')
            .data(function (row) {
              return columns.map(function (column) {
                return {column: column, value: row[column]};
              });
            })
            .enter()
            .append('td')
              .text(function (d) { return d.value; });
  
        return table;
      }
  
      // render the table(s)
      tabulate(data, ['Ingredients', 'Amount']); // 2 column table
  
  });