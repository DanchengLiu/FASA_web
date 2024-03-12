import React from 'react'

const Header = () => {
  return (
    <div className=" flex items-center justify-between bg-blue-500 px-4">
        <img src="./IAD_logo.png" className=" w-1/4 h-auto" />
        <p className=" text-xl sm:text-2xl md:text-4xl lg:text-6xl text-white">FASA Web Demo</p>
        <img src="./University_at_Buffalo_logo.svg.png" className=" w-1/4 h-auto bg-white" />
    </div>
  )
}

export default Header;