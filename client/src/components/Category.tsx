import React from 'react'

function Category() {
  return (
    <>
    <div className='text-3xl text-[#6CCFF6]'>Category</div>
    <div className='mt-5 container'>
        <div className='inner_container flex gap-6'>
        <span className=' cursor-pointer p-2 bg-[#6CCFF6] rounded-full text-black'>#typescript</span>
        <span className='cursor-pointer p-2 bg-[#6CCFF6] rounded-full text-black'>#react</span>
        <span className=' cursor-pointer p-2 bg-[#6CCFF6] rounded-full text-black'>#database</span>
        </div>
    </div>

    </>

  )
}

export default Category