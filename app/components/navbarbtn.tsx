import Link from 'next/link'
import React from 'react'


const Navbarbtn = (props: {name:string}) => {
    const {name} = props;
  return (
    <div className='px-1 md:px-5 py-2 mx-2 cursor-pointer duration-200 hover:text-amber-500'>
        <Link className='text-[12px] md:text-[18px]' href={"/" + name.toLowerCase()}>{name}</Link>
    </div>
  )
}

export default Navbarbtn