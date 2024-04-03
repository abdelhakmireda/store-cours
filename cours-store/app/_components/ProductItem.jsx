import React from 'react'
import Image from 'next/image'
import { List } from 'lucide-react'
function ProductItem({product}) {
  return (
      <div className='border-gray-500 rounded-lg hover:border hover:shadow-md hover:cursor-pointer'>
        <Image src={product?.attributes?.banner?.data?.attributes?.url}
        alt='banner-card'
        width={400}
        height={350}
        className='rounded-t-lg h-[160px]
        object-cover '
        />
          <div className='flex justify-between pt-2 p-3 items-center bg-gray-100 rounded-b-lg hover:bg-gray-200'>
              <div className=''>
                  <h2 className='text-[14px] font-medium line-clamp-2'>
                      {product?.attributes?.title}
                  </h2>
                  <h2 className='text-[12px] text-gray-400 flex gap-1 '>
                      <List className='w-4 h-4' />{product?.attributes?.category}
                  </h2>
              </div>
              <h2 className='text-[13px]'>
                {product?.attributes?.price}
              </h2>
        </div>
    </div>
  )
}

export default ProductItem