import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit{
  private svg: any;
  private margin = 80;
  private width = 650 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private _http:ApiService){}



  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(40,50)");
    
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  console.log(data)
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.name))
  .padding(0.3);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("font-size", "15")
  
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 20])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .style("font-size", "15")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.name))
  .attr("y", (d: any) => y(d.leaves))
  .attr("width", x.bandwidth())
 
  .attr("height", (d: any) => this.height - y(d.leaves))
  .style('fill', (d:any, i:any) => `hsl(${i * 30}, 70%, 50%)`);
}
ngOnInit(): void {
  this.createSvg();
  type ChartDataType ={
    name: string,
    leaves: number,
     id: number,
    email: string,
    phone: string,
      department: string,
    active: boolean,
    productive_hours: number,

  }
  this._http.empDetails().subscribe(data=> {
    const chartData = data as ChartDataType[];
    this.drawBars(chartData);
   })
}
}
