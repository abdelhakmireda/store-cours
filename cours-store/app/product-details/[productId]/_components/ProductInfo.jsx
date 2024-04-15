// ProductInfo.js
'use client'
import React, { useContext } from 'react'
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react'
import SkeletonProductInfo from './SkeletonProductInfo'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApis from '../../../_utils/CartApis'
import { CartContext } from '../../../_context/CartContext'

const ProductInfo = ({ product }) => {
  const router = useRouter();
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      CartApis.addToCart(data).then(res => {
        console.log('cart created successfuly');
        setCart(oldCart => [
          ...oldCart, {
            id: res?.data?.data?.id,
            product
          }
        ])
      }).catch(error => {
        console.log('erreur', error)
      })
    }
  }

  return (
    <>
      {product?.id ? (
        <div>
          <h2 className='text-[20px] '>
            {product?.attributes?.title}
          </h2>
          <h2 className='text-[15px] mt-2 text-gray-400'>
            {product?.attributes?.category}
          </h2>
          <h2 className='text-[15px] mt-2'>
            {product?.attributes?.description[0]?.children[0].text}
          </h2>
          <h2 className='text-[11px] text-gray-500 flex gap-2 mt-2 items-center'>
            {product?.attributes?.instantDelivery ? <BadgeCheck className='text-green-500 w-5 h-5' /> : <AlertOctagon className='text-gray-500 w-5 h-5' />}
            Eligible For Instant
          </h2>
          <h2 className='text-[32px] text-primary mt-2'>
            {product?.attributes?.price}
          </h2>
          <button onClick={handleAddToCart} className='flex gap-2 bg-primary hover:bg-teal-600 rounded-md p-3 text-white'>
            <ShoppingCart />Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </>
  )
}

export default ProductInfo
