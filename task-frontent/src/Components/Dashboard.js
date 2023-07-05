import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Dashboard = ({ tasks }) => {
  const svgRef = useRef(null);

  useEffect(() => {
   if (tasks.length > 0) {
     drawChart();
     window.addEventListener('resize', drawChart); 
   }

   return () => {
     window.removeEventListener('resize', drawChart); 
   };
 }, [tasks]);

  const drawChart = () => {
   const containerWidth = svgRef.current.parentNode.clientWidth; 
   const width = containerWidth > 400 ? 400 : containerWidth; 
   const height = width * 0.75; 

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const colorScale = d3.scaleOrdinal()
      .domain(['Pending', 'Completed'])
      .range(['#FF0000', '#00FF00']);

    const pieData = pie([
      { status: ' Pending', count: tasks.filter(task => task.status === 'Pending').length },
      { status: 'Completed', count: tasks.filter(task => task.status === 'Completed').length }
    ]);

    svg.selectAll('path')
  .data(pieData)
  .join('path')
  .attr('d', arc)
  .attr('fill', d => colorScale(d.data.status))
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

  svg.selectAll('text')
  .data(pieData)
  .join('text')
  .attr('transform', d => {
    const centroid = arc.centroid(d);
    let translationX = Math.abs(centroid[0]);
    let translationY = Math.abs(centroid[1]);
    if (d.data.status === 'Completed') {
      translationX += 0;
      translationY += 30;
    }
    return `translate(${translationX}, ${translationY})`;
  })
  .attr('text-anchor', 'start')
  .text(d => `${d.data.status}: ${d.data.count}`);


  
  };

  return (
 <div className='pl-14 w-full h-full flex flex-col items-center pt-20'>


   <h1 className="font-bold text-3xl pb-4">Task Status</h1>
      <svg className='' ref={svgRef}></svg>

 </div>
  );
};

export default Dashboard;