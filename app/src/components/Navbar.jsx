import React, { useEffect, useState } from 'react';
import { onConnect } from '../Utils';
import { Link } from 'react-router-dom';

function Navbar() {

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    const {res, conn} = await onConnect(connected);
    setAccount(res);
    setConnected(conn);
  }

  useEffect(() => {
    (async () => {
      const {res, conn} = await onConnect(connected);
      setAccount(res);
      setConnected(conn);
    })();
  }, []);

  return (
    <div>
        <nav className="bg-transparent p-4 flex justify-between items-center transition-all ease-in-out duration-300">
        <div className="text-5xl font-bold ml-32 mt-4 text-gray-900 font-abs ">
          Lilywrite
        </div>
        <div className="flex space-x-4 mt-8 mr-64">
          <Link to={'/explore'} className="text-xl text-[#292524] hover:text-gray-900 transition-all mt-2 px-4 hover:underline">Explore</Link>
          <Link to={'/create'} className="text-xl text-[#292524] hover:text-gray-900 transition-all mt-2 px-4 hover:underline">Create</Link>
          <Link to={'/shop'} className="text-xl text-[#292524] hover:text-gray-900 transition-all mt-2 px-4 hover:underline">Shop</Link>
            <button onClick={handleConnect} class="relative inline-block text-lg group">
                <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span class="relative">{ connected ? account.slice(0,13) + ".." : "Connect Wallet" }</span>
                </span>
                <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar