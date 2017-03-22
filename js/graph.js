var HEADERS =  ["Mission", "Private", "Mainstream"],
    COLORS = ["#ec008b","#fdbf11","#1696d2"];


function drawGraph(container_width){

var IS_MOBILE = d3.select("#isMobile").style("display") == "block"
var IS_PHONE = d3.select("#isPhone").style("display") == "block"
console.log('hello')
	  if (container_width == undefined || isNaN(container_width)) {
	        container_width = 1170;
	    }

	    else {
	        var margin = {
	            top: 10,
	            right: 10,
	            bottom: 10,
	            left: 10
	        };
	    }
	var aspect_width = 25,
		aspect_height = (IS_PHONE) ? 30 : 23,
		margin = {top: 20, right: 30, bottom: 50, left: 40},
		width = container_width - margin.left - margin.right,
		height = Math.ceil((width * aspect_height) / aspect_width) - margin.top - margin.bottom;
	      
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


		var initStackedBarChart = {
			draw: function(config) {
				chart = this,
				domEle = config.element,
				stackKey = config.key,
				data = config.data,
				xScale = d3.scaleLinear().rangeRound([0, width]),
				yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
				color = d3.scaleOrdinal(["#ec008b","#fdbf11","#1696d2"]),
				xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0%")),
				yAxis =  d3.axisLeft(yScale)
				$("#" + domEle).empty()
				svg = d3.select("#"+domEle).append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				$("#stats-div").empty()
				var statsSvg = d3.select("#stats-div")
					.append("svg")
					.attr("width", width + margin.left)
					.attr("height", height/12 + margin.top)
					 for (i=0; i<=3; i++){
				      	if(i !== 3){
					        statsSvg.append("text")
					          .attr("class", "stats-header")
					          .attr("x", function() {
					            // if (IS_MOBILE && !IS_PHONE) {
					            //     return (.068*width)*i;
					            //   }
					                  return (.3*width)*i;
					          })
					          .attr("y", width*.04)
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
					          .attr("y", function() {
					          	if (IS_PHONE) {
					          		return height*.13
					          	} else {
					          		return height *.1
					          	}
					          })
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
				  	.attr("width", function(d) {return xScale(d[1]) - xScale(d[0]) })
				

				 d3.selectAll('rect')
				  	.on("mouseover", function() {
				  var yearClass = d3.select(this).attr("class")
		       			console.log(yearClass)
				  		showStats(yearClass);
				  d3.selectAll("." + yearClass)
				  	.classed("selected", true)
				  	})
				  	.on("mouseout", function() {
				  		d3.selectAll(".stats-text")
				  			.html("")
					  	 d3.selectAll("rect")
					  	.classed("selected", false)
				  	})
				svg.append("g")
					.attr("class", "axis axis--x")
					.attr("transform", "translate(0," + (height*.985) + ")")
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

		       var showStats = function(yearClass) {
		       	var category = d3.select(".toggle_button.active").attr("id").split("_")[0]
		       	var statFormatter = function() {
		       		if (category == "percent") {
		       			return d3.format(",.2%")
		       		} else { 
		       			return d3.format("$,.0f")
		       		}
		       	} 
		       	var statFormat = statFormatter();
		       	console.log(statFormat)
		       	var missionStat = d3.selectAll("." + yearClass).data()[0].data["mission_" + category]
		       	var privateStat = d3.selectAll("." + yearClass).data()[0].data["private_" + category]
		       	var mainstreamStat = d3.selectAll("." + yearClass).data()[0].data["mainstream_" + category]

		       	d3.select(".text0")
		       		.html(statFormat(missionStat))
		       	d3.select(".text1")
		       		.html(statFormat(privateStat))
		       	d3.select(".text2")
		       		.html(statFormat(mainstreamStat))

		
		 
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
				 	.transition().duration(1500)
				 	.ease(d3.easeSinInOut)
				 	.call(xAxis);



			}
		}


	})

};

 var pymChild = new pym.Child({ renderCallback: drawGraph, polling: 500 });
