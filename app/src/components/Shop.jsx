import React, { useState, useEffect } from 'react';
import '../components/animation.css';
import lilyAbi from '../../../backend/abi/LilyWriteV2.sol/LilyWrite.json';
import { ethers, parseEther } from "ethers";

function Shop() {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [loading, setLoading] = useState(false);

  const lilyContract = new ethers.Contract(ethers.getAddress("0xbf524D76e4ebcFC37145E5736D030D2558818B94"), lilyAbi.abi, signer);

  const handleBuy = async (quantity, price) => {
    setLoading(true);
    try{
      const tx = await lilyContract.buyLWTokens(quantity, {value : parseEther(price)});
      await tx.wait();
      alert("Purchase made successfully!");
    } catch (error) {
      console.log(error);
      alert(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
    })();
  }, []);

  return (
    <div>
        <h1 class="text-2xl font-semibold mt-8 font-sor tracking-tight leading-none md:text-5xl text-[#292524] text-center">Credit Packs</h1>
        <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">

      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 border-2 border-[#111827] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h1 class="text-8xl font-medium font-sor text-gray-900 mb-3">10 Cr</h1>
          <p class="leading-relaxed mb-3">Price: 0.1 Lily Ethers</p>
          <div className='flex justify-center'>
            <button onClick={() => handleBuy(10, "0.1")} class="Btn">{ loading ? "Loading.." : "Pay" }<svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg></button>
        </div>
        </div>
      </div>


      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-gray-100 border-2 border-[#111827] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h1 class="text-8xl font-medium font-sor text-gray-900 mb-3">20 Cr</h1>
          <p class="leading-relaxed mb-3">Price: 0.2 Lily Ethers</p>
          <div className='flex justify-center'>
            <button onClick={() => handleBuy(20, "0.2")} class="Btn">{ loading ? "Loading.." : "Pay" }<svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg></button>
        </div>
        </div>
      </div>
      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-gray-100 border-2 border-[#111827] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h1 class="text-8xl font-medium font-sor text-gray-900 mb-3">50 Cr</h1>
          <p class="leading-relaxed mb-3">Price: 0.5 Lily Ethers</p>
          <div className='flex justify-center'>
            <button onClick={() => handleBuy(50, "0.5")} class="Btn">{ loading ? "Loading.." : "Pay" }<svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg></button>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Shop