import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import About from './About'
import Contact from './Contact'
import Home from './Home'
import store from './redux/store'
//const store = createStore(reducer)
import Header from './Header'
import Analytics from './analytics'
import What from './what'
import Boxes from './Boxes'
import Table from './Table'
import React, { Component, useState, useEffect } from 'react';
import  './App.css'
import Map from './Map'
import {sortData} from './util';
import LineGraph from './LineGraph'

import "leaflet/dist/leaflet.css";

function App() {
  let currentStore = store.getState()
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 30, lng: -20});
  const [mapZoom, setMapZoom] = useState(3);

//https://disease.sh/v3/covid-19/countries
//https://disease.sh/v3/covid-19/all

	useEffect(() => 
	{
		const getCountriesData = async () => 
		{
			await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
				const countries = data.map((country) => 
				(

					{
					name: country.country,
					value: country.countryInfo.iso2
					}

				));
				const sortedData  = sortData(data);
				setTableData(sortedData);
				setMapCountries(data);
				setCountries(countries);
			});
		};
		getCountriesData();
	},[]);
	console.log(casesType);

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then(data => {
			setCountryInfo(data);
		});

	},[]);

	const onCountryChange = async (e) => {
		const countryCode = e.target.value;
	
		const url =
		  countryCode === "worldwide"
			? "https://disease.sh/v3/covid-19/all"
			: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
		  .then((response) => response.json())
		  .then((data) => {
			setInputCountry(countryCode);
			setCountryInfo(data);
			setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
			setMapZoom(4);
		  });
	  };

  return ( 
    

    <div className="app">
		<div className = "app__left">

		
			<div className="aheader">
			<h1>COVID-19 LIVE TRACKER</h1>
				<FormControl className = "app__dropdown">

					<Select variant = "outlined"  value = {country} onChange = {onCountryChange}>

							<MenuItem value = "worldwide"> Worldwide </MenuItem>
							{	
								countries.map((country) => (
								<MenuItem value = {country.value}> {country.name} </MenuItem> ))
							}

					</Select>

				</FormControl> 
			</div>

			<div className = "boxes">

				<Boxes 
				title = "Coronavirus Cases" cases = {countryInfo.todayCases}      total = {countryInfo.cases}
				onClick = { (e) => setCasesType('cases')} 
				/>
				<Boxes title = "Recovered" 		   cases = {countryInfo.todayRecovered}  total = {countryInfo.recovered}
				onClick = { (e) => setCasesType('recovered')}	
				/>
				<Boxes title = "Deaths" 		   cases = {countryInfo.todayDeaths}     total = {countryInfo.deaths}
				onClick = { (e) => setCasesType('deaths')}
				/>

			</div>
			<Map  
			    countries={mapCountries}
          		casesType={casesType}
         		center={mapCenter}
          		zoom={mapZoom}/>
		</div>

		<Card className = "app__right">
			<CardContent>
				<h3>Live Cases by Country</h3>
				<Table countries = {tableData}/>
				<LineGraph casesType = {casesType} />
 
			</CardContent>


		{/* 1+ GRAPH */}
        {/* LIST TABLE */}

		</Card>

      
         {/* <div className="App"> */}
		<Provider store={store}>
		<Router >
			<div className="app">
			{/* <Header /> */}

				<Switch>
				{/* <Route exact path="/" component={Home} /> */}
				<Route path="/home" component={Home} />

				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} /> 
				<Route path="/analytics" component={Analytics} /> 
				<Route path="/what" component={What} /> 

				</Switch>
			</div> 
		</Router>
		</Provider>



      {/* // STRUCTURE*/}

         {/* HEADER */}

             {/* TITLE + LOGO */}
             {/* HOME PAGE */}
             {/* WHAT IS COVID PAGE */}
             {/* ANALYTICS PAGE */}
             {/* ABOUT PAGE */}
            {/* CONTACT PAGE */}

         {/* 3 DATA BOXES */}

        {/* 1+ GRAPH */}

         {/* LIST TABLE */}

         {/* MAP */}



    </div>
  )
}

export default App;
