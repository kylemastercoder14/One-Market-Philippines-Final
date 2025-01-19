

import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
	<div className='relative mt-20 bg-[#c40000] w-full h-[30vh]'>
		<Image src="/banner.webp" alt='Banner' fill className='w-full h-full object-contain' />
	</div>
  )
}

export default Banner
