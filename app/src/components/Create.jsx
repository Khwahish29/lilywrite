import React, { useState, useRef, useEffect } from 'react';

const Create = () => {
  const [inputText, setInputText] = useState('');
  const [poemBasis, setpoemBasis] = useState('default');
  const textAreaRef = useRef(null);

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

  useEffect(() => {
    handleInputChange({ target: { value: inputText } });
  }, []);
  
  const handleBasisChange = (e) => {
    setPoemBasis(e.target.value);
  };
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
        <div className="flex-grow flex items-center justify-center -mt-64">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full floating">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">The Road Not Taken</h1>
            <div className="mt-6">
              <p className="text-lg text-gray-900 leading-relaxed">
                Two roads diverged in a yellow wood,<br />
                And sorry I could not travel both<br />
                And be one traveler, long I stood<br />
                And looked down one as far as I could<br />
                To where it bent in the undergrowth;
                Two roads diverged in a yellow wood,<br />
                And sorry I could not travel both<br />
                And be one traveler, long I stood<br />
                And looked down one as far as I could<br />To where it bent in the undergrowth;
                Two roads diverged in a yellow wood,<br />
                And sorry I could not travel both<br />
                And be one traveler, long I stood<br />
                And looked down one as far as I could<br />
                To where it bent in the undergrowth;
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center pb-32">
        <select onChange={handleBasisChange} value={poemBasis} className="mb-4 rounded-md py-2 px-4 -mt-32 mr-8 border-2 border-[#111827]">
            <option value="default">Select Basis</option>
            <option value="emotion">Emotion</option>
            <option value="event">Event</option>
            <option value="character">Character</option>
            {/* Add more options as you like */}
          </select>
          <textarea
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
