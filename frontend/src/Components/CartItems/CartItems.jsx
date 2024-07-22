import React, { useContext } from 'react'
import './CartItems.css' 
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext)


    const handleCheckout=async()=>{
        const products=all_product.map(product=>{
            if(cartItems[product.id]>0) {
                return {
                    productId:product._id,
                    quantity:cartItems[product.id]
                }
            }
            return null;
        }).filter(item=>item!==null);

        const totalAmount=getTotalCartAmount();
        try {
            const response=await fetch('https://shopeasy-76ql.onrender.com/createorder',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify({products,totalAmount})
            })

            const data=await response.json();
            if(data.success) {
                alert('Order placed successfully')
            }
            else {
                alert('Failed to place order')
            }
        } catch (error) {
            console.error('Error during checkout:',error)
            alert('Error during checkout')
        }
    };


  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>

        {all_product.map((e)=> {
            if(cartItems[e.id]>0) {
                return ( 
                    <div key={e.id}>
                        <div className='cartitems-format cartitems-format-main'>
                            <img src={e.image} className='carticon-product-icon' alt="" />
                            <p>{e.name}</p>
                            <p className='rupee'>₹{e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>  {/*Quantity*/}
                            <p className='rupee'>₹{e.new_price*cartItems[e.id]}</p>
                            <img src={remove_icon} className='cartitems-remove-icon' onClick={()=>{removeFromCart(e.id)}} alt="Remove" />
                        </div>
                        <hr/>
                    </div>
                )
            }
            return null;
        })}

        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p className='rupee'>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <p>Shipping Free</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3 className='rupee'>₹{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems
