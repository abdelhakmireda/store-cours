import React from 'react';
import Image from 'next/image';

const ProductBanner = ({ product }) => {
  const imageUrl = product?.attributes?.banner?.data?.attributes?.url;
  return (
    <div>
      {imageUrl ?
        <Image
          src={imageUrl}
          alt='product-details-banner'
          width={400}
          height={400}
          className='rounded-lg'
        />
        : <div className='w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse' />
      }
    </div>
  );
};

export default ProductBanner;
