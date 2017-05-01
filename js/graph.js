var HEADERS =  ["MISSION", "PRIVATE", "MAINSTREAM"],
    COLORS = ["#000000","#fdbf11","#1696d2"];
var IS_MOBILE = d3.select("#isMobile").style("display") == "block"
var IS_PHONE = d3.select("#isPhone").style("display") == "block"
		

function drawGraph(container_width){


	var showStats = function(yearClass) {
			d3.selectAll(".stats-text")
				.html("")
	       	var category = d3.select(".toggle_button.active").attr("id").split("_")[0]
	       	var statFormatter = function() {
	       		if (category == "percent") {
	       			return d3.format(",.2%")
	       		} else { 
	       			if (container_width < 500) {
	       				return d3.format("$,.2s")
	       			}
	       			return d3.format("$,.0f")
	       		}
	       	} 
	       	var statFormat = statFormatter();
	       	var year = yearClass.slice(-4)
	       	console.log(year)
	       	
		    	
	       	var yearStat = d3.selectAll("." + yearClass).data()[0].data["year"]
	       	var missionStat = d3.selectAll("." + yearClass).data()[0].data["mission_" + category]
	       	var privateStat = d3.selectAll("." + yearClass).data()[0].data["private_" + category]
	       	var mainstreamStat = d3.selectAll("." + yearClass).data()[0].data["mainstream_" + category]
	       	var yearLabel = d3.selectAll(".year-label-" + yearClass).attr('class')

	       	d3.select(".year-text")
	       		.html(yearStat)
	       	d3.select(".text0")
	       		.html(statFormat(missionStat))
	       	d3.select(".text1")
	       		.html(statFormat(privateStat))
	       	d3.select(".text2")
	       		.html(statFormat(mainstreamStat))
		  	d3.selectAll("text")
				.classed("hovered", false)
	       	d3.selectAll("." + yearLabel)
	       		.classed("hovered", true)
 		


	}

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
		aspect_height = (container_width < 400) ? 40 : 25,
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
				xAxis_normal = d3.axisBottom(xScale).tickFormat(getTickFormat()).tickSizeInner(-height)
				xAxis_mobile = d3.axisBottom(xScale).tickFormat(getTickFormat()).tickSizeInner(-height).ticks(6)
				var xAxis = (container_width < 400) ? xAxis_mobile : xAxis_normal;

				yAxis =  d3.axisLeft(yScale)
				$("#header").empty()
				svgHeader = d3.select("#header").append("svg")
							.attr("width", width + margin.left + margin.right)
							.attr("height", width/8)
							.append("g")
							.attr("transform", "translate(0," + width*.06+ ")");


				svgHeader.append("text")
					.attr("class", "header")
				getHeader();
				
				$("#stacked-bar").empty()
				svg = d3.select("#"+domEle).append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				$("#year-div").empty()
				$("#stats-div").empty()
				var statsDivWidth = (container_width < 400) ? width*.9: width*.8
				var yearDivWidth = width*.2 

				var yearSvg = d3.select("#year-div")
					.append("svg")
					.attr("width", yearDivWidth)
					.attr("height", height/12 + margin.top)
				yearSvg.append("text")
  					.attr("class", "stats-header")
			          .attr("x", function() {
			            if (container_width < 400) {
			                return (.02*width);
			             }
			                return (.1*width);
			          })
			          .attr("y", width*.04)
			          .text(function(){
			              return ("YEAR")
			          })
			    yearSvg.append("text")
			          .attr("class", function() {
			            return "stats-text " + "year-text"})
			          .attr("x", function() {
			            if (container_width < 400) {
			                return (.01*width);
			             }
			                return (.09*width);
			          })
			          .attr("y", function() {
			          	if (container_width < 400){
			          		return height*.08
			          	} return height *.085
			          })
			          .attr("transform", function(d) { 
			            if (container_width < 400) {
			              return "translate("+width*.01+",0)";
			            }
			            	return "translate("+ width*.01 +", 0)"; 
			          })

				var statsSvg = d3.select("#stats-div")
					.append("svg")
					.attr("width", statsDivWidth)
					.attr("height", height/12 + margin.top)
					 for (i=0; i<=3; i++){
				      	if(i !== 3){
				      		statsSvg.append("rect")
				      		.attr("width", width*.022)
				      		.attr("height", width*.022)
							.attr("x", function() {
					            if (container_width < 400) {
					                return (.25*width)*i;
					             }
					                return (.2*width)*i;
					          })
					          .attr("y", width*.019)
					          .style("fill", function(){
					              return (COLORS[i])
					          })
					          .attr("transform", function(d) { 
					          	 if (container_width < 400) {
					          	 	return "translate("+ width*.02 +", 0)"
					          	 }
					            	return "translate("+ width*.06 +", 0)"; 
					          })
					        statsSvg.append("text")
					          .attr("class", "stats-header")
					          .attr("x", function() {
					            if (container_width < 400) {
					                return (.25*width)*i;
					             }
					                return (.2*width)*i;
					          })
					          .attr("y", width*.04)
					          .text(function(){
					              return (HEADERS[i])
					          })
					          .attr("transform", function(d) { 
					          	 if (container_width < 400) {
					          	 	return "translate("+ width*.055 +", 0)"
					          	 }
					            	return "translate("+ width*.09 +", 0)"; 
					          })

					  		statsSvg.append("text")
					          .attr("class", function() {
					            return "stats-text " + "text" + i})
					          .attr("x", function() {
					            if (container_width < 400) {
					                return (.25*width)*i;
					             }
					                return (.2*width)*i;
					          })
					          .attr("y", function() {
					          	if (container_width < 400){
					          		return height*.08
					          	} return height *.085
					          })
					          .attr("transform", function(d) { 
					            if (container_width < 400) {
					              return "translate("+width*.06+",0)";
					            }
					            	return "translate("+ width*.09 +", 0)"; 
					          })
				      	}
				  	}

				


				// $("#dropdown-menu")
				// .selectmenu({
				//    open: function( event, ui ) {
				//       // d3.select("body").style("height", (d3.select(".ui-selectmenu-menu.ui-front.ui-selectmenu-open").node().getBoundingClientRect().height*1.3) + "px")
				//       // pymChild.sendHeight();
				//     },
				//     close: function(event, ui){
				//       // d3.select("body").style("height", null)
				//       // pymChild.sendHeight();
				//     },
				//    change: function(event, d){
				//         var value = this.value
				//         var yearClass = "year" + value
				//         console.log(value)
				//         d3.selectAll("text")
				//         	.classed("selected", false)
				//        	d3.selectAll(".year-label-" + yearClass)
				//        		.classed("selected", true)
				//        		console.log(yearClass)
				//         showStats(yearClass)

				//         d3.selectAll("rect").classed("selected", false)
				//         d3.selectAll(".year" + value).classed("selected", true)
				//   //       var name = (data[selectedIndex]["CZ"])
				//   //       var idClass = "id_" + value

				//   //     	var firstLineY = -.18
				//   //     	var secondLineY = -.15
				//   //       highlightPlace(idClass, "menu")
				// 	 //  	barText(selectedData, idClass, firstLineY, secondLineY)
				// 	 //  	d3.selectAll(".text-rect")
				//   //   		.remove();
				//     }
				// })     


				var stack = d3.stack()
					.keys(stackKey)
					/*.order(d3.stackOrder)*/
					.offset(d3.stackOffsetNone);
				var layers= stack(data);
					data.sort(function(a, b) { return a.year - b.year; });
					yScale.domain(data.map(function(d) { return d.year; }));
					xScale.domain([0,d3.max(data, function(d) {return d["total_" + category]})]);
				svg.append("g")
					.attr("class", "axis axis--x")
					.attr("transform", "translate(0," + (height*.995) + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "axis axis--y")
					.attr("transform", "translate(0,0)")
					.call(yAxis);	
				d3.select(".axis--y").selectAll("text")
			   		.attr("class", function(d) {
			   			return "year-label-year" + d
			   		})
			   	d3.select(".axis--y").selectAll(".tick")
			   		.each(function(d) {
			   			d3.select("line")
			   				.attr("class", "line-y")
			   		})

				var layer = svg.selectAll(".layer")
					.data(layers)
					.enter().append("g")
					.attr("class", "layer")
					.style("fill", function(d, i) { return COLORS[i]; });

				layer.selectAll("rect")
				  	.data(function(d) {return d; })
				  	.enter().append("rect")
				  	.attr("y", function(d) {return yScale(d.data.year); })
				  	.attr("x", function(d) { return xScale(d[0]); })
				  	.attr("class", function(d) {return "year" + d.data.year})
				  	.transition()
	            	.ease(d3.easeLinear)
				  	.attr("height", yScale.bandwidth())
				  	.attr("width", function(d) {return xScale(d[1]) - xScale(d[0]) })
				d3.selectAll("rect.year2015")
		  			.classed("selected", true)
				d3.selectAll(".year-label-year2015")
		  			.classed("selected", true)
				 d3.selectAll('rect')
				  	.on("mouseover", function() {
				  		var yearClass = d3.select(this).attr("class").split(' ')[0]
				  			showStats(yearClass)
				  			d3.selectAll("." + yearClass)
				  				.classed("hovered", true)
		 console.log(d3.selectAll(".selected").nodes().length)
				  	
				  	})
				  	.on("mouseout", function() {
				  		var selectedElement = d3.selectAll("rect.selected").filter(function (d, i) { return i === 1;}).attr("class")
				  		console.log(selectedElement)
				  		var selectedClass = selectedElement.split(" ")[0]
				  		showStats(selectedClass)
				  		d3.selectAll(".hovered").classed("hovered", false)
				  	})
		         	.on("click", function(){
		         		d3.selectAll("rect").classed("selected", false)
		         		var newYear = d3.select(this).attr('class').split(' ')[0]
		         		console.log(newYear)
		         		d3.selectAll("." + newYear)
		         			.classed("hovered", false)
		         			.classed("selected", true)
		         		d3.selectAll("text")
		         			.classed("selected", false)
						d3.selectAll(".year-label-" + newYear)
					        .classed("hovered", false)
		  					.classed("selected", true)


		         	})




		      	d3.selectAll(".toggle_button")
		         	.on("click", function(){
			          	var start = d3.select(".toggle_button.active").node().id.split("_")[0]
			          	var end = this.id.split("_")[0]
			          	d3.selectAll(".toggle_button.active").classed("active",false)
			          	d3.select(this).classed("active",true)
			            transitionState(start, end)

		        	})

		        showStats("year2015")
			}
		}


		var selectedCategory = "percent";
		var categoryFunction = function category() {
			return selectedCategory
		}
		var category = categoryFunction();
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

		function getTickFormat() {
			if (selectedCategory == "percent") {
				return d3.format(".0%")
			} else {
				return d3.format("$.2s")
			}
		}
		function getHeader() {
			if (selectedCategory == "percent") {
				d3.select(".header")
					.html("Percentage of Lending Volume by Type")
			} else {
				d3.select(".header")
					.html("Share of Lending Volume by Type")			
			}
		}
		var initStackedBarChartUpdate = {
			draw: function(config) {

				console.log('update')
				chart = this,
				domEle = config.element,
				stackKey = config.key,
				data = config.data,
				xScale = d3.scaleLinear().rangeRound([0, width]),
				yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
				xAxis_normal = d3.axisBottom(xScale).tickFormat(getTickFormat()).tickSizeInner(-height)
				xAxis_mobile = d3.axisBottom(xScale).tickFormat(getTickFormat()).tickSizeInner(-height).ticks(6)
				var xAxis = (container_width < 400) ? xAxis_mobile : xAxis_normal;				
				yAxis =  d3.axisLeft(yScale)

				getHeader();

				var stack = d3.stack()
					.keys(stackKey)
					.offset(d3.stackOffsetNone);
				var layers= stack(data);
					data.sort(function(a, b) { return a.year - b.year; });
					yScale.domain(data.map(function(d) {return d.year; }));
					xScale.domain([0,d3.max(data, function(d) { return d["total_" + category]})]);


				var layer = svg.selectAll(".layer")
				 	.data(layers)
				 	.style("fill", function(d, i) { return COLORS[i]; });

				layer.selectAll("rect")
				  	.data(function(d) {return d; })
				   	.attr("y", function(d) {return yScale(d.data.year); })
				   	.attr("x", function(d) { return xScale(d[0]); })
				  	.attr("class", function(d) {return "year" + d.data.year})
				   	.transition()
	            	.ease(d3.easeLinear)
				   	.attr("height", yScale.bandwidth())
				   	.attr("width", function(d) {return xScale(d[1]) - xScale(d[0]) });

				d3.select(".axis--x")
				 	.transition()
				 	.ease(d3.easeSinInOut)
				 	.call(xAxis);
				d3.selectAll("rect.year2015")
		  			.classed("selected", true)

		  		showStats("year2015")

			}
		}


	})

};

 var pymChild = new pym.Child({ renderCallback: drawGraph, polling: 500 });
