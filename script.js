const margin = {
    top: 60,
    right: 100,
    bottom: 300,
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

  d3.map(newsData, function(d) {
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
    .attr("transform", "rotate(60)")

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
      .on("mouseover", function() {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);
      })
      .on("mouseout", function() {
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
      .attr("event", showevent)
      .on("mouseover", function(d) {
        console.log(x(d.key), 'd');
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
      .on("mouseout", function() {
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
      .on("mouseover", function() {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);
      })
      .on("mouseout", function() {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 0.3);
      });
  }

  for (i = 0; i <= 19; i++) {
    if (i <= 0) {
      cline(d3.map(newsData[i]).entries(), color[0], cities[i], "c" + i, area[i]);
    } else if (i <= 7) {
      cline(d3.map(newsData[i]).entries(), color[1], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i)
        .style("display", "none")
    } else if (i <= 12) {
      cline(d3.map(newsData[i]).entries(), color[2], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none");
    } else if (i <= 17) {
      cline(d3.map(newsData[i]).entries(), color[3], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none");
    } else {
      cline(d3.map(newsData[i]).entries(), color[4], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none");
    }
  }

  d3.selectAll("label")
    .on("click", function(d) {
      active_status = !this.className.includes("active");
      let checked_area = this.id;
      if (active_status) {
        showLine(checked_area)
      } else {
        hideLine(checked_area)
      }
    })
  

  function showLine(checked_area) {
    svg.selectAll("." + checked_area).style("display", "flex")
  }

  function hideLine(checked_area) {
    svg.selectAll("." + checked_area).style("display", "none");
  }
  
  var event1 = d3.select("#chart").append("div").attr("class", "event");
  var event2 = d3.select("#chart").append("div").attr("class", "event");
  var event3 = d3.select("#chart").append("div").attr("class", "event");
  var event4 = d3.select("#chart").append("div").attr("class", "event");
  var event5 = d3.select("#chart").append("div").attr("class", "event");
  var event6 = d3.select("#chart").append("div").attr("class", "event");
  var event7 = d3.select("#chart").append("div").attr("class", "event");

  event1
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>內政部實施</span>" +
        "<br>" +
        "<span style='display:inline-block;padding-top:8px'>不動產交易實價登錄制度</span>"
    )
    .style("left", 318.1818181818182 - 70 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", height + 180 + "px")
    .style("background", "#FFC300")
    .style("opacity", 0.7);
  svg
    .append("line")
    .attr("stroke", "#FFC300")
    .attr("x1", 329.54545454545456)
    .attr("x2", 329.54545454545456)
    .attr("stroke-width", "3")
    .style("opacity", 0.7)
    .attr("y1", height)
    .attr("y2", height + 90);
  event2
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>《房屋稅法》修正</span>" +
        "<br>" +
        "<span style='display:inline-block;padding-top:8px'>調高非自用住宅稅率</span>"
    )
    .style("left", 477.27272727272725 - 55 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", height + 240 + "px")
    .style("background", "#FFC300")
    .style("opacity", 0.7);
  svg
    .append("line")
    .attr("stroke", "#FFC300")
    .attr("x1", 488.6363636363636)
    .attr("x2", 488.6363636363636)
    .attr("stroke-width", "3")
    .style("opacity", 0.7)
    .attr("y1", height)
    .attr("y2", height + 140);
  event3
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>巢運</span>" +
        "<br>"
      + "<span style='display:inline-block;padding-top:8px'>提出五大訴求</span>"
    )
    .style("left", 534.0909090909091 -40 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", height + 180 + "px")
    .style("background", "#FFC300")
    .style("opacity", 0.7);
  svg
    .append("line")
    .attr("stroke", "#FFC300")
    .attr("x1", 534.0909090909091)
    .attr("x2", 534.0909090909091)
    .attr("stroke-width", "3")
    .style("opacity", 0.7)
    .attr("y1", height)
    .attr("y2", height + 80);
  event4
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>張淑晶事件</span>" +
        "<br>" 
        // +
        // "<span style='display:inline-block;padding-top:8px'>提出五大訴求</span>"
    )
    .style("left", 556.8181818181819 - 40 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", height + 300 + "px")
    .style("background", "#FFC300")
    .style("opacity", 0.7);
  svg
    .append("line")
    .attr("stroke", "#FFC300")
    .attr("x1", 556.8181818181819)
    .attr("x2", 556.8181818181819)
    .attr("stroke-width", "3")
    .style("opacity", 0.7)
    .attr("y1", height)
    .attr("y2", height + 200);
  event5
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>房地合一實價課稅開始實施</span>" +
        "<br>"
      // +
      // "<span style='display:inline-block;padding-top:8px'>提出五大訴求</span>"
    )
    .style("left", 647.7272727272727 - 90 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", height + 330 + "px")
    .style("background", "#FFC300")
    .style("opacity", 0.7);
  svg
    .append("line")
    .attr("stroke", "#FFC300")
    .attr("x1", 647.7272727272727)
    .attr("x2", 647.7272727272727)
    .attr("stroke-width", "3")
    .style("opacity", 0.7)
    .attr("y1", height)
    .attr("y2", height + 230);
  event6
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>蔡英文上台|房市三箭</span>" +
        "<br>" +
        "<span style='display:inline-block;padding-top:8px'>杜絕房市炒作</span>" +
        "<br>" +
        "<span style='display:inline-block;padding-top:8px'>健全租屋體系</span>" +
        "<br>" +
        "<span style='display:inline-block;padding-top:8px'>&nbsp;&nbsp;&nbsp;建二十萬戶社會住宅&nbsp;&nbsp;&nbsp;</span>"
    )
    .style("left", 670.4545454545455 - 80 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", height + 180 + "px")
    .style("background", "#FFC300")
    .style("opacity", 0.7);
  svg
    .append("line")
    .attr("stroke", "#FFC300")
    .attr("x1", 670.4545454545455)
    .attr("x2", 670.4545454545455)
    .attr("stroke-width", "3")
    .style("opacity", 0.7)
    .attr("y1", height)
    .attr("y2", height + 80);
  event7
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>《租賃住宅市場發展及管理條例》</span>" +
        "<br>" +
        "<span style='display:inline-block;padding-top:8px'>開始實施</span>"
    )
    .style("left", 852.2727272727273 - 110 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", height + 330 + "px")
    .style("background", "#FFC300")
    .style("opacity", 0.7);
  svg
    .append("line")
    .attr("stroke", "#FFC300")
    .attr("x1", 852.2727272727273)
    .attr("x2", 852.2727272727273)
    .attr("stroke-width", "3")
    .style("opacity", 0.7)
    .attr("y1", height)
    .attr("y2", height + 230);
  
  function showevent(d) {
    // event1
    //   .html("<span style='background:red;' width='50px'>內政部實施｜不動產交易實價登錄制度<span>")
    //   .style("left", 318.1818181818182 + margin.left + "px")
    //   .style("top", height + 180 + "px");
    // event2
    //   .html("房屋稅法修正調高非自用住宅稅率")
    //   .style("left", 477.27272727272725 + margin.left + "px")
    //   .style("top", height + 180 + "px");
    // event3
    //   .html("巢運提出五大訴求")
    //   .style("left", 522.7272727272727 + margin.left + "px")
    //   .style("top", height + 180 + "px");
    // event4
    //   .html("張淑晶事件")
    //   .style("left", 545.4545454545455 + margin.left + "px")
    //   .style("top", height + 180 + "px");
    // event5
    //   .html("房地合一實價課稅開始實施")
    //   .style("left", 636.3636363636364 + margin.left + "px")
    //   .style("top", height + 180 + "px");
    // event6
    //   .html("蔡英文上台房市三箭｜杜絕房市炒作、健全租屋體系、建二十萬戶社會住宅")
    //   .style("left", 659.0909090909091 + margin.left + "px")
    //   .style("top", height + 180 + "px");
    // event7
    //   .html("開始實施｜租賃住宅市場發展及管理條例")
    //   .style("left", 840.9090909090909 + margin.left + "px")
    //   .style("top", height + 180 + "px");


  }

  // svg
  //   .append("text")
  //   .attr("class","event")
  //   .attr("x", 318.1818181818182)
  //   .attr("y", height + 80)
  //   .attr("dy", "1em")
  //   .style("background", "yellow")
  //   .style("font-family", "Courier")
  //   .text("101年Q3:內政部實施「不動產交易實價登錄」制度");
  // svg
  //   .append("text")
  //   .attr("class", "event")
  //   .attr("x", 477.27272727272725)
  //   .attr("y", height + 100)
  //   .attr("dy", "1em")
  //   .style("font-family", "Courier")
  //   .text("103年Q2:《房屋稅法》修正調高非自用住宅稅率");
  // svg
  //   .append("text")
  //   .attr("class", "event")
  //   .attr("x", 522.7272727272727)
  //   .attr("y", height + 120)
  //   .attr("dy", "1em")
  //   .style("font-family", "Courier")
  //   .text("103年Q4:巢運提出五大訴求");
  // svg
  //   .append("text")
  //   .attr("class", "event")
  //   .attr("x", 545.4545454545455)
  //   .attr("y", height + 140)
  //   .attr("dy", "1em")
  //   .style("font-family", "Courier")
  //   .text("104年Q1:張淑晶事件");
  // svg
  //   .append("text")
  //   .attr("class", "event")
  //   .attr("x", 636.3636363636364)
  //   .attr("y", height + 160)
  //   .attr("dy", "1em")
  //   .style("font-family", "Courier")
  //   .text("105年Q1:房地合一實價課稅開始實施");
  // svg
  //   .append("text")
  //   .attr("class", "event")
  //   .attr("x", 659.0909090909091)
  //   .attr("y", height + 180)
  //   .attr("dy", "1em")
  //   .style("font-family", "Courier")
  //   .text("105年Q2:蔡英文上台");
  //   svg
  //     .append("text")
  //     .attr("class", "event")
  //     .attr("x", 659.0909090909091)
  //     .attr("y", height + 200)
  //     .attr("dy", "1em")
  //     .style("font-family", "Courier")
  //     .text("房市三箭：杜絕房市炒作、健全租屋體系、建二十萬戶社會住宅");
  // svg
  //   .append("text")
  //   .attr("class", "event")
  //   .attr("x", 840.9090909090909)
  //   .attr("y", height + 220)
  //   .attr("dy", "1em")
  //   .style("font-family", "Courier")
  //   .text("107年Q2:《租賃住宅市場發展及管理條例》開始實施");

  // axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2) - 30)
    .attr("y", -margin.left + 30)
    .attr("dy", "1em")
    .style("font-family", "Courier")
    .text("倍數");

  svg
    .append("text")
    .attr("transform", "translate(" + (width + 60) + " ," + (height + 30) + ")")
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
