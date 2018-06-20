function Matrix(options) {
	var margin = { top: 50, right: 50, bottom: 100, left: 100 },
		width = 900,
		height = 200,
		data = options.data,
		container = options.container,
		labelsData = options.labelsMeses,
		labelsDias = options.labelsDias,
		startColor = options.start_color,
		endColor = options.end_color;

	if (!data) {
		throw new Error('Please pass data');
	}

	if (!Array.isArray(data) || !data.length || !Array.isArray(data[0])) {
		throw new Error('It should be a 2-D array');
	}

	var maxValue = d3.max(data, function (layer) { return d3.max(layer, function (d) { return d; }); });
	var minValue = d3.min(data, function (layer) { return d3.min(layer, function (d) { return d; }); });

	var numeroDeDias = 7;
	var numeroDeSemanas = 48;

	var numrows = numeroDeDias;
	var numcols = numeroDeSemanas;

	var svg = d3.select(container).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var background = svg.append("rect")
		.style("stroke", "#ebedf0")
		.style("fill", "white")
		.style("stroke-width", "2px")
		.attr("width", width)
		.attr("height", height);

	var x = d3.scale.ordinal()
		.domain(d3.range(numcols))
		.rangeBands([30, width - 70]);

	var y = d3.scale.ordinal()
		.domain(d3.range(numrows))
		.rangeBands([20, height - 60]);

	var colorMap = d3.scale.linear()
		.domain([1, 100])
		.interpolate(d3.interpolateHcl)
		.range([d3.rgb("#ebe	df0"), d3.rgb('196127')]);

	var row = svg.selectAll(".row")
		.data(data)
		.enter().append("g")
		.attr("class", "row")
		.attr("transform", function (d, i) { return "translate(20," + y(i) + ")"; });

	var cell = row.selectAll(".cell")
		.data(function (d) { return d; })
		.enter().append("g")
		.attr("class", "cell")
		.attr("transform", function (d, i) { return "translate(" + x(i) + ", 20)"; });

	cell.append('rect')
		.attr("width", x.rangeBand())
		.attr("height", y.rangeBand())
		.style("stroke-width", 2)
		.style('stroke', '#ebedf0')
		.style('stroke', 'white');
	row.selectAll(".cell")
		.data(function (d, i) { return data[i]; })
		.style("fill", colorMap);

	var labels = svg.append('g')
		.attr('class', "labels");

	var columnLabels = labels.selectAll(".column-label")
		.data(labelsData)
		.enter().append("g")
		.attr("class", "column-label")
		.attr("transform", function (d, i) { return "translate(" + x(i * 4) + "," + height + ")"; });

	columnLabels.append("text")
		.attr("x", 40)
		.attr("y", y.rangeBand())
		.attr("dy", ".82em")
		.attr("text-anchor", "end")
		.attr("transform", "rotate(0)")
		.attr("transform", "translate(5,-200)")
		.text(function (d, i) { return d; });

	var rowLabels = labels.selectAll(".row-label")
		.data(labelsDias)
		.enter().append("g")
		.attr("class", "row-label")
		.attr("transform", function (d, i) { return "translate(" + 0 + "," + y(i * 2) + ")"; });

	rowLabels.append("text")
		.attr("x", 40)
		.attr("y", y.rangeBand() * 2.8)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.text(function (d, i) { return d; });

}