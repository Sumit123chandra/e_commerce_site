import React, { useState } from 'react'
import './DescriptionBox.css'
// import { ShopContext } from '../../Context/ShopContext'
import ReviewSection from '../ReviewSection/ReviewSection'

const DescriptionBox = ({productId}) => {

  const [activeTab,setActiveTab]=useState('description')
  const handleTabChange=(tab)=>{
    setActiveTab(tab);
  }

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div onClick={()=>handleTabChange('description')} className={`descriptionbox-nav-box ${activeTab==='description'?'active':''}`}>Description</div>

        <div onClick={()=>handleTabChange('reviews')} className={`descriptionbox-nav-box ${activeTab==='reviews'?'active':''}`}>Reviews</div>
      </div>

      <div className="description-description">
        {activeTab==='description'?(<>
        <p>
        An e-commerce website is an online platform that facilitates the buying and selling of goods and services over the internet. It typically features a wide range of products or services from various sellers or brands, allowing customers to browse, compare, and make purchases from the comfort of their own homes.
        </p>
        <p>
        Overall, an e-commerce website offers convenience, accessibility, and a wide selection of products or services, empowering businesses to reach a broader audience and customers to shop effortlessly and securely from anywhere at any time.
        </p>
        </>):
        (
          <ReviewSection productId={productId} />
        )}
      </div>
    </div>
  )
}

export default DescriptionBox
