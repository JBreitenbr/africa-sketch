import * as d3 from 'd3';
import "d3-scale-chromatic";
import { useEffect, useRef,useState } from "react";
import "./App.css";
import {barObj} from './barObj';
import {colorSchemes} from './colorSchemes';
import {countries} from './countries';
import {dimArr} from './dimArr';
import {dimDict} from './dimDict';
const Test = ({dim,country,handleChange1,handleChange2}) => {  
let colorObj={"life_expectancy":d3.interpolateGreens,"gdp":d3.interpolateBlues,"electricity":d3.interpolateReds}
                        
function showDimension(dim,country){
d3.select("#canvas_test").remove();
  
let canvas=d3.select("body").append("svg")
.attr("id","canvas_test");
let w=+d3.select("#canvas_bars").style("width").slice(0,-2);
let h=+d3.select("#canvas_bars").style("height").slice(0,-2); 
let pad=(4/35)*w;
let color=d3.scaleSequential().interpolator(colorSchemes[dim]);
color.domain([barObj[dim]["mini"],barObj[dim]["maxi"]]);
let years=[2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021];
let barLengthScale=d3.scaleLinear().domain([barObj[dim]["mini"],1.2*barObj[dim]["maxi"]]).range([pad,w-pad]);
let yScale = d3.scaleBand().domain(years).range([pad,h-pad]).padding(0);
console.log(dimArr)
let bw=yScale.bandwidth();
let yAxis=d3.axisLeft(yScale);
canvas.append('g').call(yAxis).attr("transform","translate("+pad+",0)").style("font",`${(9/350)*w}px arial`);
for(let i=0;i<years.length;i++){
canvas.append("rect").attr("x",pad).attr("y",pad+i*bw).attr("width",barLengthScale(barObj[dim][country][i])).attr("height",0.97*bw).style("fill",color(barObj[dim][country][i]));
}
}
  showDimension(dim,country);
return(
<><div>
<select id="selectButton1" value={dim} onChange={handleChange1}>
  {dimArr.map(function(item) {
      return (
        <option value={item} key={item}>
          {dimDict[item]}
        </option>
      )
    })}
</select>
<select id="selectButton2" value={country} onChange={handleChange2}>
{countries.map(function(item) {
      return (
        <option value={item} key={item}>
          {item}
        </option>
      )
    })}
</select>
</div></>)
}

export default Test;