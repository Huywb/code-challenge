import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import h1 from './assets/tokens/HUSD.svg'

function App() {
  const [PriceSend,setPriceSend] = useState(0)
  const [Data,setData] = useState([])
  const [value,setValue] = useState(0)
  const [TokenSend,setTokenSend] = useState({currency: '',price: null, icon:''})
  const [TokenReceive,setTokenReceive] = useState({currency: '',price: null, icon:''})
  const [loading,setLoading] = useState(false)

  const fetchToken = async()=>{
    const data = await fetch('https://interview.switcheo.com/prices.json',{
      method: 'GET'
    })
    const response = await data.json()
    if(response){
      setData(response)      
    }
  }

  const handleSelectSend = (e)=>{
    const currency = e.target.value
    const currencyData = Data.find((item)=> item.currency === currency)

    setTokenSend({
      currency: currencyData.currency,
      price: currencyData.price,
    })}

    const handleSelectReceive = (e)=>{
      const currency = e.target.value
      const currencyData = Data.find((item)=> item.currency === currency)
  
      setTokenReceive({
        currency: currencyData.currency,
        price: currencyData.price,
        name: currencyData.name
      })}

  const handleInput = (e)=>{
    setPriceSend(e.target.value) 
  }

  const handleTranfer = ()=>{

    if(!PriceSend){
      return alert("You need to enter number Token")
    }
    if(!TokenSend.currency || !TokenReceive.currency){
      return alert("You need choose the Token want to tranfer")
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);

    const total = (PriceSend * TokenSend.price) / TokenReceive?.price
    
    setValue(total)
  }

  useEffect(()=>{
    fetchToken()
  },[])
  if(!Data){
    return <></>
  }
  console.log(Data)
  console.log(PriceSend)
  return (
    <div className='w-full h-screen flex items-center justify-center bg-black'>
      <div className='flex bg-zinc-800 border-none rounded-xl text-white '>
          <div className='flex items-center justify-center flex-col gap-2 w-full m-4'>
            <h1 className='m-4 text-3xl'>Transfer Token App</h1>

            <div className='flex gap-10 '>

               <div className='flex flex-col gap-4 min-w-[240px]  bg-[#212121] rounded-xl p-4'>

                  <select className='flex items-center justify-center cursor-pointer text-xl' value={TokenSend.currency} onChange={handleSelectSend}>

                    <option className='text-black'>---Choose currency----</option>
                    {Data.map((item,index)=>(
                      <option key={index} value={item.currency} className='text-black'>
                        <img src="../assets/tokens/HUSD.svg" alt="" />
                        {item.currency}
                      </option>
                    ))}
                  </select>

                  <div className='bg-[#424242] rounded-md text-xl '>
                    <input placeholder='Enter number...' type="text" onChange={handleInput} className='p-2 py-6 h-5 outline-none border-none w-full rounded-md' />
                  </div>
                  
                  <div className='text-xl'>
                    {
                      TokenSend ? <><p>Price: <span>{TokenSend.price}</span></p></> : <></>
                    }
                  </div>

               </div>

               <div className='flex flex-col gap-4 min-w-[240px]  bg-[#212121] rounded-xl p-4'>

                  <select className='flex items-center justify-center cursor-pointer text-xl' value={TokenReceive.currency} onChange={handleSelectReceive}>

                    <option className='text-black'>---Choose currency----</option>
                    {Data.map((item,index)=>(
                      <option key={index} value={item.currency} className='text-black'>
                        <img src="../assets/tokens/HUSD.svg" alt="" />
                        {item.currency}
                      </option>
                    ))}
                  </select>
                  
                  <div className='bg-[#424242] rounded-md text-xl '>
                    <input type="text" value={loading ? 0: value} className={`p-2 py-6 h-5 outline-none border-none w-full rounded-md ${loading ? "bg-gray-300 animate-pulse" : " text-white"}
                              transition-all duration-300`} />
                  </div>
                  
                  <div className='text-xl' >
                    {
                      TokenReceive ? <><p>Price: <span>{TokenReceive.price}</span></p></> : <></>
                    }
                  </div>

               </div>
            </div>


            <button className={`text-xl cursor-pointer bg-black w-[30%] my-4 py-2 rounded-xl  
                              ${loading ? "bg-gray-300 animate-pulse" : "bg-[#212121] text-white"}
                              transition-all duration-300`}disabled={loading}  onClick={handleTranfer}>{loading ? "Loading..." : "Tranfer"}</button>
            

          </div>
      </div>
    </div>
  )
}

export default App
