import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';
// import Footer from '../Components/Footer/Footer';

const ShopCategory =(props)=> {
    const {all_product}=useContext(ShopContext);
    const [sortOrder,setSortOrder]=useState('default')

    const handleSortChange=(event)=> {
        setSortOrder(event.target.value)
    }

    const sortedProducts=all_product.filter(item=>item.category===props.category)
        .sort((a,b)=>{
            if(sortOrder==='lowToHigh') {
                return a.new_price - b.new_price;
            }
            else if(sortOrder==='highToLow') {
                return b.new_price - a.new_price;
            }
            else{
                return 0;  //default arrangement
            }
        })

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> Out of 36 products 
                </p>

                <div className="shopcategory-sort">
                    Sort by 
                    <select onChange={handleSortChange} value={sortOrder} name="" id="">
                        <option value="default">Select</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low </option>
                    </select>
                    {/* <img src={dropdown_icon} alt="" /> */}
                </div>
            </div>

            <div className="shopcategory-products">
               
               {sortedProducts.map((item,i)=>{
                  if(props.category===item.category) {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

                  }

                  else {
                    return null;
                  }
                })}
               
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory
