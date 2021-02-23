import {useEffect, useState, useRef} from 'react'
import axios from 'axios'
//components
import BarChart from './BarChart'
import LineChart from './LineChart'

export default function Main() {
    const [priceData, setPriceData] = useState([]);
    const [marketCapData, setMarketCapData] = useState([]);
    const [tradingVolData, setTradingVolData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        //Retrieve hourly - 90 days
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90`)
        .then(res => {
            setPriceData(res.data.prices.map(snap => ({x: snap[0], y: snap[1]})))
            setMarketCapData(res.data.market_caps.map(snap => ({x: snap[0], y: snap[1]})))
            setTradingVolData(res.data.total_volumes.map(snap => ({x: snap[0], y: snap[1]})))
        }).catch(err => {console.log(err)})
    }


    return (
        <div className="h-screen bg-gray-100">
            <button onClick={getData}>BTC Market Data</button>
            <div className="flex justify-evenly items-stretch">
                <LineChart data={priceData} priceData={priceData} marketCapData={marketCapData} tradingVolData={tradingVolData}/>
            </div>

            <div className="mt-16">
                <button className="p-2 text-gray-100 bg-blue-600"
                    onClick={() => setData(data.map(val => val + 5))} >Add</button>
                <button className="p-2 text-gray-100 bg-blue-600">Filter</button>
            </div>
        </div>
    )
}