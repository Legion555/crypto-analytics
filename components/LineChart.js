import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
//d3
import {LineSeries, Crosshair, AreaSeries ,
    FlexibleXYPlot, XAxis, YAxis, Highlight,
    VerticalGridLines, HorizontalGridLines  } from 'react-vis'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function BarChart({assetId}) {
    const [data, setData] = useState([])
    //Graph
    const [points, setPoints] = useState([]);
    const [filter, setFilter] = useState()
    const [series, setSeries] = useState()
    const [lastDrawLocation, setLastDrawLocation] = useState(null)

    // const newData = data.map((snap, index) => ({x: index, y: snap}))
    const yArray = data.map(snap=>snap.y) 
    const xArray = data.map(snap=>snap.x) 
    console.log(xArray.filter(timestamp => timestamp))

    useEffect(() => {
        getData();
      }, [])
  
      const getData = () => {
          //Retrieve hourly - 90 days
          axios.get(`https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=90`)
          .then(res => {
              setData(res.data.prices.map(snap => ({x: snap[0], y: snap[1]})))
          }).catch(err => {console.log(err)})
      }
    
    return (
        <div className="w-full h-max p-8 shadow bg-white">
            <h1 className="text-center text-4xl">Price History</h1>
            {/* <div className="flex justify-evenly">
                <button className="bg-gray-200"
                    onClick={() => setDataSelection('days')}>Monthly view</button>
                <button className="bg-gray-200"
                    onClick={() => setDataSelection('hours')}>Weekly view</button>
                <button className="bg-gray-200"
                    onClick={() => setDataSelection('minutes')}>Daily view</button>
            </div> */}
            {points.length > 0 ?
                <div className="h-16">
                    <p>Date: {new Date(points[0].x).toString().slice(0,24)}</p>
                    <p>Price: ${numberWithCommas(Math.round(points[0].y*100)/100)}</p>
                </div>
                :
                <p className="h-16">Nope</p>
            }
            <FlexibleXYPlot margin={{left: 100, right: 50}} height={400}
                onMouseLeave={() => setPoints([])}
                xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
                yDomain={[Math.min(...yArray) * 0.95, Math.max(...yArray) * 1.1]}
                >
                <XAxis
                    title="Date"
                    tickFormat={(value, index) => {
                        const timestamp = new Date(value).toString();
                        const month = timestamp.slice(4,7)
                        const date = timestamp.slice(8,10)
                        return `${date} ${month}`
                    }}
                    tickTotal={6}
                    orientation="bottom"
                    style={{stroke: 'black'}}
                />
                <YAxis
                    tickFormat={(value, index) => {
                        return `$ ${value > 1000 ? numberWithCommas(value) : value}`
                    }}
                    tickTotal={5}
                    title="Price"
                    attr="y"
                    attrAxis="x"
                    orientation="left"
                    style={{stroke: 'black'}}
                />
                <HorizontalGridLines style={{stroke: '#ddd'}} />
                <AreaSeries 
                    data={points}
                    strokeStyle="solid"
                    style={{fill: 'none'}}
                />
                <LineSeries
                    data={data}
                    onNearestX={v => setPoints([v])}
                    strokeStyle="solid"
                    style={{fill: 'none'}}
                />
                <Highlight
                    enableY={false}
                    onBrushEnd={(area) => setLastDrawLocation(area)}
                    onDrag={area => {
                        setLastDrawLocation({
                            bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                            left: lastDrawLocation.left - (area.right - area.left),
                            right: lastDrawLocation.right - (area.right - area.left),
                            top: lastDrawLocation.top + (area.top - area.bottom)
                        })
                    }}
                />
            </FlexibleXYPlot>
            <div>
                {/* <h1>Selected Data</h1>
                {points.map(snap => 
                    <p>{snap.y}</p>
                )} */}
            </div>
        </div>
    )
}