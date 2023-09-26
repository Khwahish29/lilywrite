import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { getContent } from './axiosCalls';
import lilyAbi from '../../../backend/abi/LilyWriteV2.sol/LilyWrite.json';


function Explore() {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [poemList, setPoemList] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      const lilyContract = new ethers.Contract(ethers.getAddress("0xbf524D76e4ebcFC37145E5736D030D2558818B94"), lilyAbi.abi, _signer);
      const ipfsCIDs = await lilyContract._getPoems();
      var temp = [];
      for(const i in ipfsCIDs) {
        if(i != 0) {
      //  console.log(ipfsCIDs[i][1]);
          if(ipfsCIDs[i][1].length < 50) {
            const res = await getContent(ipfsCIDs[i][1]);
            temp.push({ poem : res.replaceAll(/\n/g, "<br />")});
            console.log(res.replaceAll("\n", "<br />"));
          }
        }
      }
      setPoemList(temp);
    })();
  }, []);

  return (
    <div>
      
  <h1 class="text-2xl font-semibold mt-8 font-sor tracking-tight leading-none md:text-5xl text-[#292524] text-center">Explore</h1>
        <section class="text-gray-600 body-font">
  <div class="container px-5 py-12 mx-auto">
    <div class="flex flex-wrap -m-4">
      {poemList.map(poem => (
        <div class="p-10 lg:w-1/3">
        <div class="h-full bg-white bg-opacity-75 px-8 pt-16 pb-12 rounded-lg overflow-hidden text-center relative border-2 border-[#111827] shadow-custom">
          <h1 class="title-font sm:text-2xl text-3xl font-sor font-medium text-gray-900 mb-3">Raclette Blueberry Nextious Level</h1>
          <p class="leading-relaxed text-xl mb-3 font-est" dangerouslySetInnerHTML={{__html : poem.poem}}></p>
          <a href="#_" class="relative inline-block text-lg group mt-4">
                    <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span class="relative">View</span>
                    </span>
                    <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  )
}

export default Explore