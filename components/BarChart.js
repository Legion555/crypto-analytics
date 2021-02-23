import {useEffect, useState, useRef} from 'react'
//d3
import {select,
    axisBottom, axisLeft, scaleLinear, scaleBand, index, text} from "d3";
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (ref) => {
    const [dimensions, setDimensions] = useState(null)
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                setDimensions(entry.contentRect)
            })
            
        })
        resizeObserver.observe(observeTarget)
        return () => {
            resizeObserver.unobserve(observeTarget);
        }
    }, [ref])
    return dimensions;
}

export default function BarChart({data}) {
    //create reference variable
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        //select reference in DOM
        const svg = select(svgRef.current);
        
        if (!dimensions) return;

        //scales
        const xScale = scaleBand()
            .domain(data.map((val,index) => index))
            .range([0, dimensions.width])
            .padding(0.5)

        const yScale = scaleLinear()
            .domain([0, Math.max(...data) * 1.1])
            .range([dimensions.height,0])

        const colorScale = scaleLinear()
            .domain([75, 100, 150])
            .range(["green", "orange", "red"])
            .clamp(true)

        //axes
        const xAxis = axisBottom(xScale)
            .ticks(data.length)
        svg.select(".x-axis")
            .style('transform', `translateY(${dimensions.height}px)`)
            .call(xAxis);

        const yAxis = axisLeft(yScale);
        svg.select(".y-axis")
            .call(yAxis);

        //rendering
        svg.selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .style('transform', 'scale(1, -1)')
            .attr('x', (value,index) => xScale(index))
            .attr('y', -dimensions.height)
            .attr('width', xScale.bandwidth())
            .on('mouseenter', (event, value) => {
                const index = svg.selectAll('.bar').nodes().indexOf(event.target);
                svg
                    .selectAll('.tooltip')
                    .data([value])
                    .join((enter) => enter.append('text').attr('y', yScale(value) - 4))
                    .attr('class', 'tooltip')
                    .text(value)
                    .attr('x', xScale(index) + xScale.bandwidth())
                    .attr('text-anchor', 'middle')
                    .transition()
                    .attr('y', yScale(value) - 8)
                    .attr('opacity', 1)
            })
            .transition()
            .attr('fill', colorScale)
            .attr('height', value => dimensions.height - yScale(value))

    }, [data, dimensions])


    return (
        <div ref={wrapperRef} className="p-8" style={{border: '1px solid black', width: '600px', height: '300px'}}>
            <svg className="block" style={{width: '100%', overflow: 'visible'}} ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
    )
}