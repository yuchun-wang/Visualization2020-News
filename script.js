const margin = {
    top: 60,
    right: 50,
    bottom: 50,
    left: 100
  },
  width = 750,
  height = 400

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.right})`);

Promise.all([
  d3.csv("rent_data.csv"),
]).then(([rentData]) => {
  d3.map(rentData, function(d) {
    return delete d.column;
  });
  // let max = 0;
  let max = 1036304;
  let max_rent = Math.max.apply(null, Object.values(rentData[12]));

  // rentData.forEach((data) => {
  //   if (max < Math.max.apply(null, Object.values(data))) {
  //     max = Math.max.apply(null, Object.values(data));
  //   }
  // });

  const years = rentData.columns.slice(1);

  // x-Axis
  const x = d3
    .scaleBand()
    .domain(years)
    .range([0, width]);
  const xAxis = d3.axisBottom(x);

  svg
    .append("g")
    .attr("class", "xaxis")
    .call(xAxis)
    .style("font-family", "Courier New")
    .attr("transform", `translate(0, ${height})`);

  // y-Axis
  const y = d3.scaleLinear().domain([0, max]).range([height, 0]);
  const yAxis = d3.axisLeft(y)
    .ticks(20); // number of ticks
  svg
    .append("g")
    .attr("class", "yaxis")
    .style("font-family", "Courier New")
    .call(yAxis);

  const y2 = d3
    .scaleLinear()
    .domain([90, max_rent])
    .range([height, 0]);
  const y2Axis = d3.axisRight(y2).ticks(5); // number of ticks
  svg
    .append("g")
    .attr("class", "yaxis")
    .style("font-family", "Courier New")
    .call(y2Axis)
    .attr("transform", `translate(${width}, 0)`);

  // const bar_income
  svg
    .append('g')
    .selectAll('rect')
    .data(d3.map(rentData[0]).entries())
    .enter()

    .append('rect')
    .attr('x', (d, i) => x(d.key) + x.bandwidth() / 2 - 15)
    .attr('y', (d, i) => y(d.value))
    .attr('height', (d, i) => height - y(d.value))
    .attr('width', 30)
    .style('fill', 'red');

  // const bar_expense
  svg
    .append('g')
    .selectAll('rect')
    .data(d3.map(rentData[6]).entries())
    .enter()

    .append('rect')
    .attr('x', (d, i) => x(d.key) + x.bandwidth() / 2 - 15)
    .attr('y', (d, i) => y(d.value))
    .attr('height', (d, i) => height - y(d.value))
    .attr('width', 30)
    .style('fill', 'blue');

  //line chart
  let lineValue = d3.line()
    .x(function(d) {
      return x(d.key) + x.bandwidth() / 2;
    })
    .y(function(d) {
      return y2(d.value);
    });

  let cline = svg.append("path")
    .datum(d3.map(rentData[12]).entries())
    .attr("class", 'casepath')
    .attr("fill", "none")
    .attr("stroke", "#FFC300")
    .attr("stroke-width", '1.5')
    .attr("d", lineValue(d3.map(rentData[12]).entries()))

  svg.selectAll("dot")
    .data(d3.map(rentData[12]).entries())
    .enter()
    .append("circle")
    .attr("class", 'casedot')
    .attr('fill', '#FFC300')
    .attr("r", 5)
    .attr("cx", d => x(d.key) + x.bandwidth() / 2)
    .attr("cy", d => y2(d.value));

  console.log(d3.map(rentData[0]).entries());

  // axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2) - 50)
    .attr("y", -margin.left + 10)
    .attr("dy", "1em")
    .style("font-family", "Courier New")
    .text("金額(單位：新台幣)");
  svg
    .append("text")
    .attr("transform", "translate(" + width / 2 + " ," + (height + 50) + ")")
    .style("text-anchor", "middle")
    .style("font-family", "Courier New")
    .text("年份");

  svg
    .append("text")
    .attr("transform", "rotate(90)")
    .attr("x", (height / 2) - 10)
    .attr("y", -width - 50)
    .attr("dy", "1em")
    .style("font-family", "Courier New")
    .text("指數");

  svg
    .append("text")
    .attr("x", width / 10)
    .attr("y", -20)
    .attr("class", "seCountry")
    .attr("font-size", "20px")
    .attr("font-family", "Courier New")
    .style("font-weight", "bold")
    .text("民國98至107年台灣年均每戶可支配所得、支出與租屋指數相關圖");
})
