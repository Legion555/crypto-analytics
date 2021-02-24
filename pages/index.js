import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
//next
import Image from 'next/image'
//components
import Main from '../components/Main'

export default function Home() {
  const [coinList, setCoinList] = useState([])

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/list`)
    .then(result => {
      console.log(result)
    }).catch(err => console.log(err))
  }, [])  

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Head>
        <title>Crypto Analytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-6/12 p-8 shadow">
        <h1 className="text-4xl text-center text-gray-600">Choose a cryptocurrency:</h1>
        <div className="mt-8 flex justify-evenly flex-wrap">
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"} name={'Bitcoin'} id={'bitcoin'} />
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"} name={'Ethereum'} id={'ethereum'} />
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731"} name={'Ripple'} id={'ripple'} />
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png?1552356157"} name={'Stellar'} id={'stellar'} />
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707"} name={'Tether'} id={'tether'} />
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860"} name={'Cardano'} id={'cardano'} />
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700"} name={'Chainlink'} id={'chainlink'} />
          <CryptoLink imgUrl={"https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580"} name={'Litecoin'} id={'litecoin'} />
        </div>
      </div>      
    </div>
  )
}

const CryptoLink = (props) => {
  return(
    <Link href="/crypto/[id]" as={`/crypto/${props.id}`} >
    <div className="w-32 m-4 p-4 text-center shadow hover:bg-gray-100 cursor-pointer">
      <Image className="" src={props.imgUrl} width={50} height={50} />
      <p className="text-xl">{props.name}</p>
    </div>
    </Link>
  )
}