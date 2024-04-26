import React from 'react'
import Navbarbtn from './navbarbtn'
import {Roboto_Slab} from "next/font/google";

const RobotoSlab = Roboto_Slab({weight: "400", subsets: ["latin"]});


const Navbar = () => {
  return (
    <div className='flex flex-row w-[100vw] justify-between items-center bg-neutral-800 py-2 '>
        <div className={RobotoSlab.className}>
            <h1 className='text-[30px] mx-3 text-amber-500'>SpotiSync</h1>
        </div>
        <div className='flex'>
            <Navbarbtn name={"Home"}/>
            <Navbarbtn name={"FAQ"}/>
            <Navbarbtn name={"Contacts"}/>
        </div>
    </div>
  )
}

export default Navbar