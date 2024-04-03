"use client"
import React, { useEffect, useState } from 'react'
import ProdcutList from './ProdcutList'
import ProductApis from '../_utils/ProductApis'

function ProductSection() {
  const[productList,setProductList]=useState([])
    useEffect(()=>{
        getLatestProducts_();
    },[])
    const getLatestProducts_ = () => {
        ProductApis.getLatestProducts().then(res => {
            console.log(res.data);
          setProductList(res.data.data)
        })
    }
  return (
    <div className='px-10 md:px-20'>
      <h2 className='my-4 text-xl'>Our Latest Products</h2>
      <ProdcutList productList={productList}/>
      </div>
  )
}

export default ProductSection