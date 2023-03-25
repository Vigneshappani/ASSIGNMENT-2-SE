import React, {Component} from "react";
import PageHeader from "../../components/PageHeader";

// import { Bar } from "react-chartjs-2";
// import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class DashboardPage extends Component{
    constructor(props){
        super(props);
        this.state = {options: null}
        this.userRole = "owner";
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        fetch('http://3.236.36.80:4000/data/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if(response){
                    let data = response.map(r => {
                        return {                             
                            label: r.ticker,
                            y:  r.no_of_comments
                        }
                    })

                    this.setState({
                        ['options']: {
                            animationEnabled: true,
                            theme: "light2",
                            title:{
                                text: "Reddit ticker comments count"
                            }, 
                            axisX: {
                                title: "Ticker",
                                reversed: true,
                            },
                            axisY: {
                                title: "Comments count",
                                includeZero: true,
                                labelFormatter: this.addSymbols
                            },
                            data: [{
                                type: "column",
                                dataPoints: [
                                    ...data                                   
                                ]
                            }]
                        }
                    })
                }
            })
            .catch((err) => {
                //console.log(err.message);
            });
    }


    render(){

        const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Reddit ticker comments count"
			}, 
			axisX: {
				title: "Ticker",
				reversed: true,
			},
			axisY: {
				title: "comments count",
				includeZero: true,
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  2200000000, label: "Facebook" },
					{ y:  1800000000, label: "YouTube" },
					{ y:  800000000, label: "Instagram" },
					{ y:  563000000, label: "Qzone" },
					{ y:  376000000, label: "Weibo" },
					{ y:  336000000, label: "Twitter" },
					{ y:  330000000, label: "Reddit" }
				]
			}]
		}
        return (
            <div className="admin-content mx-auto">
                <div className="w-75">
                    <div className="container-fluid">
                        <div className="row">
                            {this.state.options && <CanvasJSChart options = {this.state.options} />}                    
                        </div>
                    </div>
                </div>
            
            </div>
        ) 
    }
}

export default DashboardPage;