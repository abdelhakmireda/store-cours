import React from 'react'
import ProductItem from './ProductItem'

function ProdcutList({ productList }) {
  return (
    <div className='grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 gap-3 '>
      {productList.map(item=>(
        <div>
          <ProductItem product={item} key={item.id}/>
        </div>
      ))}
    </div>
  )
}

export default ProdcutList