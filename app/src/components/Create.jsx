import React, { useState, useRef, useEffect } from 'react';

const Create = () => {
  const [inputText, setInputText] = useState('');
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

  return (
    <>
      <div className="h-screen flex flex-col justify-between items-center font-est">
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-4">The Road Not Taken</h1>
            <p className="text-sm text-gray-700">By Robert Frost</p>
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
                And looked down one as far as I could<br />
                To where it bent in the undergrowth;
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center pb-10">
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
