import React from 'react'

function FeaturesSection() {

  return (
    <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-wrap">
    <div class="flex flex-wrap -m-4">
      <div class="p-4 lg:w-1/2 md:w-full">
        <div class="flex border-2 rounded-lg border-[#111827] bg-gray-50 p-8 sm:flex-row flex-col">
          <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-slate-200 text-gray-500 border-2 border-[#111827] flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,100.68a15.86,15.86,0,0,0-4.69-11.31L166.63,20.68a16,16,0,0,0-22.63,0L115.57,49.11l-58,21.77A16.06,16.06,0,0,0,47.35,83.23L24.11,222.68A8,8,0,0,0,32,232a8.4,8.4,0,0,0,1.32-.11l139.44-23.24a16,16,0,0,0,12.35-10.17l21.77-58L235.31,112A15.87,15.87,0,0,0,240,100.68Zm-69.87,92.19L55.32,212l47.37-47.37a28,28,0,1,0-11.32-11.32L44,200.7,63.13,85.86,118,65.29,190.7,138ZM104,140a12,12,0,1,1,12,12A12,12,0,0,1,104,140Zm96-15.32L131.31,56l24-24L224,100.68Z"></path></svg>
          </div>
          <div class="flex-grow">
            <h2 class="text-gray-900 text-2xl title-font font-medium font-sor mb-3 hover:underline cursor-pointer">Fastchat</h2>
            <p class="leading-relaxed text-base">FastChat is an open platform for training, serving, and evaluating large language model based chatbots. We have implemented the Fastchat model deployed on Lilypad v1.</p>
          </div>
        </div>
      </div>
      <div class="p-4 lg:w-1/2 md:w-full">
        <div class="flex border-2 rounded-lg border-[#111827] bg-gray-50 p-8 sm:flex-row flex-col">
          <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-slate-200 text-gray-500 border-2 border-[#111827] flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,100.68a15.86,15.86,0,0,0-4.69-11.31L166.63,20.68a16,16,0,0,0-22.63,0L115.57,49.11l-58,21.77A16.06,16.06,0,0,0,47.35,83.23L24.11,222.68A8,8,0,0,0,32,232a8.4,8.4,0,0,0,1.32-.11l139.44-23.24a16,16,0,0,0,12.35-10.17l21.77-58L235.31,112A15.87,15.87,0,0,0,240,100.68Zm-69.87,92.19L55.32,212l47.37-47.37a28,28,0,1,0-11.32-11.32L44,200.7,63.13,85.86,118,65.29,190.7,138ZM104,140a12,12,0,1,1,12,12A12,12,0,0,1,104,140Zm96-15.32L131.31,56l24-24L224,100.68Z"></path></svg>
            </div>
          <div class="flex-grow">
            <h2 class="text-gray-900 text-2xl font-sor title-font font-medium mb-3 hover:underline cursor-pointer">IPFS</h2>
            <p class="leading-relaxed text-base font-normal">The Interplanetary File System (IPFS) is a distributed file storage protocol that allows computers all over the globe to store and serve files as part of a giant peer-to-peer network.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default FeaturesSection
  