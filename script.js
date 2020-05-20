const margin = {top:60, right:40, bottom:50, left:100},
width = 750,
height = 400

const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.right})`);

Promise.all([
    d3.csv("rent_data.csv"),
]).then(([rentData]) => {
                          d3.map(rentData, function (d) {
                            return delete d.column;
                          });
                          let max = 0;
                          let max_rent = Math.max.apply(
                            null,
                            Object.values(rentData[12])
                          );

                          rentData.forEach((data) => {
                            if (
                              max < Math.max.apply(null, Object.values(data))
                            ) {
                              max = Math.max.apply(null, Object.values(data));
                            }
                          });
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

                          const y = d3
                            .scaleLinear()
                            .domain([0, max])
                            .range([height, 0]);
                          const yAxis = d3.axisLeft(y).ticks(20); // number of ticks
                          svg
                            .append("g")
                            .attr("class", "yaxis")
                            .style("font-family", "Courier New")
                            .call(yAxis);

                          const y2 = d3
                            .scaleLinear()
                            .domain([0, max_rent])
                            .range([height, 0]);
                          const y2Axis = d3.axisRight(y2).ticks(5); // number of ticks
                          svg
                            .append("g")
                            .attr("class", "yaxis")
                            .style("font-family", "Courier New")
                            .call(y2Axis)
                            .attr("transform", `translate(${width}, 0)`);


                            // rent line
                            // console.log(d3.map(rentData[12]).entries())
                            let lineValue = d3
                              .line()
                              .x(function (d) {
                                console.log(d.key)
                                return x(d.key) + x.bandwidth() / 2;
                              })
                              .y(function (d) {
                                return y2(d.value);
                              });
                            let cline = svg
                              .append("path")
                              .datum(d3.map(rentData[12]).entries())
                              .attr("class", "casepath")
                              .attr("fill", "none")
                              .attr("stroke", "#FFC300")
                              .attr("stroke-width", "1.5")
                              .attr("stroke", "red")
                              .attr(
                                "d",
                                lineValue(d3.map(rentData[12]).entries())
                              );
                        });



                        
                         
