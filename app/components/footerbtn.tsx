import Link from 'next/link'
import React from 'react'


const Footbarbtn = (props: {name:string}) => {
    const {name} = props;
  return (
    <div className='px-1 sm:px-5 py-2 mx-2 cursor-pointer duration-200 hover:text-amber-500'>
        <Link className='text-[10px] sm:text-[15px] font-light' href={"/" + (name == 'Home' ? '/' : name.toLowerCase())}> -{'>'}   {name}</Link>
    </div>
  )
}

export default Footbarbtn