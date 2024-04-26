import Link from 'next/link'
import React from 'react'


const Navbarbtn = (props: {name:string}) => {
    const {name} = props;
  return (
    <div className='bg-neutral-900 px-7 py-2 rounded-[30px] mx-2 cursor-pointer hover:bg-amber-500 duration-200'>
        <Link className='text-[20px]' href={"/" + name.toLowerCase()}>{name}</Link>
    </div>
  )
}

export default Navbarbtn