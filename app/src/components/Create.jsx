import React, { useState, useRef, useEffect } from 'react';
import { ethers, parseEther } from "ethers";
import { uploadIPFS } from './axiosCalls';
import lilyAbi from '../../../backend/abi/LilyWriteV2.sol/LilyWrite.json';
import lwTokenAbi from '../../../backend/abi/LWToken.sol/LWToken.json';

const Create = () => {

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);

  const lilyContract = new ethers.Contract(ethers.getAddress("0xbf524D76e4ebcFC37145E5736D030D2558818B94"), lilyAbi.abi, signer);
  const lwTokenContract = new ethers.Contract(ethers.getAddress("0xDF042564D6186734C288973F0a7D9890C4e9cEc9"), lwTokenAbi.abi, signer);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    textAreaRef.current.style.height = 'auto';
    const newHeight = textAreaRef.current.scrollHeight;

    if (newHeight < 100) {
      textAreaRef.current.style.height = `${newHeight}px`;
    } else {
      textAreaRef.current.style.height = '100px';
    }
  };

  const handleGenerate = async () => {

    if(inputText == "" || inputText.length < 20 || inputText.length > 150) {
      alert("Please enter a valid prompt !!");
    }
    else {
      setLoading(true);
      try {
      const res = await uploadIPFS(inputText);          
      console.log(res.IpfsHash);
      const approv = await lwTokenContract.approve(ethers.getAddress("0xbf524D76e4ebcFC37145E5736D030D2558818B94"), Number("100000000000000"));
      await approv.wait();
      const tx = await lilyContract.generatePoem(res.IpfsHash, {value : parseEther("2.0")});
      console.log(tx);
      await tx.wait();
      alert("Poem Generation Submitted Successfully!");
      setLoading(false);
      } catch (err) {
        console.log(err);
        alert(err);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    handleInputChange({ target: { value: inputText } });
  }, []);

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
    })();
  }, []);
  
  return (
    <>
    <style>
        {`
          .floating {
            animation-name: floating;
            animation-duration: 3s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
          }

          @keyframes floating {
            0% { transform: translateY(0%); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0%); }
          }
        `}
      </style>
      <div className="h-screen flex flex-col justify-between items-center font-est">
        <div className="flex-grow flex items-center justify-center mb-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full floating">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Lilywrite</h1>
            <div className="mt-6">
              <p className="text-lg text-gray-900 leading-relaxed">
              Ask Clearly: Phrase your prompts clearly to receive the most meaningful responses. <br />
              Keep it Open-ended: Prompts that are open and contemplative may yield the most thoughtful poems. <br />
              Be Specific if Needed: If you are looking for content on a specific topic, feel free to specify! <br />
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center pb-32 mt-8">
        <button onClick={handleGenerate} className="mb-4 rounded-md py-2 px-4 -mt-32 mr-8 border-2 border-[#111827]"> { loading ? "Loading.." : "Generate" }
        </button>
          <input
            ref={textAreaRef}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your prompt here..."
            className="w-full max-w-lg text-left font-est -mt-36 bg-gray-50 text-black py-3 px-6 rounded-md text-xl border-2 border-[#111827] transition-all duration-300 ease-in-out resize-none"
            rows="1"
          />
        </div>
      </div>
    </>
  );
};

export default Create;