import * as d3 from 'd3';
import "d3-scale-chromatic";
import { useEffect, useRef,useState } from "react";
import "./App.css";
import {choroArr} from './choroArr';
import {barObj} from './barObj';
export default function Choropleth({dim,colorSchemes,dimDict})
{
let [year,setYear]=useState("year2021");
let width = 960;
let height = 720;

let projection = d3.geoMercator()
.scale(470)    	
.translate([width / 3, height / 1.8]);

let path = d3.geoPath()
.projection(projection);
 d3.select("#canvas_choro").remove(); 
let canvas_choro=d3.select("body").append("svg")
.attr("id","canvas_choro");
let w=+d3.select("#canvas_choro").style("width").slice(0,-2);
let h=+d3.select("#canvas_choro").style("height").slice(0,-2); 
let pad=(4/35)*w;
d3.select("#tooltip").remove();
let toolTip=d3.select("body").append("div").attr("id","tooltip");
let color=d3.scaleSequential().interpolator(colorSchemes[dim]);
color.domain([barObj[dim]["mini"],barObj[dim]["maxi"]]);
let btnGroup=d3.select("body").append("div").attr("id","btnGroup");
for(let i=1;i<12;i++){
d3.select(`#btn${i}`).remove();
}
for(let i=1;i<12;i++){
btnGroup.append("div").attr("id",`btn${i}`).style("width",`${w/11}px`).text((2010+i).toString()).style("font","10.5px arial").on(
"click",(event,item)=>{
  setYear(`year${2010+i}`);
});
  if(year==`year${2010+i}`){
    d3.select(`#btn${i}`).style("background-color",color((barObj[dim]["maxi"]+barObj[dim]["mini"])/2)).style("color","white");
  }
}

  let geoUrl="https://raw.githubusercontent.com/JBreitenbr/Africa-Measures/main/africa.topojson";
  d3.json(geoUrl).then(
  (data,error) => {
    if(error){
      console.log(error);
    }
    else {
      let afroData=topojson.feature(data,data.objects.collection).features;
let afroData2=topojson.feature(data,data.objects.collection);
      canvas_choro            .attr('preserveAspectRatio', 'xMinYMin')
.attr('viewBox', '0 0 ' + width + ' ' + height)
.attr('width', null)
.attr('height', null);
canvas_choro.selectAll(".countries")
.data(afroData)
.enter()
.append('path')
.attr("class", "country-border").attr("d", path).attr("fill",(cntItem)=>{
  let adm0_a3_is=cntItem["properties"]["adm0_a3_is"];
  for(let i=0;i<choroArr[year].length;i++){
    if(choroArr[year][i]["adm0_a3_is"]==adm0_a3_is){
      return color(choroArr[year][i][dim]);
    }
      
  }
  return "#ccc";
}).attr("stroke","blue").on("mouseover",(event,cntItem)=>{
  let adm0_a3_is=cntItem["properties"]["adm0_a3_is"];

for(let i=0;i<choroArr[year].length;i++){

  if(choroArr[year][i]["adm0_a3_is"]==adm0_a3_is){
toolTip.html("Country: "+choroArr[year][i]["geounit"]+"<br> Capital: "+choroArr[year][i]["capital"]+"<br> Population ("+year.slice(4,8)+"): "+choroArr[year][i]["population"]+"<br>" + dimDict[dim]+" ("+year.slice(4,8)+"): "+choroArr[year][i][dim]);
  }
}         
  return toolTip.style("visibility","visible").style("left",event.pageX-0.2*w+"px").style("top",event.pageY-0.2*h+"px").style("background-color","beige").style("font","10px arial").style("border","1px solid darkgrey").style("padding","5px");
    });
  }})

}