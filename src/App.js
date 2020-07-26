import React, { useState, useEffect } from 'react';
import { MenuItem,FormControl,Select, Card, CardContent} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util';
import "leaflet/dist/leaflet.css"
import './App.css';

function App() {
  const [countries, setCountries] = useState ([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] =
  useState({ lat:34.80746, lng:-40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  
}, []);

  useEffect(() => {
  
 const getCountriesData = async() =>{
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data) => {
     const countries = data.map((country) => (
       {
         name: country.country, //United States, United Kingdom
         value: country.countryInfo.iso2 // UK,USA
       } ));

    const sortedData = sortData(data);
    setTableData(sortedData);     
    setMapCountries(data);
    setCountries(countries);
   });
 };

 getCountriesData();
}, []);

const onCountryChange = async (event) => {
  const countryCode = event.target.value;
  setCountry(countryCode);

  const url = countryCode === 'worldwide' 
   ? "https://disease.sh/v3/covid-19/all" 
   : `https://disease.sh/v3/covid-19/countries/${countryCode}`

   await fetch(url)
   .then(response => response.json())
   .then(data => {
     setCountry(countryCode);
     setCountryInfo(data);
     setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
     setMapZoom(4);
   });
};

  return (
    <div className="app"> 
     <div className="app__left">
      <div className="app__header">
      <h1>Covid-19 Updates</h1>
     <FormControl className="app__dropdown">
       <Select variant="outlined"  onChange={onCountryChange} value={country}>
         <MenuItem value="worldwide">WorldWide</MenuItem>
         {
          countries.map((country) =>(
          <MenuItem value={country.value}>{country.name}</MenuItem>    
          ))}  
       </Select>
     </FormControl>
    </div>

    <div className="app__stats">
     <InfoBox onClick={e => setCasesType('cases')} title="New Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
     <InfoBox onClick={e => setCasesType('recovered')} title="New Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
     <InfoBox onClick={e => setCasesType('deaths')} title="New Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
    </div>
           <Map 
           casesType={casesType}
           countries={mapCountries}
           center={mapCenter}
           zoom = {mapZoom}
           />
           </div>
           <Card className="app__right">
             <CardContent>
               <h3>Live cases by country</h3>
                <Table countries={tableData} />
                
             </CardContent>
           </Card>
    </div>
  );
}

export default App;
