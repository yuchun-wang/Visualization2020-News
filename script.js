const margin = {
    top: 60,
    right: 100,
    bottom: 150,
    left: 100
  },
  width = 1000,
  height = 500

var color = ["#C9302C", "#3071A9", "#EC971F", "#31B0D5", "#449D44"]
var cities = []
var div = d3.select("#chart").append("div").attr("class", "tooltip").style("opacity", 0);

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.right})`);

Promise.all([
  d3.csv("news_data.csv"),
]).then(([newsData]) => {

  const cities = newsData.map((item) => item.Cities);
  const area = newsData.map((item) => item.Area);

  d3.map(newsData, function (d) {
    delete d.Area
    return delete d.Cities;
  });

  let max = 0;

  newsData.forEach((data) => {
    if (max < Math.max.apply(null, Object.values(data))) {
      max = Math.max.apply(null, Object.values(data));
    }
  });

  const years = newsData.columns.slice(2);
  

  // y-Axis

  const y = d3.scaleLinear().domain([4, 17]).range([height, 0]);
  const yAxis = d3.axisLeft(y)
    .ticks(20);
  svg
    .append("g")
    .attr("class", "yaxis")
    .style("font-family", "Courier")
    .style("font-weight", "bold")
    .call(yAxis);
  // grid lines
    svg.append("g")
        .attr("class", "grid")
        .style("stroke-dasharray", ("3,3"))
        .call(d3.axisLeft(y).ticks(20)
            .tickSize(-width)
            .tickFormat("")
        )
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
    .style("font-family", "Courier")
    .style("font-weight", "bold")
    .attr("transform", `translate(0, ${height})`)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 35)
    .attr("transform", "rotate(60)");
  //line chart
  let lineValue = d3.line()
    .x(function(d) {
      return x(d.key) + x.bandwidth() / 2;
    })
    .y(function(d) {
      return y(d.value);
    });

  function cline(d, color, city, classs, area_class) {
    svg
      .append("path")
      .datum(d)
      .attr("class", classs + " " + area_class)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", "1.5")
      .attr("d", lineValue(d))
      .style("opacity", 0.3)
      .on("mouseover", function () {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 0.3);
      });
    const toolLine = svg.append("line");
    svg
      .selectAll("dot")
      .data(d)
      .enter()
      .append("circle")
      .attr("class", classs + " " + area_class)
      .attr("fill", color)
      .attr("r", 5)
      .attr("cx", (d) => x(d.key) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.value))
      .style("opacity", 0.3)
      .on("mouseover", function (d) {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);

        div.transition().duration(200).style("opacity", 0.9);

        div
          .html("[ " + city + " ]" + "<br/>" + d.key + "：" + d.value)
          .style("left", d3.event.pageX + 10 + "px")
          .style("top", d3.event.pageY - 10 + "px");

        toolLine
          .attr("stroke", "gray")
          .attr("x1", 0)
          .attr("x2", width)
          .attr("stroke-width", "1.5")
          .style("opacity", 0.6)
          .attr("y1", y(d.value))
          .attr("y2", y(d.value));
      })
      .on("mouseout", function () {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 0.3);

        div.transition().duration(200).style("opacity", 0);
        toolLine.style('opacity', 0)
      });

    svg
      .append("text")
      .datum(d[43])
      .attr("class", classs + " " + area_class)
      .attr("x", width + 50)
      .attr("y", (d) => y(d.value))
      .attr("font-size", "12px")
      .style("text-anchor", "middle")
      .style("font-family", "Courier New")
      .text(city)
      .style("opacity", 0.3)
      .on("mouseover", function () {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 0.3);
      });
  }

  for (i = 0; i <= 19; i++) {
    if (i <= 0) {
      cline(d3.map(newsData[i]).entries(), color[0], cities[i], "c" + i, area[i]);
    }else if (i <= 7) {
      cline(d3.map(newsData[i]).entries(), color[1], cities[i], "c" + i, area[i]);
      svg.selectAll(".c"+i)
        .style("display", "none")
    }else if (i <= 12) {
      cline(d3.map(newsData[i]).entries(), color[2], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none");
    }else if (i <= 17) {
      cline(d3.map(newsData[i]).entries(), color[3], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none");
    }else {
      cline(d3.map(newsData[i]).entries(), color[4], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none");
    }
  }

  d3.selectAll("label")
    .on("click", function(d){
      active_status = !this.className.includes("active");
      let checked_area = this.id;
      if(active_status) {
        showLine(checked_area)
      } else {
        hideLine(checked_area)
      }
    })

  function showLine(checked_area) {
    svg.selectAll("."+checked_area).style("display", "flex")
  }

  function hideLine(checked_area) {
    svg.selectAll("." + checked_area).style("display", "none");
  }  
  //
  // console.log(d3.map(rentData[0]).entries());
  // axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2) - 50)
    .attr("y", -margin.left + 30)
    .attr("dy", "1em")
    .style("font-family", "Courier")
    .text("倍數");

  svg
    .append("text")
    .attr("transform", "translate(" + width / 2 + " ," + (height + 90) + ")")
    .style("text-anchor", "middle")
    .style("font-family", "Courier")
    .text("年/季");

  svg
    .append("text")
    .attr("x", width / 3)
    .attr("y", -20)
    .attr("class", "seCountry")
    .attr("font-size", "20px")
    .attr("font-family", "Courier")
    // .style("font-weight", "bold")
    .text("民國98至108年台灣每季房價所得比變化圖");

  // const tooltipLine = svg.append("line");
  // const tipBox = svg
  //   .append("rect")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("opacity", 0)
  //   .on("mousemove", drawTooltip)
  //   .on("mouseout", removeTooltip);

  // function drawTooltip() {
  //   let mouse = d3.mouse(this);
  //   let y_position = y.invert(mouse[1]);
  //   // console.log(y_position);
  //   tooltipLine
  //     .attr("stroke", "gray")
  //     .attr("x1", 0)
  //     .attr("x2", width)
  //     .attr("stroke-width", "1.5")
  //     .style("opacity", 0.3)
  //     .attr("y1", y(y_position))
  //     .attr("y2", y(y_position));
  // }

  // function removeTooltip() {
  //   if (tooltipLine) tooltipLine.style("opacity", 0);
  // }
})

