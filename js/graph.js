var HEADERS =  ["Mission", "Private", "Mainstream"],
    COLORS = ["#ec008b","#fdbf11","#1696d2"];

d3.csv("data/data.csv", function(data) {
	  data.forEach(function(d) {
	    d.mainstream_percent = +d.mainstream_percent;
	    d.private_percent = +d.private_percent;
	    d.mission_percent = +d.mission_percent;
	    d.total_percent = +d.total_percent;
	    d.mainstream_dollar = +d.mainstream_dollar;
	    d.private_dollar = +d.private_dollar;
	    d.mission_dollar = +d.mission_dollar;
	    d.total_dollar = +d.total_dollar;
	    d.year = +d.year

	  });


  console.log(data[0]);
	var initStackedBarChart = {
		draw: function(config) {
			chart = this,
			domEle = config.element,
			stackKey = config.key,
			data = config.data,
			margin = {top: 20, right: 20, bottom: 30, left: 50},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom,
			xScale = d3.scaleLinear().rangeRound([0, width]),
			yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
			color = d3.scaleOrdinal(["#ec008b","#fdbf11","#1696d2"]),
			xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0%")),
			yAxis =  d3.axisLeft(yScale),
			svg = d3.select("#"+domEle).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var statsSvg = d3.select("#stats-div")
				.append("svg")
				.attr("width", width)
				.attr("height", height/10 + margin.top + margin.bottom)
				 for (i=0; i<=3; i++){
			      	if(i !== 3){
				        statsSvg.append("text")
				          .attr("class", "stats-header")
				          .attr("x", function() {
				            // if (IS_MOBILE && !IS_PHONE) {
				            //     return (.068*width)*i;
				            //   }
				            // if (IS_PHONE) {  
				            //     return (.082*width)*i; 
				            // }
				                  return (.3*width)*i;
				          })
				          .attr("y", height*.05)
				          .text(function(){
				              return (HEADERS[i])
				          })
				          .style("fill", function(){
				              return (COLORS[i])
				          })
				          .attr("transform", function(d) { 
				            // if (IS_PHONE) {
				            //   return "translate(" + width/14 + ", "+ height/2 +")";
				            // }
				            	return "translate("+ width*.2 +", 0)"; 
				          })

				  		statsSvg.append("text")
				          .attr("class", function() {
				            return "stats-text " + "text" + i})
				          .attr("x", function() {
				            // if (IS_MOBILE && !IS_PHONE) {
				            //     return (.068*width)*i;
				            //   }
				            // if (IS_PHONE) {  
				            //     return (.082*width)*i; 
				            // }
				                  return (.3*width)*i;
				          })
				          .attr("y", height*.1)
				          .attr("transform", function(d) { 
				            // if (IS_PHONE) {
				            //   return "translate(" + width/14 + ", "+ height/2 +")";
				            // }
				            	return "translate("+ width*.2 +", 0)"; 
				          })

				     
			      	}
			  	}



			var stack = d3.stack()
				.keys(stackKey)
				/*.order(d3.stackOrder)*/
				.offset(d3.stackOffsetNone);
			var layers= stack(data);
				data.sort(function(a, b) { return b.year - a.year; });
				yScale.domain(data.map(function(d) {return d.year; }));
				xScale.domain([0,d3.max(data, function(d) {return d["total_" + category]})]);


			var layer = svg.selectAll(".layer")
				.data(layers)
				.enter().append("g")
				.attr("class", "layer")
				.style("fill", function(d, i) { return color(i); });

			layer.selectAll("rect")
			  	.data(function(d) {console.log(d); return d; })
			  	.enter().append("rect")
			  	.attr("y", function(d) {return yScale(d.data.year); })
			  	.attr("x", function(d) { return xScale(d[0]); })
			  	.attr("class", function(d) {return "year" + d.data.year})
			  	.transition()
            	.duration(700)
            	.ease(d3.easeLinear)
			  	.attr("height", yScale.bandwidth())
			  	.attr("width", function(d) {console.log(xScale(d[1]) - xScale(d[0]));return xScale(d[1]) - xScale(d[0]) })
			

			 d3.selectAll('rect')
			  	.on("mouseover", function() {
			  var classYear = d3.select(this).attr("class")
	       			console.log(classYear)
			  		showStats(classYear);
			  	})

			svg.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + (height+5) + ")")
				.call(xAxis);

			svg.append("g")
				.attr("class", "axis axis--y")
				.attr("transform", "translate(0,0)")
				.call(yAxis);	

	      	d3.selectAll(".toggle_button")
	         	.on("click", function(){
		          	var start = d3.select(".toggle_button.active").node().id.split("_")[0]
		          	var end = this.id.split("_")[0]
		          	d3.selectAll(".toggle_button.active").classed("active",false)
		          	d3.select(this).classed("active",true)
		            transitionState(start, end)

	        	})

	       var showStats = function(classYear) {

	       	console.log(d3.selectAll("." + classYear).each(function(d, i) {
	
	       		d3.select(this).datum()._groups
	    
	       }))
	
	 
	       }

		}
	}


	var selectedCategory = "percent";
	var categoryFunction = function category() {
		return selectedCategory
	}
	var category = categoryFunction();
	console.log(category)
	var key = ["mission_" + category , "private_" + category, "mainstream_" + category];
	// var key = ["mission_percent","private_percent","mainstream_percent"];
	// var key2 = ["mission_dollar","private_dollar","mainstream_dollar"];
	initStackedBarChart.draw({
		data: data,
		key: key,
		element: 'stacked-bar'
	});

	// function getCategory() {
	// 	console.log(d3.select(".toggle_button.active").node().id.split("_")[0])
	// 	return d3.select(".toggle_button.active").node().id.split("_")[0]

	// }

  	function transitionState (start, end) {

        	if (start == end ) console.log("hi")
        		else if ((start == "percent") && (end == "dollar")) percentToDollar(start, end)
        		else if ((start == "dollar") && (end == "percent")) dollarToPercent(start, end)

    }

    function percentToDollar(start, end) {
    		selectedCategory = "dollar";
			category = categoryFunction();
			var key = ["mission_" + category , "private_" + category, "mainstream_" + category];
    		initStackedBarChartUpdate.draw({
			data: data,
			key: key,
			element: 'stacked-bar'
		});
			//chartUpdate();


    }
    function dollarToPercent(start, end) {
    		selectedCategory = "percent"
    		category = categoryFunction();
    		var key = ["mission_" + category , "private_" + category, "mainstream_" + category];
    		initStackedBarChartUpdate.draw({
			data: data,
			key: key,
			element: 'stacked-bar'
		});

    }
	var initStackedBarChartUpdate = {
		draw: function(config) {

			function getTickFormat() {
				if (selectedCategory == "percent") {
					return d3.format(".0%")
				} else {
					return d3.format(".2s")
				}
			}
			chart = this,
			domEle = config.element,
			stackKey = config.key,
			data = config.data,
			margin = {top: 20, right: 20, bottom: 30, left: 50},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom,
			xScale = d3.scaleLinear().rangeRound([0, width]),
			yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
			color = d3.scaleOrdinal(["#ec008b","#fdbf11","#1696d2"]),
			xAxis = d3.axisBottom(xScale).tickFormat(getTickFormat()),
			yAxis =  d3.axisLeft(yScale)

			var stack = d3.stack()
				.keys(stackKey)
				.offset(d3.stackOffsetNone);
			var layers= stack(data);
				data.sort(function(a, b) { return b.year - a.year; });
				yScale.domain(data.map(function(d) {return d.year; }));
				xScale.domain([0,d3.max(data, function(d) {console.log(d["total_" + category]); return d["total_" + category]})]);


			var layer = svg.selectAll(".layer")
			 	.data(layers)
			 	.style("fill", function(d, i) { return color(i); });

			layer.selectAll("rect")
			  	.data(function(d) {console.log(d); return d; })
			   	.attr("y", function(d) {return yScale(d.data.year); })
			   	.attr("x", function(d) { return xScale(d[0]); })
			   	.transition()
            	.duration(700)
            	.ease(d3.easeLinear)
			   	.attr("height", yScale.bandwidth())
			   	.attr("width", function(d) {return xScale(d[1]) - xScale(d[0]) });

			d3.select(".axis--x")
			 	.transition().duration(1500).ease(d3.easeSinInOut)
			 	.call(xAxis);



		}
	}





});