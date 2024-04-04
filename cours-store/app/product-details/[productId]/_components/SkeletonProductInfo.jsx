import React from 'react'

function SkeletonProductInfo() {
  return (
    <div>
        <div className='h-[20px] w-[400px] mt-2 bg-slate-200 animate-pulse' />
        <div className='h-[20px] w-[70px] mt-2 bg-slate-200 animate-pulse' />
        <div className='h-[20px] w-[400px] mt-2 bg-slate-200 animate-pulse' />
        <div className='h-[20px] w-[400px] mt-2 bg-slate-200 animate-pulse' />
        <div className='h-[20px] w-[400px] mt-2 bg-slate-200 animate-pulse' />
        <div className='h-[20px] w-[100px] mt-2 bg-slate-200 animate-pulse' />
      </div>
  )
}

export default SkeletonProductInfo