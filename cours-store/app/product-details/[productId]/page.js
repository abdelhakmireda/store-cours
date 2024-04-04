'use client'
import BreadCrumb from '../../_components/BreadCrumb';
import ProductApis from '../../_utils/ProductApis'
import React, { useEffect, useState } from 'react'
import ProductBanner from './_components/ProductBanner';
import ProductInfo from './_components/ProductInfo';
import ProdcutList from '../../_components/ProdcutList';
import { usePathname } from 'next/navigation';

function ProductDetails({params}) {
  const path = usePathname();
  const [ProductDetails,setProductDetails] = useState({})
  const [productList, setProductList] = useState([])
    useEffect(()=>{
        getProductById_();
    },[params?.productId])
    const getProductById_=()=>{
        ProductApis.getProductById(params?.productId).then(res=>{
            console.log('product item', res?.data?.data);
            setProductDetails(res.data.data)
            getProductByCategory(res.data.data)
        })
    }
    const getProductByCategory = (product)=>{
      ProductApis.getProductByCategory(product?.attributes?.category).then(res=>{
        console.log(res?.data?.data);
        setProductList(res?.data?.data)
      })
    }
  return (
    <div className='px-10 py-8 md:px-28'>
      <BreadCrumb path={path}/>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 justify-around'>
        <ProductBanner product={ProductDetails}/>
        <ProductInfo product={ProductDetails} />
      </div> 
      <div>
        <h2 className='mt-24 mb-4 text-xl'>
          Similar Products
        </h2>
        <ProdcutList productList={productList} />
      </div>
    </div>
  )
}

export default ProductDetails