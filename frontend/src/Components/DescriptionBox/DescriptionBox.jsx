import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (7)</div>
      </div>
      <div className="description-description">
        <p>
        An e-commerce website is an online platform that facilitates the buying and selling of goods and services over the internet. It typically features a wide range of products or services from various sellers or brands, allowing customers to browse, compare, and make purchases from the comfort of their own homes.
        </p>
        <p>
        Overall, an e-commerce website offers convenience, accessibility, and a wide selection of products or services, empowering businesses to reach a broader audience and customers to shop effortlessly and securely from anywhere at any time.
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox