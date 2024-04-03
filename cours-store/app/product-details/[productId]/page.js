'use client'
import ProductApis from '@/app/_utils/ProductApis'
import React, { useEffect } from 'react'

function ProductDetails({params}) {
    useEffect(()=>{
        getProductById_();
    },[params?.productId])
    const getProductById_=()=>{
        ProductApis.getProductById(params?.productId).then(res=>{
            console.log('product item', res.data.data)
        })
    }
  return (
    <div>{params?.productId}</div>
  )
}

export default ProductDetails