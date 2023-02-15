import React from 'react'

const FormField = ({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className='flex items-center mb-2 gap-2'>
        <label htmlFor={name} className='font-medium text-sm block text-gray-900'>{labelName}</label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className='text-black bg-[#ececf1] py-1 px-2 rounded font-semibold text-xs'
          >
            Surprise me
          </button>
        )}
      </div>
      <input 
        type={type}
        placeholder={placeholder}
        id={name}
        value={value} 
        name={name}
        onChange={handleChange}
        className='bg-gray-50 border-gray-300 text-gray-900 rounded-lg text-sm focus:ring-[#4649ff] focus:border-[#4649ff] outline-none w-full p-3'
      />
    </div>
  )
}

export default FormField