import React from 'react'
import TopWaveSVG from '../assets/bluebottom.svg'
import Image from 'next/image';

const TopWave = () => {
  console.log(TopWaveSVG);
  return (
    <div className='bg-repeat-x'>
        <Image src={TopWaveSVG} alt='weow' className='w-[100vw] h-[200px] bg-auto'/>
    </div>
  )
}

export default TopWave