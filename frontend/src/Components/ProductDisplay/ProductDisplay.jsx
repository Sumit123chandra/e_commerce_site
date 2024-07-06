import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

import sample_image from '../Assets/sample_image.png'

const ProductDisplay = (props) => {
  const {product} = props;

  const [currentImageIndex,setCurrentImageIndex] = useState(0);

  const images = [product.image, product.image, product.image, sample_image];

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const {addToCart}=useContext(ShopContext);

  return (
    <div className='productdisplay'>

      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={index === currentImageIndex ? 'selected' : ''}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={images[currentImageIndex]} alt="" />
        </div>
      </div>  
      {/* <div className="productdisplay-left">
        <div className="productdisplay-img-list">
           <img src={product.image} alt="" />
           <img className='first' src={product.image} alt="" />
           <img className='second' src={product.image} alt="" />
           <img className='third' src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>   */}

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          
          <img src={star_dull_icon} alt="" />
          <p>{7}</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ₹{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size-data">
            <div className='size'>S</div>
            <div className='size'>M</div>
            <div className='size'>L</div>
            <div className='size'>XL</div>
            <div className='size'>XXL</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}} >ADD TO CART</button>
          <p className="productdisplay-right-category"><span>Category :</span>{product.category}s</p>
          <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest, Stylish</p>
      </div>
    </div>
  )
}

export default ProductDisplay
