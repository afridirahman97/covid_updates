import React, { useState, useEffect} from 'react';


function LineGraph() {
    const [data, setData] = useState({});
     
     useEffect (() => {
         fetch('https://disease.sh/covid-19/historical/all?lastdays=120')
         .then(response => response.json())
         .then(data => {

         })
     }, [])

    
    return (
        <div>
        <h1>I am graph </h1>
        
            
        </div>
    )
}

export default LineGraph
