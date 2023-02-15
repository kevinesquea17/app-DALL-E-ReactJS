import React from 'react'
import { downloadImage } from '../utils'

import { download } from '../assets'

const Card = ({_id, name, prompt, photo}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img src={photo} alt={prompt} className='w-full h-auto rounded-xl object-cover' />
      <div className='group-hover:flex flex-col max-h-[94.5%] w-[94%] hidden absolute bottom-0 left-0 rigth-0 bg-[#10131f] bg-opacity-90 m-2 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>
        <div className='flex justify-between items-center gap-2 mt-5'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center h-7 w-7 rounded-full text-white bg-green-700 text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-sm text-white'>{name}</p>
          </div>
          <button 
            type='button' 
            className='outline-none bg-transparent border-none'
            onClick={() => downloadImage(_id,photo)}
          >
            <img src={download} alt="download" className='w-6 h-6 object-contain invert' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card