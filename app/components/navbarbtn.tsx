import Link from 'next/link'
import React from 'react'


const Navbarbtn = (props: {name:string}) => {
    const {name} = props;
  return (
    <div className='px-1 sm:px-5 py-2 mx-2 cursor-pointer duration-200 hover:text-amber-500'>
        {name != 'Contacts' && <Link className='text-[12px] sm:text-[18px]' href={"/" + (name == 'Home' ? '/' : name.toLowerCase())}>{name}</Link>}
        {name == 'Contacts' && <a className='text-[12px] sm:text-[18px]' href='#contacts'>{name}</a>}
    </div>
  )
}

export default Navbarbtn