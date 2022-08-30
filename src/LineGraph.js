import React , {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from "numeral";

const options = {
  // chart:{
  //     foreColor:'#333',
  //     background: '#f4f4f4',
  //     borderColor: "#f4f4f4",
  //     backgroundColor: "#f4f4f4",
  //     color: "#f4f4f4"

  // },
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
          
        },
      
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
function LineGraph({casesType = 'cases'}) {
//https://disease.sh/v3/covid-19/historical/all?lastdays=180



    const [data, setData] = useState({});

    const buildChartData = (data, casesType) => {

        const chartData = [];
        let lastDataPoint;

        for(let date in data.cases){
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint,
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }


    useEffect(() => {

        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=365')
            .then(response => response.json()).then(data => {
            const chartData = buildChartData(data, casesType);
            setData(chartData);
            });
        }
        fetchData();

    }, [casesType]);

    

    return (
        <div style = {{marginTop: 30}}> 
            <h4 style = {{marginBottom: 20}}>Worldwide {casesType} in the Last 12 Months</h4>
            {data?.length > 0 && (
                <Line 
                    options = {options}
                    data = {{
                        datasets: [{
                          backgroundColor: "rgb(81,209,146,0.5)",
                          borderColor: "#4FC48A",
                          borderWidth: 2,
                          data: data,
        
                        }]
                    }}
                />
            )}
         
        </div>
    )
}

export default LineGraph
