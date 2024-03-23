import './App.css'
import {useState} from 'react';
import {colorSchemes} from './colorSchemes';
import BarChart from './BarChart'
import Choropleth from './Choropleth'
import {dimArr} from './dimArr';
import {dimDict} from './dimDict';
import {countries} from './countries';
import Dropdown1 from './Dropdown1';
export default function App() {
let [dim,setDim]=useState("life_expectancy");
let [country,setCountry]=useState("Africa");
const handleChange1 = (event) => {
setDim(event.target.value);
};
const handleChange2 = (event) => {
  setCountry(event.target.value);
};
  return (
   <><BarChart dim={dim} country={country} handleChange1={handleChange1} handleChange2={handleChange2} colorSchemes={colorSchemes}/><Choropleth dim={dim} colorSchemes={colorSchemes} dimDict={dimDict}/>
     {/*<select id="selectButton1" value={dim} onChange={handleChange1}>
  {dimArr.map(function(item) {
      return (
        <option value={item} key={item}>
          {dimDict[item]}
        </option>
      )
    })}
</select>*/}
    <Dropdown1 dim={dim} dimArr={dimArr} dimDict={dimDict} handleChange1={handleChange1}/>
     <select id="selectButton2" value={country} onChange={handleChange2}>
{countries.map(function(item) {
      return (
        <option value={item} key={item}>
          {item}
        </option>
      )
    })}
</select>
   </>
  )
}
