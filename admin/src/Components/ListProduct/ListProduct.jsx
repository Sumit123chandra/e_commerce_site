import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts,setallproducts]=useState([]);

  const fetchInfo=async()=> {
    await fetch('https://shopeasy-76ql.onrender.com/allproducts')
    .then((resp)=>resp.json()
    .then((data)=>{setallproducts(data)}));
  }

  useEffect(()=> {
    fetchInfo();
  },[])

  const remove_product=async(id)=> {
    await fetch('https://shopeasy-76ql.onrender.com/removeproduct',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p class="old_price">Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr/>
          {allproducts.map((product,index)=>{
            return <><div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p >{product.name}</p>
              <p className='price old_price'>₹{product.old_price}</p>
              <p className='price'>₹{product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr/>
            </>
          })}
      </div>
    </div>
  )
}

export default ListProduct
