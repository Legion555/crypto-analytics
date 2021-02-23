import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router';
//components
import LineChart from '../../components/LineChart'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function album({assetData}) {
    const router = useRouter();

    console.log(assetData)

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <Head>
                {/* <title>{entryData.name}</title>
                <meta name={entryData.name} content={entryData.name} /> */}
            </Head>
            <Link href="/"><button className="mt-4 ml-4 p-4 rounded shadow text-xl text-gray-100 bg-blue-600">Back home</button></Link>
            <div className="w-9/12 m-auto">
              <div>
                <h1 className="text-6xl font-bold">{assetData.name} <span className="text-gray-400">{assetData.symbol}</span></h1>
              </div>
              <div className="w-full flex justify-between mt-8 p-4 shadow bg-white">
                <div>
                  <p className="text-xl">Price</p>
                  <p className="text-4xl">${assetData.market_data.current_price.usd > 1000
                    ? numberWithCommas(assetData.market_data.current_price.usd)
                    : assetData.market_data.current_price.usd}</p>
                </div>
                <div>
                  <p className="text-xl">% Change (24h)</p>
                  <p className={assetData.market_data.price_change_percentage_24h < 0 ? "text-3xl text-red-600" : "text-3xl text-green-600"}
                    >{Math.round(assetData.market_data.price_change_percentage_24h*100)/100}%</p>
                </div>
                <div>
                  <p className="text-xl">Market Cap</p>
                  <p className="text-3xl">${numberWithCommas(Math.round(assetData.market_data.market_cap.usd/10000000)/100)}B</p>
                </div>
                <div>
                  <p className="text-xl">Volume (24h)</p>
                  <p className="text-3xl">${numberWithCommas(Math.round(assetData.market_data.total_volume.usd/10000000)/100)}B</p>
                </div>
              </div>
              <div className="mt-8">
                <LineChart assetId={assetData.id} />
              </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
  let res = await fetch(`https://api.coingecko.com/api/v3/coins/${context.params.id}`)

  const assetData = await res.json()
  
  return {
    props: {
      assetData
    }
  }
}