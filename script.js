const margin = {
    top: 50,
    right: 100,
    bottom: 100,
    left: 30
  },
  width = 800,
  height = 500

var color = ["#FA5457", "#FA8925", "#01B4BC", "#5FA55A", "#F6D51F"]
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
  const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
  const yAxis = d3.axisLeft(y)
    .ticks(20);
  svg
    .append("g")
    .attr("class", "yaxis")
    .attr("color", "#5F7470")
    .style("font-family", "Noto Sans TC")
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
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .attr("color", "#5F7470")
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 35)
    .attr("transform", "rotate(60)")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("opacity", 0)
    .attr("fill", "#5F7470")

  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(63.63636363636358, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(136.36363636363632, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(209.09090909090907, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(281.81818181818176, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(354.5454545454545, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(427.27272727272725, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(499.99999999999994, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)

  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(572.7272727272729, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(645.4545454545454, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(718.1818181818181, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)
  svg
    .append("line")
    .attr("stroke", "#5F7470")
    .attr("transform", `translate(790.9090909090909, ${height})`)
    .attr("stroke-width", "2")
    .attr("y1", 0)
    .attr("y2", 15)

  svg
    .append("text")
    .attr("x", 12.5)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("9 8  年");

  svg
    .append("text")
    .attr("x", 82.5)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("9 9  年");

  svg
    .append("text")
    .attr("x", 150)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 0  年");
  svg
    .append("text")
    .attr("x", 222.5)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 1  年");
  svg
    .append("text")
    .attr("x", 296)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 2  年");
  svg
    .append("text")
    .attr("x", 368)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 3  年");
  svg
    .append("text")
    .attr("x", 441)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 4  年");
  svg
    .append("text")
    .attr("x", 514)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 5  年");
  svg
    .append("text")
    .attr("x", 587)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 6  年");
  svg
    .append("text")
    .attr("x", 660)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 7  年");
  svg
    .append("text")
    .attr("x", 732)
    .attr("y", height + 20)
    .attr("class", "year")
    .attr("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("1 0 8  年");

  // policy
  var event1 = d3.select("#chart").append("div").attr("class", "event e1");
  var event2 = d3.select("#chart").append("div").attr("class", "event e2");
  var event3 = d3.select("#chart").append("div").attr("class", "event e3");
  var event4 = d3.select("#chart").append("div").attr("class", "event e4");
  var event5 = d3.select("#chart").append("div").attr("class", "event e5");
  var event6 = d3.select("#chart").append("div").attr("class", "event e6");
  var event7 = d3.select("#chart").append("div").attr("class", "event e7");

  event1
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>內政部實施</span>" +
      "<br>" +
      "<span style='display:inline-block;padding-top:8px'>不動產交易實價登錄制度</span>"
    )
    .style("left", 263.63636363636357 - 70 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", margin.top + 50 + "px")
    .style("background", "#B8BDB5")
    .style("opacity", 0);
  svg
    .append("line")
    .attr("class", "el1")
    .attr("stroke", "#434A42")
    .attr("x1", 263.63636363636357)
    .attr("x2", 263.63636363636357)
    .attr("stroke-width", "5")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", height)
    .on("mouseover", function() {
      mouseover("e1", "el1")
    })
    .on("mouseout", function() {
      mouseout("e1", "el1")
    });

  event2
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>《房屋稅法》修正</span>" +
      "<br>" +
      "<span style='display:inline-block;padding-top:8px'>調高非自用住宅稅率</span>"
    )
    .style("left", 390.909090909090 - 55 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", margin.top + 50 + "px")
    .style("background", "#B8BDB5")
    .style("opacity", 0);
  svg
    .append("line")
    .attr("class", "el2")
    .attr("stroke", "#434A42")
    .attr("x1", 390.909090909090)
    .attr("x2", 390.909090909090)
    .attr("stroke-width", "5")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", height)
    .on("mouseover", function() {
      mouseover("e2", "el2")
    })
    .on("mouseout", function() {
      mouseout("e2", "el2")
    });

  event3
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>巢運</span>" +
      "<br>" +
      "<span style='display:inline-block;padding-top:8px'>提出五大訴求</span>"
    )
    .style("left", 427.27272727272725 - 40 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", margin.top + 50 + "px")
    .style("background", "#B8BDB5")
    .style("opacity", 0);
  svg
    .append("line")
    .attr("class", "el3")
    .attr("stroke", "#434A42")
    .attr("x1", 427.27272727272725)
    .attr("x2", 427.27272727272725)
    .attr("stroke-width", "5")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", height)
    .on("mouseover", function() {
      mouseover("e3", "el3")
    })
    .on("mouseout", function() {
      mouseout("e3", "el3")
    });

  event4
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>張淑晶事件</span>" +
      "<br>"
    )
    .style("left", 445.4545454545454 - 30 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", margin.top + 50 + "px")
    .style("background", "#B8BDB5")
    .style("opacity", 0);
  svg
    .append("line")
    .attr("class", "el4")
    .attr("stroke", "#434A42")
    .attr("x1", 445.4545454545454)
    .attr("x2", 445.4545454545454)
    .attr("stroke-width", "5")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", height)
    .on("mouseover", function() {
      mouseover("e4", "el4")
    })
    .on("mouseout", function() {
      mouseout("e4", "el4")
    });

  event5
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>房地合一實價課稅開始實施</span>" +
      "<br>"
    )
    .style("left", 518.1818181818181 - 80 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", margin.top + 50 + "px")
    .style("background", "#B8BDB5")
    .style("opacity", 0);
  svg
    .append("line")
    .attr("class", "el5")
    .attr("stroke", "#434A42")
    .attr("x1", 518.1818181818181)
    .attr("x2", 518.1818181818181)
    .attr("stroke-width", "5")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", height)
    .on("mouseover", function() {
      mouseover("e5", "el5")
    })
    .on("mouseout", function() {
      mouseout("e5", "el5")
    });

  event6
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>蔡英文上台：房市三箭</span>" +
      "<br>" +
      "<span style='display:inline-block;padding-top:8px'>杜絕房市炒作</span>" +
      "<br>" +
      "<span style='display:inline-block;padding-top:8px'>健全租屋體系</span>" +
      "<br>" +
      "<span style='display:inline-block;padding-top:8px'>&nbsp;&nbsp;&nbsp;建二十萬戶社會住宅&nbsp;&nbsp;&nbsp;</span>"
    )
    .style("left", 536.3636363636364 - 60 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", margin.top + 50 + "px")
    .style("background", "#B8BDB5")
    .style("opacity", 0);
  svg
    .append("line")
    .attr("class", "el6")
    .attr("stroke", "#434A42")
    .attr("x1", 536.3636363636364)
    .attr("x2", 536.3636363636364)
    .attr("stroke-width", "5")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", height)
    .on("mouseover", function() {
      mouseover("e6", "el6")
    })
    .on("mouseout", function() {
      mouseout("e6", "el6")
    });

  event7
    .html(
      "<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>《租賃住宅市場發展及管理條例》</span>" +
      "<br>" +
      "<span style='display:inline-block;padding-top:8px'>開始實施</span>"
    )
    .style("left", 681.8181818181819 - 90 + margin.left + "px")
    .style("position", "absolute")
    .style("box-shadow", "0px 1px 3px gray")
    .style("top", margin.top + 50 + "px")
    .style("background", "#B8BDB5")
    .style("opacity", 0);
  svg
    .append("line")
    .attr("class", "el7")
    .attr("stroke", "#434A42")
    .attr("x1", 681.8181818181819)
    .attr("x2", 681.8181818181819)
    .attr("stroke-width", "5")
    .style("opacity", 0.5)
    .attr("y1", 0)
    .attr("y2", height)
    .on("mouseover", function() {
      mouseover("e7", "el7")
    })
    .on("mouseout", function() {
      mouseout("e7", "el7")
    });

  function mouseover(e, el) {
    d3.select("." + e)
      .transition()
      .style("opacity", 1);
    d3.select("." + el)
      .transition()
      .style("opacity", 1);
  }

  function mouseout(e, el) {
    d3.select("." + e)
      .transition()
      .style("opacity", 0);
    d3.select("." + el)
      .transition()
      .style("opacity", 0.5);
  }

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
      .style("opacity", 0.5)
      .on("mouseover", function() {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);
      })
      .on("mouseout", function() {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 0.5);
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
      .style("opacity", 0.5)
      .on("mouseover", function(d) {
        // console.log(d);
        if (d.key == "101年／Q3") {
          mouseover("e1", "el1")
        };
        if (d.key == "103年／Q2") {
          mouseover("e2", "el2")
        };
        if (d.key == "103年／Q4") {
          mouseover("e3", "el3")
        };
        if (d.key == "104年／Q1") {
          mouseover("e4", "el4")
        };
        if (d.key == "105年／Q1") {
          mouseover("e5", "el5")
        };
        if (d.key == "105年／Q2") {
          mouseover("e6", "el6")
        };
        if (d.key == "107年／Q2") {
          mouseover("e7", "el7")
        };

        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);

        div.transition().duration(200).style("opacity", 1);

        div
          .html("<span style='display:inline-block; border-bottom: 0.5px solid gray;padding-bottom: 0.5px;'>" + city +
            "</span><br/><span style='display:inline-block;padding-top:8px;'>" + d.key + "：" + d.value + "</span>")
          .style("box-shadow", "0px 1px 3px gray")
          .style("background", "#B8BDB5")
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
      .on("mouseout", function(d) {
        if (d.key == "101年／Q3") {
          mouseout("e1", "el1")
        };
        if (d.key == "103年／Q2") {
          mouseout("e2", "el2")
        };
        if (d.key == "103年／Q4") {
          mouseout("e3", "el3")
        };
        if (d.key == "104年／Q1") {
          mouseout("e4", "el4")
        };
        if (d.key == "105年／Q1") {
          mouseout("e5", "el5")
        };
        if (d.key == "105年／Q2") {
          mouseout("e6", "el6")
        };
        if (d.key == "107年／Q2") {
          mouseout("e7", "el7")
        };

        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 0.5);

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
      .attr("font-family", "Noto Sans TC")
      .attr("font-weight", "bold")
      .attr("fill", "#5F7470")
      .text(city)
      .style("opacity", 0.5)
      .on("mouseover", function() {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 1);
      })
      .on("mouseout", function() {
        d3.selectAll("." + classs)
          .transition()
          .style("opacity", 0.5);
      });
  }

  for (i = 0; i <= 20; i++) {
    if (i <= 0) {
      cline(d3.map(newsData[i]).entries(), color[0], cities[i], "c" + i, area[i]);
    } else if (i <= 7) {
      cline(d3.map(newsData[i]).entries(), color[1], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none")
    } else if (i <= 12) {
      cline(d3.map(newsData[i]).entries(), color[2], cities[i], "c" + i, area[i]);
      svg.selectAll(".c" + i).style("display", "none");
    } else if (i <= 18) {
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

  // axis label
  svg
    .append("text")
    .attr("x", -margin.left + 5)
    .attr("y", -margin.left)
    .attr("dy", "1em")
    .style("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("倍數");

  svg
    .append("text")
    .attr("transform", "translate(" + (width + 30) + " ," + (height + 10) + ")")
    .style("text-anchor", "middle")
    .style("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("年／季");

  svg
    .append("text")
    .attr("transform", "translate(" + (width - 40) + " ," + (height + 47) + ")")
    .style("text-anchor", "middle")
    .style("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("註：金門縣、連江縣無資料。");

  svg
    .append("text")
    .attr("x", width / 4)
    .attr("y", -40)
    .attr("class", "seCountry")
    .attr("font-size", "20px")
    .attr("font-family", "Noto Sans TCs")
    .attr("font-weight", "bold")
    .attr("fill", "#5F7470")
    .text("民國 98 至 108 年台灣每季房價所得比變化圖");

  svg
    .append("text")
    .attr("x", width - margin.right)
    .attr("y", -margin.top + 30)
    .style("text-anchor", "left")
    .style("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("font-size", "10px")
    .attr("fill", "#5F7470")
    .text("資料來源｜內政部不動產資訊平台");

  svg
    .append("text")
    .attr("x", width - margin.right)
    .attr("y", -margin.top + 45)
    .style("text-anchor", "left")
    .style("font-family", "Noto Sans TC")
    .attr("font-weight", "bold")
    .attr("font-size", "10px")
    .attr("fill", "#5F7470")
    .text("圖表製作｜温雅筑 王毓淳 丁乃達 蘇晉威");
})
