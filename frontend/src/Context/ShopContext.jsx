// import all_product from '../Components/Assets/all_product'
import React, { createContext, useEffect, useState } from "react";

export const ShopContext=createContext(null);

const getDefaultCart=()=> {
    let cart={};
        for (let index = 0; index < 300+1; index++) {
            cart[index]=0;
        }
        return cart;
}

const ShopContextProvider=(props)=> {
    const [all_product,setAll_Product]=useState([]);
    const [cartItems,setCartItems]=useState(getDefaultCart());
    const [reviews,setReviews]=useState({});
    const [user, setUser] = useState(null);

    useEffect(()=> {
        fetch('https://shopeasy-76ql.onrender.com/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
        .catch((error) => console.error('Error fetching products:', error));


        if(localStorage.getItem('auth-token')) {
            fetch('https://shopeasy-76ql.onrender.com/getcart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data))
            
            fetch('https://shopeasy-76ql.onrender.com/user', {
                method: 'GET',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`
                }
            })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user:', error));
        }
            
    },[])
    
    const addReview=async(productId,review)=> {
        setReviews((prev)=>({
            ...prev,
            [productId]:[...(prev[productId] || []),review],
        }))

        await fetch('https://shopeasy-76ql.onrender.com/addreview',{
            method:"POST",
            headers:{
                Accept:'application/form-data',
                // Accept:'application/json',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({productId, ...review}),
        });

        const response = await fetch(`https://shopeasy-76ql.onrender.com/reviews/${productId}`);
        const updatedReviews = await response.json();
        setReviews((prev) => ({
            ...prev,
            [productId]: updatedReviews,
        }));
    }

    const addToCart=async(itemId)=> {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')) {

            console.log("Adding to cart:",itemId);

            await fetch('https://shopeasy-76ql.onrender.com/addtocart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    // Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            console.log("Cart Updated")
        }
    }
    // console.log(cartItems);
    const removeFromCart=(itemId)=> {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')) {
            fetch('https://shopeasy-76ql.onrender.com/removefromcart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    // Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            console.log("Cart Updated")
        }
    }
    
    const getTotalCartAmount=()=> {
        let totalAmount=0;
        for (const item in cartItems) {
            if(cartItems[item]>0) {
                let itemInfo=all_product.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems=()=> {
        let totalItem=0;
        for (const item in cartItems) {
            if(cartItems[item]>0) {
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,addReview,reviews,user};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;