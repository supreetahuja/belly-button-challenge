// Define a function to initialize
function init() {
  // D3 to read the samples.json file from the provided URL
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    var dropDownbox = d3.select("#selDataset")
    for (let i = 0; i < data.names.length; i++) {
      dropDownbox.append("option").text(data.names[i]).property("value", data.names[i])
    }
    buildcharts(data.names[0])
  });
}
function buildcharts(sampleid) {
  // D3 to read the samples.json file from the provided URL
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Extract the necessary data from the JSON

    //var sampleData = data.samples;
    var sampleData = data.samples.filter(element => element.id == sampleid)[0];
    var otuIds = sampleData.otu_ids.slice(0, 10).reverse();
    var sampleValues = sampleData.sample_values.slice(0, 10).reverse();
    var otuLabels = sampleData.otu_labels.slice(0, 10).reverse();

    // Create an array of labels for the bar chart
    var otuLabelsFormatted = otuIds.map(otuId => `OTU ${otuId}`);

    // Create a horizontal bar chart using Plotly.js
    var trace = {
      x: sampleValues,
      y: otuLabelsFormatted,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };

    var data = [trace];

    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" },
    };

    Plotly.newPlot("bar", data, layout);


    // Create a bubble chart using Plotly.js
    var trace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Viridis",
      },
    };

    var data = [trace];

    var layout = {
      title: "Bubble Chart",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" },
    };

    Plotly.newPlot("bubble", data, layout);
  });

}
function optionChanged(newsample) {
  buildcharts(newsample)
}

// Call the init() function to initialize the page
init();
